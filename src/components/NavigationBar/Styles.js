// NavigationBar/Styles.js
import styled from 'styled-components';

export const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 390px;
  height: 76px;
  color: var(--black2, #121212);
  text-align: center;
  font-family: Pretendard;
  font-size: 22px;
  font-weight: 600;
  line-height: 150%;
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