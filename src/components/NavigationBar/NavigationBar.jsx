import React from 'react';
import { NavBarContainer, LogoImage, VectorImage } from '../NavigationBar/Styles'; 

function NavigationBar({ title }) {
  return (
    <NavBarContainer>
      <LogoImage src="/assets/logo.svg" alt='로고'/>
      <span>{title}</span>
      <VectorImage src="/assets/vector.svg" alt='로고'/>
    </NavBarContainer>
  );
}

export default NavigationBar;
