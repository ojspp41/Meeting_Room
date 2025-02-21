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
  const [participants, setParticipants] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const validatePhone = (phone) => {
    if (!phone.startsWith('010') || phone.length !== 11 || isNaN(phone)) {
      alert('전화번호는 010으로 시작하고, 11자리 숫자여야 합니다.');
      return false;
    }
    return true;
  };

  const handleReservationComplete = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    // 전화번호 검증
    if (!validatePhone(phone)) {
      setIsSubmitting(false);  // 버튼 상태를 다시 활성화
      return;  // 유효하지 않으면 예약 진행하지 않음
    }

    try {
      await createReservation(phone, time.split('~')[0], time.split('~')[1], participants, date);
      setIsModalOpen(true); 
    } catch (error) {
      alert('예약에 실패했습니다. 다시 시도해주세요.');
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate('/mainpage');
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
          <S.PhoneInput type="text" value={phone} onChange={handlePhoneChange} onFocus={() => setPhone('')} />
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
      <S.ReservationButton onClick={handleReservationComplete} disabled={isSubmitting}>
        예약 완료하기
      </S.ReservationButton>
      <SuccessModal isOpen={isModalOpen} onClose={handleModalClose} />
    </S.Container>
  );
}

export default ReservationDetails;
