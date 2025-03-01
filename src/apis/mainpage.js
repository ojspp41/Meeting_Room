import axios from '../axiosConfig';

export const fetchFullyBookedDates = async (year, month) => {
  const response = await axios.get('https://csiereserve.store/api/reservation/check-fully-reserved', {
    params: { year, month },
  });
  return response.data?.data || [];
};

export const fetchReservedTimes = async (year, month) => {
  const response = await axios.post('https://csiereserve.store/api/reservation/get/byDate', { year, month });
  
  return response.data?.data || {};
  
  
};

export const fetchAvailableTimes = async (selectedDate) => {
  if (!selectedDate) return [];

  const formattedDate = selectedDate.toISOString().split('T')[0];
  const response = await axios.post('https://csiereserve.store/api/reservation/check', {
    reservationDate: formattedDate,
    reservationStartTime: '10:00',
    reservationEndTime: '22:00',
  });
  


  return response.data?.data ? true : false;
};
