import axios from '../axiosConfig';

export const fetchAvailableTimes = async (selectedDate) => {
  try {
    const formattedDate = selectedDate.toISOString().split('T')[0];

    const response = await axios.post('https://csiereserve.store/api/reservation/check', {
      reservationDate: formattedDate,
      reservationStartTime: '10:00',
      reservationEndTime: '22:00',
    });

    return response.data?.data ? true : false;
  } catch (error) {
    console.error('❌ 예약 정보를 불러오는 중 오류 발생:', error.response || error.message);
    return false;
  }
};
