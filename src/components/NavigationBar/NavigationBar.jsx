import React from 'react';
import { NavBarContainer, LogoImage, VectorImage } from '../NavigationBar/Styles'; 


function NavigationBar() {
  return (
    <NavBarContainer>
      <LogoImage src="/assets/logo.svg" alt='로고'/>
      <span>컴퓨터정보공학부</span>
      <VectorImage src="/assets/vector.svg" alt='로고'/>
    </NavBarContainer>
  );
}

export default NavigationBar;
