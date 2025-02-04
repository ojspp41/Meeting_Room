import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBarContainer, LogoImage, VectorImage, DropdownMenu, DropdownItem } from '../NavigationBar/Styles'; 

function AdminNav({ title }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };



  const menuItems = [
    { label: "관리자 메인", path: "/admin" },
    { label: "관리자 학생회비", path: "/admin/fee" },
    { label: "관리자 공지사항", path: "/admin/faq" },
    { label: "관리자 FAQ", path: "/admin/notice" }
  ];

  return (
    <NavBarContainer>
      <LogoImage src="/assets/logo.svg" alt='로고'/>
      <span>{title}</span>
      <VectorImage src="/assets/vector.svg" alt='로고' onClick={toggleDropdown} />
      {isOpen && (
        
        <DropdownMenu>
          
          {menuItems.map((item, index) => (
            <DropdownItem key={index} onClick={() => { navigate(item.path); closeDropdown(); }}>
              {item.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
     
      )}
    </NavBarContainer>
  );
}

export default AdminNav;
