import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getDay } from 'date-fns';
import { useNavigate } from 'react-router-dom'; // React Router
import NavigationBar from '../components/NavigationBar/NavigationBar';
import './css/MainPage.css';

function MainPage() {
  const navigate = useNavigate(); // 페이지 전환을 위한 hook
  const holidays = [
    new Date(2025, 11, 12),
    new Date(2025, 11, 16),
    new Date(2025, 11, 25),
    new Date(2025, 11, 26),
  ];

  const [date, setDate] = useState(new Date());
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');

  const tileClassName = ({ date, view }) => {
    const day = getDay(date);
    const isWeekend = day === 0 || day === 6;
    const isHoliday = holidays.some(
      (holiday) => holiday.toDateString() === date.toDateString()
    );
    const isSelected =
      selectedDate && selectedDate.toDateString() === date.toDateString();

    if (isSelected) {
      return 'selected';
    }

    if (isWeekend) {
      return 'weekend';
    }

    if (isHoliday) {
      return 'holiday';
    }

    return '';
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    setSelectedDate(selectedDate);

    const availableSlots = [];
    for (let hour = 10; hour <= 20; hour += 2) {
      const timeSlot = `${hour}:00`;
      availableSlots.push(timeSlot);
    }

    setAvailableTimes(availableSlots);
    setSelectedTime('');
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleNextStep = () => {
    navigate('/reservation-details', {
      state: {
        facility: '컴공 회의실 : B208', 
        name: '이지민', 
        studentNumber: '202221134', 
        phone: '010-1234-5678', 
        date: selectedDate?.toDateString(),
        time: selectedTime,
        participants: 4, 
      },
    });
  };

  return (
    <div className='mainpage-container'>
      <NavigationBar title="컴퓨터정보공학부" />
      <Calendar
        onChange={handleDateChange}
        value={date}
        tileClassName={tileClassName}
      />
      <div className="time-slots">
        {availableTimes.length > 0 ? (
          availableTimes.map((time, index) => (
            <div
              key={index}
              className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
              onClick={() => handleTimeSelect(time)}
            >
              {time}
            </div>
          ))
        ) : (
          <div>이용 가능한 시간이 없습니다.</div>
        )}
      </div>
      {selectedTime && (
        <button className="next-step-button" onClick={handleNextStep}>
          다음 단계
        </button>
      )}
    </div>
  );
}

export default MainPage;
