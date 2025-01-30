import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './css/ReservationDetails.css';

function ReservationDetails() {
  const location = useLocation();
  const {
    facility,
    name,
    studentNumber,
    phone: initialPhone,
    date,
    time,
    participants: initialParticipants,
  } = location.state || {};

  const [phone, setPhone] = useState(initialPhone || '');
  const [participants, setParticipants] = useState(initialParticipants || 2);

  const reservationDetails = {
    '이용 시설': facility,
    '이름': name,
    '학번': studentNumber,
    '예약일': date,
    '이용 시간': time,
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleParticipantsChange = (e) => {
    setParticipants(e.target.value);
  };

  const handleReservationComplete = () => {
    alert(`예약이 완료되었습니다!\n전화번호: ${phone}\n참가 인원: ${participants}명`);
  };

  return (
    <div className="reservation-details">
      <h1 className="title">예약 상세 정보</h1>
      {Object.entries(reservationDetails).map(([key, value]) => (
        <p key={key} className="detail-item">
          <strong>{key}:</strong> {value}
        </p>
      ))}
      <div className="detail-item">
        <strong>전화번호:</strong>
        <input
          type="text"
          value={phone}
          onChange={handlePhoneChange}
          className="phone-input"
        />
      </div>
      <div className="detail-item">
        <strong>참가 인원:</strong>
        <select
          value={participants}
          onChange={handleParticipantsChange}
          className="participants-select"
        >
          {[2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}명
            </option>
          ))}
        </select>
      </div>
      <button className="reservation-button" onClick={handleReservationComplete}>
        예약 완료하기
      </button>
    </div>
  );
}

export default ReservationDetails;