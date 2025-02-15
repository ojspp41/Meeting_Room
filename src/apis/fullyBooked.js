import axios from '../axiosConfig';

export const fetchFullyBookedDates = async (year, month) => {
  try {
    console.log(`예약 마감 날짜 요 year=${year}, month=${month}`);
    const response = await axios.get('https://csiereserve.store/api/reservation/check-fully-reserved', {
      params: { year, month },
    });

    console.log('예약 마감된 날짜:', response.data);
    return response.data?.data || [];
  } catch (error) {
    console.error(' 예약 마감된 날짜 오류:', error.response || error.message);
    return [];
  }
};
