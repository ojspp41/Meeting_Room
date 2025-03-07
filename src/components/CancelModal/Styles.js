import styled from "styled-components";


export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;


export const Modal = styled.div`
  color: var(--black2, #121212);
  background-color: white;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 300px;
`;


export const CancelIcon = styled.div`
  width: 100%;
  border-radius: 10px;
  color: black;
  border: none;
  margin-bottom: 15px;
`;

export const ModalText = styled.p`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  line-height: 150%;
  margin-bottom: 20px;
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
