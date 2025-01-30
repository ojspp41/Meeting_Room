// Styles.js
import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  margin-right: 4%;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  width: 310px;
  height: 180px;
  background: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  color: var(--black2, #121212);
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;

export const CloseButton = styled.button`
  width: 100%;
  height: 28%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  padding: 8px 12px;
  border: none;
  border-radius: 10px;
  background: var(--black2, #121212);
  cursor: pointer;
  font-size: 16px;
  color: #f9f9f9;
  font-weight: 500;
  line-height: 100%;
  &:hover {
    background: #092064;
  }
`;
