import React, { useState, useEffect, useRef } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import { fetchFullyBookedDates, fetchReservedTimes, fetchAvailableTimes } from '../apis/mainpage.js';
import './css/MainPage.css';
import { fetchHolidays } from '../apis/holidays.js';
import axios from 'axios';

function MainPage() {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [availableTimes, setAvailableTimes] = useState([]);
  const [reservedTimes, setReservedTimes] = useState({});
  const [fullyBookedDates, setFullyBookedDates] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState([]);
  const buttonRef = useRef(null);

  const getToday = new Date();
  getToday.setHours(0, 0, 0, 0);

  const isDatePast = (dateToCheck) => {
    const checkDate = new Date(dateToCheck);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate < getToday;
  };

  const isWeekend = (date) => date.getDay() === 0 || date.getDay() === 6;

  const isDate30DaysLater = (date) => {
    const currentDate = new Date();
    const thirtyDaysLater = new Date(currentDate.setDate(currentDate.getDate() + 30));
    return date > thirtyDaysLater;
  };

  useEffect(() => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    fetchFullyBookedDates(year, month).then(setFullyBookedDates);
    
    fetchReservedTimes(year, month).then((data) => {
      const reservedSlots = data.reduce((acc, reservation) => {
        const reservationDate = new Date(reservation.reservationDate);
        const day = reservationDate.getDate();
        const startHour = new Date(reservation.reservationStartTime).getHours();
        const endHour = new Date(reservation.reservationEndTime).getHours();

        if (!acc[day]) acc[day] = [];
        acc[day].push({ start: startHour, end: endHour });
        return acc;
      }, {});

      setReservedTimes(reservedSlots);
    });
    
    fetchHolidays(year).then(setHolidays);
  }, [date]);

  useEffect(() => {
    const checkTodayAvailability = async () => {
      const formattedDate = date.toISOString().split('T')[0];
    
      // 오늘 날짜가 예약 불가능한 경우 availableTimes를 비움
      if (
        isDatePast(date) || 
        isWeekend(date) || 
        isDate30DaysLater(date) || 
        fullyBookedDates.some(d => d === formattedDate) || 
        holidays.includes(formattedDate)
      ) {
        setAvailableTimes([]);
        return;
      }
    
      // 예약 가능하면 fetchAvailableTimes 실행
      const isAvailable = await fetchAvailableTimes(date);
      if (isAvailable) {
        const allSlots = [];
        const currentTime = new Date(); // 현재 시간 확인
    
        for (let hour = 10; hour < 22; hour += 2) {
          const startTime = `${hour}:00`;
          const endTime = `${hour + 2}:00`;
    
          // 예약된 시간 처리: 현재 시간 이전이면 예약된 상태로 설정
          const isBeforeCurrentTime = 
            date.toDateString() === getToday.toDateString() &&
            (currentTime.getHours() > hour || (currentTime.getHours() === hour && currentTime.getMinutes() > 0));
          
          const isReserved = reservedTimes[date.getDate()]?.some(
            (res) => hour < res.end && (hour + 2) > res.start
          );
    
          // 예약된 상태로 자동 처리 (현재 시간 이전이면 isReserved = true)
          allSlots.push({
            time: `${startTime}~${endTime}`,
            isReserved: isBeforeCurrentTime || isReserved
          });
        }
        setAvailableTimes(allSlots);
      } else {
        setAvailableTimes([]);
      }
    };
  
    checkTodayAvailability(); // 컴포넌트가 처음 렌더링될 때 실행
  }, [date, fullyBookedDates, holidays, reservedTimes]);

  const handleDateChange = async (selectedDate) => {
    // 이미 선택된 날짜를 다시 클릭하면 선택 해제
    if (selectedDate.getTime() === date.getTime()) {
      setDate(new Date()); // 현재 날짜로 초기화
      setSelectedDate(null);
      setSelectedTime([]);
      setAvailableTimes([]);
      return;
    }
    
    setDate(selectedDate);
    setSelectedDate(selectedDate);
    setSelectedTime([]);

    const isAvailable = await fetchAvailableTimes(selectedDate);
    if (isAvailable) {
      const allSlots = [];
      for (let hour = 10; hour < 22; hour += 2) {
        const startTime = `${hour}:00`;
        const endTime = `${hour + 2}:00`;

        const isReserved = reservedTimes[selectedDate.getDate()]?.some(
          (res) => {
            const slotStart = hour;
            const slotEnd = hour + 2;
            return slotStart < res.end && slotEnd > res.start;
          }
        );
        allSlots.push({ time: `${startTime}~${endTime}`, isReserved });
      }
      setAvailableTimes(allSlots);
    } else {
      setAvailableTimes([]);
    }
  };

  const handleTimeSelect = (time) => {
    // 이미 선택된 시간을 다시 클릭하면 선택 해제
    if (selectedTime === time) {
      setSelectedTime([]);
      return;
    }
    if (!reservedTimes[selectedDate?.getDate()]?.some(
      (res) => {
        const slotHour = time.split(':')[0];
        return slotHour >= res.start && slotHour < res.end;
      }
    )) {
      setSelectedTime(time);
    }
    setTimeout(() => {
      if (buttonRef.current) {
        buttonRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  };

  const handleNextStep = () => {
    const date = new Date(selectedDate || new Date());

    const kstOffset = 9 * 60;
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset() + kstOffset);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    const [startHour, startMinute] = selectedTime.split(':');
    const endHour = parseInt(startHour) + 2;

    const name = localStorage.getItem('name');
    const studentId = localStorage.getItem('studentId');

    navigate('/reservation-details', {
      state: {
        facility: '컴공 회의실 : B208',
        name,
        studentNumber: studentId,
        phone: '-없이 작성',
        date: formattedDate,
        time: `${startHour}:00 ~ ${endHour}:00`,
      },
    });
  };

  const handleLogout = () => {
    try {
      // 로컬스토리지에서 accessToken 삭제
      localStorage.removeItem('accessToken');
      
      // 로그인 페이지로 리디렉션
      navigate('/');
    } catch (error) {
      alert('로그아웃 실패');
    }
  };

  const tileClassName = ({ date }) => {
    const formattedDate = `${date.getMonth() + 1}-${date.getDate()}`;

    if (
      isDatePast(date) || 
      isWeekend(date) || 
      isDate30DaysLater(date) || 
      fullyBookedDates.includes(date.getDate()) || 
      holidays.includes(formattedDate)
    ) {
      return 'fully-booked';
    }

    return '';
  };

  return (
    <motion.div 
      className="mainpage-container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0 }}
    >
      <NavigationBar title="컴퓨터정보공학부" />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Calendar
          onChange={handleDateChange}
          value={date}
          locale="en-US"
          tileClassName={tileClassName}
          formatMonthYear={(locale, date) =>
            new Intl.DateTimeFormat('ko-KR', { month: 'long' }).format(date) 
          }
        />
      </motion.div>
      <motion.div 
        className="time-slots"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {availableTimes.length > 0 ? (
          availableTimes.map((slot, index) => (
            <motion.div
              key={index}
              className={`time-slot ${selectedTime === slot.time ? 'selected' : ''} 
              ${slot.isReserved ? 'reserved' : ''}`}
              onClick={() => !slot.isReserved && handleTimeSelect(slot.time)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {slot.time}
            </motion.div>
          ))
        ) : (
          <div className='no-time'>이용 가능한 시간이 없습니다.</div>
        )}
      </motion.div>
      {selectedTime.length > 0 && (
        <motion.button 
          ref={buttonRef}
          className="next-step-button active" 
          onClick={handleNextStep}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          다음 단계
        </motion.button>
      )}
      <button className="logout-button" onClick={handleLogout}>로그아웃</button>
    </motion.div>
  );
}

export default MainPage;
