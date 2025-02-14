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
  const [selectedTime, setSelectedTime] = useState('');

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
    setSelectedTime('');
  
    const isAvailable = await fetchAvailableTimes(selectedDate);
    if (isAvailable) {
      const allSlots = [];
      for (let hour = 10; hour < 22; hour += 2) { 
        const startTime = `${hour}:00`;
        const endTime = `${hour + 2}:00`;
        const isReserved = reservedTimes[selectedDate.getDate()]?.some(
          (res) => hour >= res.start && hour < res.end
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
      (res) => time.split(':')[0] >= res.start && time.split(':')[0] < res.end
    )) {
      setSelectedTime(time);
    }
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
    <div className="mainpage-container">
      <NavigationBar title="컴퓨터정보공학부" />
      <Calendar
        onChange={handleDateChange}
        value={date}
        locale="en-US"
        tileClassName={({ date }) => {
          return fullyBookedDates.includes(date.getDate()) ? 'fully-booked' : '';
        }}
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
      {selectedTime && (
        <button className="next-step-button" onClick={handleNextStep}>
          다음 단계
        </button>
      )}
    </div>
  );
}

export default MainPage;
