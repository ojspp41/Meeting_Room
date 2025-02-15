import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/admin.css';
import AdminNav from '../components/NavigationBar/AdminNav';
import axiosCookie from '../../axiosCookie';
import { useMutation } from '@tanstack/react-query';

export const AdminFaqWrite = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  // ✅ FAQ 등록 API 요청 (useMutation 사용)
  const mutation = useMutation({
    mutationFn: async (newFaq) => {
      const response = await axiosCookie.post('/api/admin/faq/create', newFaq);
      return response.data;
    },
    onSuccess: () => {
      alert('FAQ가 등록되었습니다.');
      navigate('/admin/faq'); // FAQ 목록 페이지로 이동
    },
    onError: (error) => {
      console.error('FAQ 등록 실패:', error.response?.data || error.message);
      alert('FAQ 등록에 실패했습니다.');
    },
  });

  // ✅ 제출 핸들러
  const handleSubmit = () => {
    mutation.mutate({ question, answer });
  };



  return (
    <div className="admin-container">
      <AdminNav title="FAQ 작성" />
      <h2>FAQ 작성</h2>
      <div className="adminwrite-form-container">
        <input
          type="text"
          className="adminwrite-input"
          placeholder="질문을 입력하세요"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <textarea
          className="adminwrite-textarea"
          placeholder="답변을 입력하세요"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        ></textarea>
        <button className="adminwrite-submit-button" onClick={handleSubmit}>
          등록
        </button>
      </div>
    </div>
  );
};

export default AdminFaqWrite;
