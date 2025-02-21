import axios from '../axiosConfig';


export const fetchReservedTimes = async (year, month) => {
  try {
    const response = await axios.post('https://csiereserve.store/api/reservation/get/byDate', { year, month });

    return response.data?.data || [];
  } catch (error) {
    console.error('오류:', error.response || error.message);
    return [];
  }
};
