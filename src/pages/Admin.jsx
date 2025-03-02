import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/admin.css';
import AdminNav from '../components/NavigationBar/AdminNav';
export const Faq = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      // 로컬스토리지에서 accessToken 삭제
      localStorage.removeItem('accessToken');
      
      // 로그인 페이지로 리디렉션
      navigate('/');
    } catch (error) {
      alert('로그아웃 실패');
    }
  };
  return (
    <div className="admin-container">
      <AdminNav title="관리자 메인" />
      <div className="admin-button-container">
        <button className="admin-button" onClick={() => navigate('/admin/notice')}>
          공지사항 관리
        </button>
        <button className="admin-button" onClick={() => navigate('/admin/faq')}>
          FAQ 관리
        </button>
        <button className="admin-button" onClick={() => navigate('/admin/fee')}>
          학생회비 납부자 관리
        </button>
      </div>
      <button className="logout-button" onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default Faq;