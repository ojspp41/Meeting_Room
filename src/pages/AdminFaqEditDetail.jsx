import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/admin.css';
import { useFaqStore } from '../../store';
import AdminNav from '../components/NavigationBar/AdminNav';

export const AdminFaqEditDetail = () => {
  const { id, question, answer, setQuestion, setAnswer } = useFaqStore();
  const navigate = useNavigate();
  console.log(question,answer);
  // Zustand에서 가져온 데이터를 기본값으로 설정
  const [updatedQuestion, setUpdatedQuestion] = useState(question);
  const [updatedAnswer, setUpdatedAnswer] = useState(answer);
  
  const handleUpdate = async () => {
    const response = await fetch(`/api/admin/faq/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: updatedQuestion, answer: updatedAnswer }),
    });

    if (response.ok) {
      alert('FAQ가 수정되었습니다.');
      navigate('/admin/faq/edit'); // 수정 후 목록 페이지로 이동
    } else {
      alert('FAQ 수정에 실패했습니다.');
    }
  };

  useEffect(() => {
    if (!id || !question) {
      alert("잘못된 접근입니다.");
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
        <button className="adminwrite-submit-button" onClick={handleUpdate}>
          수정 
        </button>
      </div>
    </div>
  );
};

export default AdminFaqEditDetail;
