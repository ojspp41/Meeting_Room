import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { reservationState } from "../recoil/reservationAtom";
import { fetchReservations, cancelReservation } from "../apis/reservationAPI";
import "./css/Reservation.css"; 
import NavigationBar from "../components/NavigationBar/NavigationBar";
import DownIcon from "../../public/assets/Down.svg";
import CancelModal from "../components/CancelModal/CancelModal";
const Reservations = () => {
  const [reservations, setReservations] = useRecoilState(reservationState);
  const [selectedReservation, setSelectedReservation] = useState(null); 
  const [modalOpen, setModalOpen] = useState(false);
  const [reservationToCancel, setReservationToCancel] = useState(null);

  useEffect(() => {
    fetchReservations().then((data) => {
      const sortedReservations = data.sort((a, b) => new Date(b.reservationDate) - new Date(a.reservationDate));
      setReservations(sortedReservations);
    });
  }, []);

  const handleCancel = async () => {
    if (reservationToCancel) {
      const success = await cancelReservation(reservationToCancel);
      if (success) {
        setReservations(reservations.filter((res) => res.id !== reservationToCancel));
      }
      setModalOpen(false);
      setReservationToCancel(null);
    }
  };

  const toggleReservationDetails = (id) => {
    setSelectedReservation(selectedReservation === id ? null : id);
  };

  const openCancelModal = (id) => {
    setReservationToCancel(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setReservationToCancel(null);
  };

  return (
    <div className="container">
      <NavigationBar title="예약 일정 확인/취소" />
      <div className="contents-container">
        <div className="text-wrapper">최근 30일 이내</div>
        {reservations.length > 0 ? (
          reservations.map((res, index) => (
            <div className="reservation-item" key={res.id}> 
              <div className="reservation-header">
                <div className="reservation-number">{index + 1}</div>
                <p>{new Date(res.reservationDate).toLocaleDateString()}</p>
                <button className="dropdown-icon" onClick={() => toggleReservationDetails(res.id)}>
                  <img src={DownIcon} alt="드롭다운 아이콘" />
                </button>
              </div>
              
              {selectedReservation === res.id && (
                <div className="reservation-details">
                  <div className='detail-items'>신청 일자 {new Date(res.reservationStartTime).toLocaleTimeString()} ~ {new Date(res.reservationEndTime).toLocaleTimeString()}</div>
                  <div className='detail-items'>이용 시간 {new Date(res.reservationStartTime).toLocaleTimeString()} ~ {new Date(res.reservationEndTime).toLocaleTimeString()}</div>
                  <div className='detail-items'>예약 상태 예약중</div>
                  <button className="cancel-button" onClick={() => openCancelModal(res.id)}>
                    예약 취소
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>예약 내역이 없습니다.</p>
        )}
      </div>

      <CancelModal isOpen={modalOpen} onClose={closeModal} onConfirm={handleCancel} />
    </div>
  );
};

export default Reservations;
