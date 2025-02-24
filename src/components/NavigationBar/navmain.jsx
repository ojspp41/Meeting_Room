import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavMainContainer, LogoImage, VectorImage, DropdownMenu, DropdownItem } from '../NavigationBar/Styles'; 

function NavMain({ title }) {
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
    { label: "교내 타회의실 예약", path: "/mainpage" },
    { label: "자주 묻는 질문", path: "/faq" },
    { label: "공지사항", path: "/notice" },
    { label: "회의실/과방 위치", path: "/map" }
  ];

  return (
    <NavMainContainer>
      <LogoImage src="/assets/logo.svg" alt='로고'
      onClick={handleLogoClick} // ✅ 로고 클릭 시 이동
      />
      <span>{title}</span>
      <VectorImage 
              src={isOpen ? "/assets/x.png" : "/assets/vector.svg"} 
              alt="메뉴 토글"
              onClick={toggleDropdown} 
            />
      {isOpen && (
        
        <DropdownMenu>
          
          {menuItems.map((item, index) => (
            <DropdownItem key={index} onClick={() => { navigate(item.path); closeDropdown(); }}>
              {item.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
     
      )}
    </NavMainContainer>
  );
}

export default NavMain;
