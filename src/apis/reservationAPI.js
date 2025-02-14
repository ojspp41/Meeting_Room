import axios from "../../axiosCookie";

export const fetchReservations = async () => {
    return [
      {
        id: 1,
        reservationDate: "2025-02-13",
        reservationStartTime: "2025-02-13T10:00:00Z",
        reservationEndTime: "2025-02-13T12:00:00Z",
        participantCount: 3,
      },
      {
        id: 2,
        reservationDate: "2025-02-14",
        reservationStartTime: "2025-02-14T14:00:00Z",
        reservationEndTime: "2025-02-14T16:00:00Z",
        participantCount: 5,
      },
    ];
  };
  /* 
export const fetchReservations = async () => {
  try {
    const response = await axios.get("https://csiereserve.store/api/reservation/get");
    return response.data.data || [];
  } catch (error) {
    console.error("예약 목록을 불러오는 중 오류 발생", error);
    return [];
  }
};
*/
export const cancelReservation = async (id) => {
  try {
    const response = await axios.delete(`https://csiereserve.store/api/reservation/cancel/${id}`);
    return response.status === 200;
  } catch (error) {
    console.error("예약 취소 중 오류 발생", error);
    return false;
  }
};
