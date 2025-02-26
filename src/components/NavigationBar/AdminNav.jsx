import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AdminNavBarContainer, LogoImage, VectorImage, 
  DropdownMenu, DropdownItem, DropdownIcon ,DropdownText
} from './Styles.js';

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
    { label: "관리자 메인", path: "/admin", icon: "/assets/home.svg" },
    { label: "관리자 학생회비", path: "/admin/fee", icon: "/assets/money.svg" },
    { label: "관리자 공지사항", path: "/admin/notice", icon: "/assets/notice.svg" },
    { label: "관리자 FAQ", path: "/admin/faq", icon: "/assets/faq.svg" }
  ];

  return (
    <AdminNavBarContainer>
      <LogoImage src="/assets/logo.svg" alt="로고" onClick={() => navigate('/admin')} />
      <span>{title}</span>
      <VectorImage 
        src={isOpen ? "/assets/x.png" : "/assets/vector.svg"} 
        alt="메뉴 토글"
        onClick={toggleDropdown} 
      />
      {isOpen && (
        <DropdownMenu>
          {menuItems.map((item, index) => (
            <DropdownItem key={index}>
              <DropdownText onClick={() => { navigate(item.path); closeDropdown(); }}>
                {item.label}
              </DropdownText>
              <DropdownIcon src="/assets/gt.svg" alt="icon" onClick={() => { navigate(item.path); closeDropdown(); }} />
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </AdminNavBarContainer>
  );
}

export default AdminNav;
