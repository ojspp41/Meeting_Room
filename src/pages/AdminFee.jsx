import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/admin.css';

import AdminNav from '../components/NavigationBar/AdminNav';
export const AdminFee = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');

  const handleAddStudentFeePayer = async () => {
    const response = await fetch('/api/admin/studentFeePayer/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, studentId }),
    });

    if (response.ok) {
      alert('학생회비자가 추가되었습니다.');
      setIsModalOpen(false);
      setName('');
      setStudentId('');
    } else {
      alert('추가 실패. 다시 시도하세요.');
    }
  };

  return (
    <div className="admin-container">
      <AdminNav title="관리자 학생회비" />
      <div className="admin-button-container">
        <button className="admin-button" onClick={() => setIsModalOpen(true)}>
          학생회비자 추가
        </button>
        <button className="admin-button" onClick={() => navigate('/admin/fee/edit')}>
          학생회비자 목록 조회
        </button>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>학생회비자 추가</h2>
            <input
              type="text"
              placeholder="이름 입력"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="modal-input"
            />
            <input
              type="text"
              placeholder="학번 입력"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="modal-input"
            />
            <div className="modal-button-container">
                
                <button className="modal-button close" onClick={() => setIsModalOpen(false)}>
                닫기
                </button>
                <button className="modal-button" onClick={handleAddStudentFeePayer}>
                추가
                </button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFee;