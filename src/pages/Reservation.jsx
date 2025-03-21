import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { reservationState } from "../recoil/reservationAtom";
import { fetchReservations, cancelReservation } from "../apis/reservationAPI";
import "./css/Reservation.css";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import DownIcon from "../../public/assets/Down.svg";
import CancelModal from "../components/CancelModal/CancelModal";
import { motion } from "framer-motion";  // framer-motion 추가

const Reservations = () => {
  const [reservations, setReservations] = useRecoilState(reservationState);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [reservationToCancel, setReservationToCancel] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    fetchReservations().then((data) => {
      const updatedReservations = data.map((reservation) => {
        const reservationEndTime = new Date(reservation.reservationEndTime);
        const currentTime = new Date();

        if (reservationEndTime < currentTime && reservation.reservationStatus !== "CANCELLED") {
          reservation.reservationStatus = "COMPLETED"; 
        }

        return reservation;
      });

      const sortedReservations = updatedReservations.sort((a, b) => new Date(b.reservationDate) - new Date(a.reservationDate));
      setReservations(sortedReservations);
    });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReservations = reservations.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(reservations.length / itemsPerPage);

  const handleCancel = async () => {
    if (reservationToCancel) {
      try {
        const success = await cancelReservation(reservationToCancel);

        if (success) {
          fetchReservations().then((data) => {
            const sortedReservations = data.sort((a, b) => new Date(b.reservationDate) - new Date(a.reservationDate));
            setReservations(sortedReservations);
          });
        }
      } catch (error) {
        console.error("예약 취소 중 에러 발생:", error);
      }

      setModalOpen(false);
      setReservationToCancel(null);
    }
  };

  const getReservationStatusMessage = (status) => {
    switch (status) {
      case "RESERVED":
        return "예약중";
      case "CANCELLED":
        return "예약취소";
      case "COMPLETED":
        return "사용완료";
      default:
        return "사용완료";
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

  const formatTimeSlice = (dateString) => {
    return dateString.split("T")[1].slice(0, 5);
  };

  return (
    <div className="container">
      <NavigationBar title="예약 일정 확인/취소" />
      <div className="contents-container">
        <div className="text-wrapper">최근 30일 이내</div>
        {currentReservations.length > 0 ? (
          currentReservations.map((res, index) => (
            <div className="reservation-item" key={res.id}>
              <div className="reservation-header">
                <div className="reservation-number">{indexOfFirstItem + index + 1}</div>
                <p className="reservation-date">{formatDate(res.reservationDate)}</p>
                <button className="dropdown-icon" onClick={() => toggleReservationDetails(res.id)}>
                  {/* motion을 사용해 회전 애니메이션 추가 */}
                  <motion.img
                    src={DownIcon}
                    alt="dropdown icon"
                    initial={{ rotate: 0 }} // 초기 상태 (0도)
                    animate={{ rotate: selectedReservation === res.id ? 180 : 0 }} // 선택된 예약일 때 회전
                    transition={{ duration: 0.3 }} // 애니메이션 시간
                  />
                </button>
              </div>
              {selectedReservation === res.id && (
                <div className="reservation-details">
                  <div className="item-wrapper">
                    <div className="detail-items">신청 일자    {formatDate(res.reservationDate)}</div>
                    <div className="detail-items">
                      이용 시간    {formatTimeSlice(res.reservationStartTime)} ~ {formatTimeSlice(res.reservationEndTime)}
                    </div>
                    <div className='detail-items'>예약 상태    {getReservationStatusMessage(res.reservationStatus)}</div>
                  </div>
                  <button
                    className={`cancel ${res.reservationStatus === "CANCELLED" || res.reservationStatus === "COMPLETED" ? "disabled" : ""}`}
                    onClick={() => openCancelModal(res.id)}
                    disabled={res.reservationStatus === "CANCELLED" || res.reservationStatus === "COMPLETED"}
                  >
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

      <div className="pagination-container">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`pagination-button ${currentPage === index + 1 ? "active" : ""}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <CancelModal isOpen={modalOpen} onClose={closeModal} onConfirm={handleCancel} />
    </div>
  );
};

export default Reservations;
