import React, { useState, useMemo } from 'react';
import './css/admin.css';
import AdminNav from '../components/NavigationBar/AdminNav';
import { useNavigate } from 'react-router-dom';
import { useFaqStore } from '../../store';
import axiosCookie from '../../axiosCookie';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const AdminFaqEdit = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const queryClient = useQueryClient(); // React Query 캐시 관리

  // ✅ FAQ 목록 불러오기 (useQuery)
  const { data: faqData, isError, error, isLoading } = useQuery({
    queryKey: ['faqs'],
    queryFn: async () => {
      const response = await axiosCookie.get('/api/faq/getAll');
      return response.data.data; // FAQ 데이터 반환
    },
  });

  // ✅ FAQ 삭제 (useMutation)
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosCookie.delete(`/api/admin/faq/delete/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['faqs']); // FAQ 목록 새로고침
    },
    onError: (error) => {
      console.error('Error deleting FAQ:', error.response?.data || error.message);
      alert('FAQ 삭제 중 오류가 발생했습니다.');
    },
  });

  // ✅ FAQ 삭제 핸들러
  const handleDelete = (id) => {
    if (window.confirm('FAQ를 삭제하시겠습니까?')) {
      deleteMutation.mutate(id);
    }
  };

  // ✅ 수정 페이지로 이동
  const handleEdit = (item) => {
    useFaqStore.getState().setId(item.id);
    useFaqStore.getState().setQuestion(item.question);
    useFaqStore.getState().setAnswer(item.answer);
    navigate(`/admin/faq/editdetail/${item.id}`);
  };

  // ✅ 검색 필터링 (useMemo 사용하여 최적화)
  const filteredData = useMemo(() => {
    if (!faqData) return [];
    return faqData.filter((item) => item.question.includes(searchTerm));
  }, [faqData, searchTerm]);

  // ✅ 페이지네이션 처리
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const displayedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="admin-container">
      <AdminNav title="FAQ 관리" />

      {isLoading && <div className="loading-message">로딩 중...</div>}
      {isError && <div className="error-message">FAQ 데이터를 불러오는 중 오류 발생: {error.message}</div>}

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
              제목: {item.question.length > 12 ? item.question.slice(0, 12) + '...' : item.question}
            </div>
            <div className="list-buttons">
              <button className="edit-button" onClick={() => handleEdit(item)}>수정</button>
              <button className="delete-button" onClick={() => handleDelete(item.id)} disabled={deleteMutation.isLoading}>
                {deleteMutation.isLoading ? '삭제 중...' : '삭제'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>이전</button>
        <span>{currentPage} / {totalPages}</span>
        <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(currentPage + 1)}>다음</button>
      </div>
    </div>
  );
};

export default AdminFaqEdit;
