import axios from '../axiosConfig';


export const fetchReservedTimes = async (year, month) => {
  try {
    console.log(`월(${year}-${month}) 예약 시간 조회`);
    const response = await axios.post('https://csiereserve.store/api/reservation/get/byDate', { year, month });

    console.log('예약 시간:', response.data);
    return response.data?.data || [];
  } catch (error) {
    console.error('오류:', error.response || error.message);
    return [];
  }
};
