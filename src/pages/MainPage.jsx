import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import { fetchFullyBookedDates } from '../apis/fullyBooked';
import { fetchReservedTimes } from '../apis/reservation';
import { fetchAvailableTimes } from '../apis/availableTimes';
import './css/MainPage.css';
import axios from 'axios';

function MainPage() {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [availableTimes, setAvailableTimes] = useState([]);
  const [reservedTimes, setReservedTimes] = useState({});
  const [fullyBookedDates, setFullyBookedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState([]);
  const [holidays, setHolidays] = useState(["12-25"]);
  
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
  }, [date]);

  
  

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

    // 선택한 날짜의 예약 가능 시간 자동 업데이트
    fetchAvailableTimes(date).then((isAvailable) => {
        if (isAvailable) {
            const allSlots = [];
            for (let hour = 10; hour < 22; hour += 2) {
                const startTime = `${hour}:00`;
                const endTime = `${hour + 2}:00`;

                const isReserved = reservedTimes[date.getDate()]?.some(
                    (res) => hour < res.end && (hour + 2) > res.start
                );
                allSlots.push({ time: `${startTime}~${endTime}`, isReserved });
            }
            setAvailableTimes(allSlots);
        } else {
            setAvailableTimes([]);
        }
    });
}, [date]);

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
  };

  const handleNextStep = () => {
    const date = new Date(selectedDate);
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

  const handleLogout = async () => {
    try {
      await axios.get('https://csiereserve.store/api/logout', { withCredentials: true });
      localStorage.clear();
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