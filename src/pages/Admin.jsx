import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/admin.css';
import AdminNav from '../components/NavigationBar/AdminNav';
export const Faq = () => {
  const navigate = useNavigate();

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
    </div>
  );
};

export default Faq;