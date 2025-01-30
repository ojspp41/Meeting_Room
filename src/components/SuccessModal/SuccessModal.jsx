import React from "react";
import { ModalOverlay, ModalContent, CloseButton } from '../SuccessModal/Styles'

const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <ModalOverlay>
      <ModalContent>
        <img src="/assets/checkcircle.svg" alt="Check Circle" />
        <p>신청 완료했습니다</p>
        <CloseButton onClick={onClose}>확인</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SuccessModal;
