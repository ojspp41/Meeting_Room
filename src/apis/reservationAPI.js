import axios from "../../axiosCookie";

export const fetchReservations = async () => {
  try {
    const response = await axios.get("https://csiereserve.store/api/reservation/get");
    return response.data.data || [];
  } catch (error) {
    console.error("예약 목록을 불러오는 중 오류 발생", error);
    return [];
  }
};

export const cancelReservation = async (id) => {
  try {
    const response = await axios.put(`https://csiereserve.store/api/reservation/cancel/${id}`);
    console.log("취소 요청 응답:", response);  
    return response.status === 200;
  } catch (error) {
    console.error("예약 취소 중 오류 발생", error);
    return false;
  }
};


