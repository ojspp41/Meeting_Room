// ReservationDetails.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import SuccessModal from '../components/SuccessModal/SuccessModal';
import { createReservation } from '../apis/createReservation'; 
import * as S from '../pages/css/ReservationDetailsStyles';

function ReservationDetails() {
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleReservationComplete = async () => {
    try {
      await createReservation(phone, time.split('~')[0], time.split('~')[1], participants, date);
      
      setIsModalOpen(true); 
      setTimeout(() => {
        navigate('/mainpage'); 
      }, 2000);
    } catch (error) {
      console.error('예약 실패:', error.message);
      alert('예약에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <S.Container>
      <NavigationBar title="컴퓨터정보공학부" />
      <S.ReservationDetails>
        {reservationDetails &&
          Object.entries(reservationDetails).map(([key, value]) => (
            <S.DetailItem key={key}>
              <S.OptionContainer>{key}</S.OptionContainer>
              {value}
            </S.DetailItem>
          ))}

        <S.DetailItem>
          <S.OptionContainer>전화번호</S.OptionContainer>
          <S.PhoneInput type="text" value={phone} onChange={handlePhoneChange} />
        </S.DetailItem>

        <S.DetailItem>
          <S.OptionContainer>참가인원</S.OptionContainer>
          <S.ParticipantsSelect value={participants} onChange={handleParticipantsChange}>
            {[2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}명
              </option>
            ))}
          </S.ParticipantsSelect>
        </S.DetailItem>
      </S.ReservationDetails>
      <S.ReservationButton onClick={handleReservationComplete}>
        예약 완료하기
        <SuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </S.ReservationButton>
    </S.Container>
  );
}

export default ReservationDetails;
