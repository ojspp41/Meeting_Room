import React from "react";
import * as S from "../CancelModal/Styles"; 
import CancelIcon from "../../../public/assets/cancelcircle.svg"

const CancelModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <S.ModalOverlay>
      <S.Modal>
        <S.CancelIcon><img src={CancelIcon}/></S.CancelIcon>
        <S.ModalText>해당 예약을 취소하시겠습니까?</S.ModalText>
        <S.ModalButtons>
          <S.ConfirmButton onClick={onConfirm}>예</S.ConfirmButton>
          <S.CancelButton onClick={onClose}>아니오</S.CancelButton>
        </S.ModalButtons>
      </S.Modal>
    </S.ModalOverlay>
  );
};

export default CancelModal;
