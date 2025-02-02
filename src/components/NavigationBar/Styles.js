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