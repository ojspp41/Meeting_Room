import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import './css/admin.css';
import axiosCookie from '../../axiosCookie';
import AdminNav from '../components/NavigationBar/AdminNav';

export const AdminNoticeWrite = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // React Query 캐시 관리
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // ✅ 공지사항 등록 API 요청 (useMutation 사용)
  const mutation = useMutation({
    mutationFn: async (newNotice) => {
      await axiosCookie.post('/api/admin/notice', newNotice);
    },
    onSuccess: () => {
      alert('공지사항이 등록되었습니다.');
      queryClient.invalidateQueries(['notices']); // 공지사항 목록 새로고침
      navigate('/admin/notice'); // 목록 페이지로 이동
    },
    onError: (error) => {
      console.error('Error submitting notice:', error.response?.data || error.message);
      alert('공지사항 등록에 실패했습니다.');
    },
  });

  // ✅ 제출 핸들러
  const handleSubmit = () => {
    mutation.mutate({
      title,
      content,
    });
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
        <button
          className="adminwrite-submit-button"
          onClick={handleSubmit}
          disabled={mutation.isLoading} // 로딩 중 버튼 비활성화
        >
          {mutation.isLoading ? '등록 중...' : '등록'}
        </button>
      </div>
    </div>
  );
};

export default AdminNoticeWrite;
