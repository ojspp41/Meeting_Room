import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/admin.css';

import AdminNav from '../components/NavigationBar/AdminNav';
export const AdminNoticeWrite = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    const response = await fetch('/api/notice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });

    if (response.ok) {
      alert('공지사항이 등록되었습니다.');
      navigate('/admin/notice');
    } else {
      alert('공지사항 등록에 실패했습니다.');
    }
  };

  return (
    <div className="admin-container">
      <AdminNav title="공지사항 작성" />
      <h2>공지사항 작성</h2>
      <div className="adminwrite-form-container">
        <input
          type="text"
          className="adminwrite-input"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="adminwrite-textarea"
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button className="adminwrite-submit-button" onClick={handleSubmit}>
          등록
        </button>
      </div>
    </div>
  );
};

export default AdminNoticeWrite;