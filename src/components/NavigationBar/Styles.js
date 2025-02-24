// NavigationBar/Styles.js
import styled, { keyframes } from 'styled-components';

// ✅ 드롭다운이 아래로 차르륵 내려오는 애니메이션 (슬라이드 다운)
const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;




export const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 76px;
  background-color:white;
  color: var(--black2, #121212);
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  line-height: 150%;
  border-bottom: 1px solid #B4B4B4; 
  z-index: 100;
`;
export const TextDiv =styled.div`
width:60%;
`;

export const LogoImage = styled.img`
  width: 41px; 
  height: 52px;  
`;

export const VectorImage = styled.img`
  width: 24px; 
  height: 24px;
  padding: 2%;
`;
export const DropdownMenu = styled.div`
  position: absolute;
  top: 90px;
  
  left: 0;
  width: 100%;
  background: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  animation: ${slideDown} 0.7s ease-out;
`;

export const DropdownItem = styled.div`

  font-size: 20px;
  font-weight: 400;
  line-height: 16px;
  color: #121212;
  padding: 35px 16px 15px 0px;
  cursor: pointer;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;
