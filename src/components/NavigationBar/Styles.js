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


export const AdminNavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 76px;
  background-color: white;
  color: var(--black2, #121212);
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  line-height: 150%;
  border-bottom: 1px solid #B4B4B4;
  z-index: 1000;
  padding : 0px 20px 
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
  z-index: 1000;
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
  top: 85px;
  padding: 10px 20px;
  left: 0;
  width: calc(100% - 40px);
  background: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  animation: ${slideDown} 0.7s ease-out;
  z-index: 1000;
`;


export const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* 좌우 정렬 */
  padding: 10px 16px;
  cursor: default; /* 기본적으로 클릭 불가 (이미지만 클릭 가능) */
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

export const DropdownText = styled.span`
  font-size: 16px;
  font-family: 'Pretendard', sans-serif;
  color: #121212;
  font-weight: 400; /* Regular */
  text-align: left;
`;

export const DropdownIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer; /* 아이콘 클릭 가능 */
`;

