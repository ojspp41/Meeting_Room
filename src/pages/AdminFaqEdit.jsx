import React, { useState, useEffect, useMemo } from 'react';
import './css/admin.css';
import AdminNav from '../components/NavigationBar/AdminNav';
import { useNavigate } from 'react-router-dom';
import { useFaqStore } from '../../store';
import axiosCookie from '../../axiosCookie';
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

  const fetchFaqs = async () => {
    try {
      const response = await axiosCookie.get('/api/faq/getAll');
      console.log(response)
      if (response.data) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching FAQ data:', error.response?.data || error.message);
      setError('FAQ 데이터를 불러오는 중 오류가 발생했습니다.');
    }
  };

    
  

  // FAQ 삭제
  const handleDelete = async (id) => {
    try {
      const response = await axiosCookie.delete(`/api/admin/faq/delete/${id}`);
  
      if (response.status === 200) {
        setData(prevData => prevData.filter(item => item.id !== id));
        setCurrentPage(prev => Math.max(1, Math.ceil((data.length - 1) / itemsPerPage))); // 페이지 유지
      }
    } catch (error) {
      console.error('Error deleting FAQ:', error.response?.data || error.message);
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
