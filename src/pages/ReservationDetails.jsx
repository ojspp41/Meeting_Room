import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './css/ReservationDetails.css';
import '../components/NavigationBar/NavigationBar'
import NavigationBar from '../components/NavigationBar/NavigationBar';
import SuccessModal from '../components/SuccessModal/SuccessModal'

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const reservationDetails = {
    '이용 시설': facility,
    '이름': name,
    '학번': studentNumber,
    '예약일': date,
    '이용시간': time,
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleParticipantsChange = (e) => {
    setParticipants(e.target.value);
  };

  const handleReservationComplete = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="container">
      <NavigationBar />
      <div className="reservation-details">
        {reservationDetails &&
          Object.entries(reservationDetails).map(([key, value]) => (
            <p key={key} className="detail-item">
              <div className="option-container">
                <strong>{key}</strong>
              </div>
              {value}
            </p>
          ))}

        <div className="detail-item">
          <div className="option-container">
            <strong>전화번호</strong>
          </div>
          <input
            type="text"
            value={phone}
            onChange={handlePhoneChange}
            className="phone-input"
          />
        </div>

        <div className="detail-item">
          <div className="option-container">
            <strong>참가인원</strong>
          </div>
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
      </div>
      <button className="reservation-button" onClick={handleReservationComplete}>
        예약 완료하기
        <SuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </button>
    </div>
  );
}

export default ReservationDetails;
