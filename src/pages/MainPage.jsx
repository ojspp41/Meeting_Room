import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig'; 
import NavigationBar from '../components/NavigationBar/NavigationBar';
import './css/MainPage.css';

function MainPage() {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [availableTimes, setAvailableTimes] = useState([]);
  const [reservedTimes, setReservedTimes] = useState({}); 
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');

  const fetchReservedTimes = async (year, month) => {
    try {
      const response = await axios.post('https://csiereserve.store/api/reservation/get/byDate', {
        year: year,
        month: month,
      });

      if (response.data && response.data.data) {
        const reservedSlots = response.data.data.reduce((acc, reservation) => {
          const reservationDate = new Date(reservation.reservationDate);
          const day = reservationDate.getDate();
          const startHour = new Date(reservation.reservationStartTime).getHours();
          const endHour = new Date(reservation.reservationEndTime).getHours();
          
          if (!acc[day]) {
            acc[day] = [];
          }
          acc[day].push({ start: startHour, end: endHour });

          return acc;
        }, {});

        setReservedTimes(reservedSlots); 
        console.log('예약된 날짜별 시간:', reservedSlots);
      }
    } catch (error) {
      console.error('예약 정보 조회 중 오류 발생:', error.response || error.message);
    }
  };

  const fetchAvailableTimes = async (selectedDate) => {
    try {
      const formattedDate = selectedDate.toISOString().split('T')[0]; 
      const startTime = '10:00'; 
      const endTime = '16:00';    

      const response = await axios.post('https://csiereserve.store/api/reservation/check', {
        reservationDate: formattedDate,
        reservationStartTime: startTime,
        reservationEndTime: endTime,
      });

      if (response.data.data) {
        console.log('예약 가능합니다');
        const allSlots = [];
        
        for (let hour = 10; hour <= 16; hour++) {
          const isReserved = reservedTimes[selectedDate.getDate()]?.some(
            (res) => hour >= res.start && hour < res.end
          );

          allSlots.push({ time: `${hour}:00`, isReserved });
        }

        setAvailableTimes(allSlots);
      } else {
        console.log('예약이 불가능합니다');
        setAvailableTimes([]); 
      }
    } catch (error) {
      console.error('예약 정보를 불러오는 중 오류 발생:', error.response || error.message);
      setAvailableTimes([]); 
    }
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    setSelectedDate(selectedDate);
    setSelectedTime('');
    
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1; 

    fetchReservedTimes(year, month);
    fetchAvailableTimes(selectedDate);
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
      <Calendar onChange={handleDateChange} value={date} />
      <div className="time-slots">
        {availableTimes.length > 0 ? (
          availableTimes.map((slot, index) => {
            const isReserved = slot.isReserved; 
  
            return (
              <div
                key={index}
                className={`time-slot ${selectedTime === slot.time ? 'selected' : ''} 
                ${isReserved ? 'reserved' : ''}`}
                onClick={() => !isReserved && handleTimeSelect(slot.time)} 
                style={{ backgroundColor: isReserved ? 'gray' : '' }} 
              >
                {slot.time}
              </div>
            );
          })
        ) : (
          <div>이용 가능한 시간이 없습니다.</div>
        )}
      </div>
      {selectedTime && (
        <button 
          className="next-step-button" 
          onClick={handleNextStep} 
          disabled={reservedTimes[selectedDate?.getDate()]?.some(
            (res) => selectedTime >= res.start && selectedTime < res.end
          )}
        >
          다음 단계
        </button>
      )}
    </div>
  );
}

export default MainPage;
