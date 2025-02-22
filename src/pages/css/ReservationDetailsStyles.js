import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #F5F5F5;

`;

export const ReservationDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color:white;
  border: 2px solid #ccc;
  border-radius: 10px;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.25);
  margin-top: 13%;
  height: 50%;
  width: calc(100% - 40px);
`;

export const ReservationButton = styled.button`
  width: 40%;
  border: none;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.25);
  color: #121212;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  width: 155px;
  height: 40px;
  padding: 10px;
  margin-top: 10%;
  &:hover {
    border-radius: 5px;
    background: #121212;
    box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.25);
    color: #f9f9f9;
  }
`;

export const DetailItem = styled.p`
  display: flex;
  width: 80%;
  color: #121212;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
  margin: 0;
`;

export const PhoneInput = styled.input`
  font-size: 18px;
  color: #b4b4b4;
  border-radius: 5px;
  background: none;
  border: none;
  width: 50%;
`;

export const ParticipantsSelect = styled.select`
  font-family: Pretendard;
  font-size: 18px;
  color: #b4b4b4;
  
  border-radius: 5px;
  background: none;
  border: 1px solid #ccc;
  width:30%;
`;

export const OptionContainer = styled.div`
  width: 100px;
`;
