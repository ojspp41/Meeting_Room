import axiosCookie from '../../axiosCookie'; 

export const createReservation = async (phone, reservationStartTime, reservationEndTime, participants, reservationDate) => {
  try {
    reservationStartTime = reservationStartTime.trim();
    reservationEndTime = reservationEndTime.trim();

    // reservationDate를 한국 시간(KST) 기준으로 변환
    const date = new Date(reservationDate);
    const kstOffset = 9 * 60; // 한국 시간은 UTC+9
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset() + kstOffset); // UTC에서 KST로 변환

    const formattedReservationDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    // applicationDate는 현재 한국 시간 기준으로 변환
    const currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() + currentDate.getTimezoneOffset() + kstOffset); // UTC에서 KST로 변환

    const formattedApplicationDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

    console.log('📢 예약 생성 요청 데이터:', {
      phoneNumber: phone,
      reservationStartTime,
      reservationEndTime,
      participantCount: participants,
      reservationDate: formattedReservationDate, 
      applicationDate: formattedApplicationDate, 
    });

    const response = await axiosCookie.post('https://csiereserve.store/api/reservation/create', {
      phoneNumber: phone,
      reservationStartTime,
      reservationEndTime,
      participantCount: participants,
      reservationDate: formattedReservationDate, 
      applicationDate: formattedApplicationDate, 
    });

    console.log('✅ 예약 생성 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ 예약 생성 실패:', error.response || error.message);
    throw error;
  }
};
