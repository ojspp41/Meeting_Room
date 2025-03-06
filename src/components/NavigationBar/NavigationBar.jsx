import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBarContainer, LogoImage, VectorImage, DropdownMenu, DropdownItem, TextDiv, DropdownText, DropdownIcon } from '../NavigationBar/Styles'; 

function NavigationBar({ title }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };
  const handleLogoClick = () => {
    navigate('/mainpage');
  }


  const menuItems = [
    { label: "예약 일정 확인/취소", path: "/reservation" },
    { label: "교내 타회의실 예약", path: "/meetingroominfo" },
    { label: "자주 묻는 질문", path: "/faq" },
    { label: "공지사항", path: "/notice" },
    { label: "회의실/과방 위치", path: "/map" }
  ];

  return (
    <NavBarContainer>
      <LogoImage src="/assets/logo.svg" alt='로고'
      onClick={handleLogoClick} // ✅ 로고 클릭 시 이동
      />
      <TextDiv>{title}</TextDiv>
      <VectorImage 
              src={isOpen ? "/assets/x.png" : "/assets/vector.svg"} 
              alt="메뉴 토글"
              onClick={toggleDropdown} 
            />
      {isOpen && (
        
        <DropdownMenu>
          
          {menuItems.map((item, index) => (
            <DropdownItem 
            key={index} 
            className="dropdown-item"
          >
            <DropdownText
              onClick={() => { navigate(item.path); }} 
            >{item.label}</DropdownText>
            <DropdownIcon 
              src="/assets/gt.svg" 
              alt="icon" 
              onClick={() => { navigate(item.path); }} 
            />
          </DropdownItem>
          
          
          ))}
        </DropdownMenu>
     
      )}
    </NavBarContainer>
  );
}

export default NavigationBar;
