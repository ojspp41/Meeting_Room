import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/admin.css';
import { useNoticeStore } from '../../store';
import AdminNav from '../components/NavigationBar/AdminNav';
import axiosCookie from '../../axiosCookie';
export const AdminNoticeEditDetail = () => {
  const { id, title, content, setTitle, setContent } = useNoticeStore();
  const navigate = useNavigate();

  console.log("제목:", title);
  console.log("내용:", content);

  // Zustand에서 가져온 데이터를 기본값으로 설정
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedContent, setUpdatedContent] = useState(content);

 
  const handleUpdate = async () => {
    try {
      await axiosCookie.post(`/api/notice/${id}`, {
        title: updatedTitle,
        content: updatedContent,
      });

      alert('공지사항이 수정되었습니다.');
      navigate('/admin/notice/edit'); // 수정 후 목록 페이지로 이동
    } catch (error) {
      console.error('공지사항 수정 실패:', error.response?.data || error.message);
      alert('공지사항 수정에 실패했습니다.');
    }
  };


  // ✅ 잘못된 접근 방지 (id 또는 title이 없으면 목록 페이지로 이동)
  useEffect(() => {
    if (!id || !title) {
      alert("잘못된 접근입니다.");
      navigate('/admin/notice');
    }
  }, [id, title, navigate]);

  return (
    <div className="admin-container">
      <AdminNav title="공지사항 수정" />
      <h2>공지사항 수정</h2>
      <div className="adminwrite-form-container">
        <input
          type="text"
          className="adminwrite-input"
          placeholder="제목을 입력하세요"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
        />
        <textarea
          className="adminwrite-textarea"
          placeholder="내용을 입력하세요"
          value={updatedContent}
          onChange={(e) => setUpdatedContent(e.target.value)}
        ></textarea>
        <button className="adminwrite-submit-button" onClick={handleUpdate}>
          수정 완료
        </button>
      </div>
    </div>
  );
};

export default AdminNoticeEditDetail;
