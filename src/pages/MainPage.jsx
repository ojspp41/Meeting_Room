import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import { fetchFullyBookedDates } from '../apis/fullyBooked';
import { fetchReservedTimes } from '../apis/reservation';
import { fetchAvailableTimes } from '../apis/availableTimes';
import './css/MainPage.css';

function MainPage() {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [availableTimes, setAvailableTimes] = useState([]);
  const [reservedTimes, setReservedTimes] = useState({});
  const [fullyBookedDates, setFullyBookedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState([]);
  const [holidays, setHolidays] = useState(["12-25"]);

  const getToday = new Date();
  getToday.setHours(0, 0, 0, 0);

  const isDatePast = (dateToCheck) => {
    const checkDate = new Date(dateToCheck);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate < getToday;
  };

  const isWeekend = (date) => {
    return date.getDay() === 0 || date.getDay() === 6;
  };

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
            return (slotStart < res.end && slotEnd > res.start); 
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
        name: name, 
        studentNumber: studentId, 
        phone: '-없이 작성',
        date: formattedDate,
        time: `${startHour}:00 ~ ${endHour}:00`,
      },
    });
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
    <div className="mainpage-container">
      <NavigationBar title="컴퓨터정보공학부" />
      <Calendar
        onChange={handleDateChange}
        value={date}
        locale="en-US"
        tileClassName={tileClassName}
      />
      <div className="time-slots">
        {availableTimes.length > 0 ? (
          availableTimes.map((slot, index) => (
            <div
              key={index}
              className={`time-slot ${selectedTime === slot.time ? 'selected' : ''} 
              ${slot.isReserved ? 'reserved' : ''}`}
              onClick={() => !slot.isReserved && handleTimeSelect(slot.time)}
            >
              {slot.time}
            </div>
          ))
        ) : (
          <div>이용 가능한 시간이 없습니다.</div>
        )}
      </div>
      <button 
        className={`next-step-button ${selectedTime.length > 0 ? 'active' : ''}`} 
        onClick={handleNextStep} 
        disabled={selectedTime.length === 0}
      >
        다음 단계
      </button>
    </div>
  );
}

export default MainPage;
