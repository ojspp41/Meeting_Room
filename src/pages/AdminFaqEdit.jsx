import React, { useState, useEffect, useMemo } from 'react';
import './css/admin.css';
import AdminNav from '../components/NavigationBar/AdminNav';
import { useNavigate } from 'react-router-dom';
import { useFaqStore } from '../../store';

export const AdminFaqEdit = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const itemsPerPage = 7;

  useEffect(() => {
    fetchFaqs();
  }, []);

  // FAQ 목록 불러오기
//   const fetchFaqs = () => {
//     fetch('/api/faq/getAll')
//       .then(response => response.json())
//       .then(result => {
//         if (result.data) {
//           setData(result.data);
//         }
//       })
//       .catch(error => {
//         console.error('Error fetching FAQ data:', error);
//         setError('FAQ 데이터를 불러오는 중 오류가 발생했습니다.');
//       });
//   };

    const fetchFaqs = () => {
        // 목데이터(Mock Data)
        const mockData = [
        { id: 1, question: "서비스 이용 방법은?", answer: "서비스 이용 방법은 홈페이지에서 확인 가능합니다." },
        { id: 2, question: "비밀번호 변경은 어떻게 하나요?", answer: "마이페이지에서 비밀번호 변경이 가능합니다." },
        { id: 3, question: "회원 탈퇴는 어떻게 하나요?", answer: "회원 탈퇴는 고객센터를 통해 신청할 수 있습니다." },
        { id: 4, question: "환불 규정은 어떻게 되나요?", answer: "환불 규정은 이용약관에서 확인할 수 있습니다." },
        { id: 5, question: "결제 수단은 무엇이 있나요?", answer: "신용카드, 계좌이체, 카카오페이 등이 지원됩니다." },
        ];
    
        // 상태 업데이트
        setData(mockData);
    };
  

  // FAQ 삭제
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/admin/faq/delete/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setData(prevData => prevData.filter(item => item.id !== id));
        setCurrentPage(prev => Math.max(1, Math.ceil((data.length - 1) / itemsPerPage))); // 페이지 유지
      }
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      setError('FAQ 삭제 중 오류가 발생했습니다.');
    }
  };

  // 수정 모달 열기
  const handleEdit = (item) => {
    useFaqStore.getState().setId(item.id);
    useFaqStore.getState().setQuestion(item.question);
    useFaqStore.getState().setAnswer(item.answer);
    
    navigate(`/admin/faq/editdetail/${item.id}`);
  };
 

  // 검색 필터링 (useMemo 사용하여 성능 최적화)
  const filteredData = useMemo(() => {
    return data.filter((item) => item.question.includes(searchTerm));
  }, [data, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const displayedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="admin-container">
      <AdminNav title="FAQ 관리" />
      {error && <div className="error-message">{error}</div>}
      <input
        type="text"
        placeholder="질문 검색"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="list-container">
        {displayedData.map((item) => (
          <div key={item.id} className="list-item">
            <div className="list-text">
            <div>
                제목: {item.question.length > 12 ? item.question.slice(0, 12) + "..." : item.question}
            </div>
            </div>
            <div className="list-buttons">
              <button className="edit-button" onClick={() => handleEdit(item)}>수정</button>
              <button className="delete-button" onClick={() => handleDelete(item.id)}>
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          이전
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          다음
        </button>
      </div>
      
    </div>
  );
};

export default AdminFaqEdit;
