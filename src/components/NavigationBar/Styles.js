// NavigationBar/Styles.js
import styled from 'styled-components';

export const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 76px;
  color: var(--black2, #121212);
  text-align: center;
  font-family: Pretendard;
  font-size: 25px;
  font-weight: bold;
  line-height: 150%;
  border-bottom: 1px solid #B4B4B4; /* 하단 보더 추가 */
  
`;

export const LogoImage = styled.img`
  width: 31px; 
  height: 42px;  
`;

export const VectorImage = styled.img`
  width: 24px; 
  height: 18px;
  padding: 2%;  
`;
export const DropdownMenu = styled.div`
  position: absolute;
  top: 120px;
  
  left: 0;
  width: 100%;
  background: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
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
