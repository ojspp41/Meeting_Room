import axios from '../axiosConfig';

export const fetchAvailableTimes = async (selectedDate) => {
  try {
    const formattedDate = selectedDate.toISOString().split('T')[0];
    console.log(`📢 특정 날짜(${formattedDate})의 예약 가능 시간 조회 요청`);

    const response = await axios.post('https://csiereserve.store/api/reservation/check', {
      reservationDate: formattedDate,
      reservationStartTime: '10:00',
      reservationEndTime: '22:00',
    });

    console.log('✅ 특정 날짜 예약 가능 여부 응답:', response.data);
    return response.data?.data ? true : false;
  } catch (error) {
    console.error('❌ 예약 정보를 불러오는 중 오류 발생:', error.response || error.message);
    return false;
  }
};
