import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Modal = styled.div`
  color: var(--black2, #121212);
  background-color: white;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 300px;
`;

export const CancelIcon = styled.div`
  width: 100%;
  border-radius: 10px;
  color: black;
  border: none;
`;
export const ModalText = styled.p`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  line-height: 150%;
`;

export const ModalButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 10px;
`;

export const ConfirmButton = styled.button`
  width: 100%;
  color: white;
  cursor: pointer;
  border-radius: 10px;
  background: var(--black2, #121212);
  border: none;
  padding: 5%;
`;

export const CancelButton = styled.button`
  width: 100%;
  border-radius: 10px;
  background: var(--gray4, #EEE);
  color: black;
  cursor: pointer;
  border: none;
  padding: 5%;
`;
