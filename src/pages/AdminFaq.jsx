import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/admin.css';
import AdminNav from '../components/NavigationBar/AdminNav';
export const AdminFaq = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-container">
      <AdminNav title="관리자 FAQ" />
      <div className="admin-button-container">
        <button className="admin-button" onClick={() => navigate('/admin/faq/write')}>
          FAQ 작성
        </button>
        <button className="admin-button" onClick={() => navigate('/admin/faq/edit')}>
          FAQ 목록 조회
        </button>
        
      </div>
    </div>
  );
};

export default AdminFaq;