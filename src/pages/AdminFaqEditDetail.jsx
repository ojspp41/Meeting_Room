import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFaqStore } from '../../store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import './css/admin.css';
import AdminNav from '../components/NavigationBar/AdminNav';
import axiosCookie from '../../axiosCookie';

export const AdminFaqEditDetail = () => {
  const { id, question, answer } = useFaqStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // React Query 캐시 관리

  // Zustand에서 가져온 데이터를 기본값으로 설정
  const [updatedQuestion, setUpdatedQuestion] = useState(question);
  const [updatedAnswer, setUpdatedAnswer] = useState(answer);

  // ✅ FAQ 수정 API 요청 (useMutation 사용)
  const mutation = useMutation({
    mutationFn: async (updatedFaq) => {
      const response = await axiosCookie.put(`/api/admin/faq/update/${id}`, updatedFaq);
      return response.data;
    },
    onSuccess: () => {
      alert('FAQ가 수정되었습니다.');
      queryClient.invalidateQueries(['faqs']); // FAQ 목록 자동 새로고침
      navigate('/admin/faq/edit'); // 수정 후 목록 페이지로 이동
    },
    onError: (error) => {
      console.error('FAQ 수정 실패:', error.response?.data || error.message);
      alert('FAQ 수정에 실패했습니다.');
    },
  });

  // ✅ 수정 핸들러
  const handleUpdate = () => {
    mutation.mutate({
      question: updatedQuestion,
      answer: updatedAnswer,
    });
  };

  // ✅ 잘못된 접근 방지
  useEffect(() => {
    if (!id || !question) {
      alert('잘못된 접근입니다.');
      navigate('/admin/faq/edit');
    }
  }, [id, question, navigate]);

  return (
    <div className="admin-container">
      <AdminNav title="FAQ 수정" />
      <h2>FAQ 수정</h2>
      <div className="adminwrite-form-container">
        <input
          type="text"
          className="adminwrite-input"
          placeholder="질문을 입력하세요"
          value={updatedQuestion}
          onChange={(e) => setUpdatedQuestion(e.target.value)}
        />
        <textarea
          className="adminwrite-textarea"
          placeholder="답변을 입력하세요"
          value={updatedAnswer}
          onChange={(e) => setUpdatedAnswer(e.target.value)}
        ></textarea>
        <button
          className="adminwrite-submit-button"
          onClick={handleUpdate}
          disabled={mutation.isLoading} // 로딩 중 버튼 비활성화
        >
          {mutation.isLoading ? '수정 중...' : '수정'}
        </button>
      </div>
    </div>
  );
};

export default AdminFaqEditDetail;
