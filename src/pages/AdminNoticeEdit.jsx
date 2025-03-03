import React, { useState, useMemo } from 'react';
import './css/admin.css';
import AdminNav from '../components/NavigationBar/AdminNav';
import { useNavigate } from 'react-router-dom';
import { useNoticeStore } from '../../store';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosCookie from '../../axiosCookie';

export const AdminNoticeEdit = () => {
  const navigate = useNavigate();
  const { setId, setTitle, setContent } = useNoticeStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const queryClient = useQueryClient(); // React Query 캐시 관리

    // ✅ 공지사항 목록 불러오기 (최신순 정렬 추가)
    const { data: noticeData, isLoading, isError, error } = useQuery({
      queryKey: ['notices'],
      queryFn: async () => {
        const response = await axiosCookie.get('/api/notice');
        const notices = response.data?.data?.noticeList || [];

        // 🟢 최신 공지가 먼저 나오도록 내림차순 정렬
        return notices.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      },
      staleTime: 1000 * 60 * 15, // 15분 동안 데이터 캐싱
    });

  // ✅ 공지사항 삭제 (useMutation 사용)
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosCookie.delete(`/api/admin/notice/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['notices']); // 공지사항 목록 자동 새로고침
    },
    onError: (error) => {
      console.error('Error deleting notice:', error.response?.data || error.message);
      alert('공지사항 삭제 중 오류가 발생했습니다.');
    },
  });

  // ✅ 공지사항 삭제 핸들러
  const handleDelete = (id) => {
    if (window.confirm('공지사항을 삭제하시겠습니까?')) {
      deleteMutation.mutate(id);
    }
  };

  // ✅ 수정 버튼 클릭 → Zustand에 저장 후 수정 페이지로 이동
  const handleEdit = (item) => {
    setId(item.id);
    setTitle(item.title);
    setContent(item.content);
    navigate(`/admin/notice/editdetail/${item.id}`);
  };

  // ✅ 검색 기능 최적화 (useMemo 사용)
  const filteredData = useMemo(() => {
    if (!noticeData) return [];
    return noticeData.filter((item) => item.title.includes(searchTerm));
  }, [noticeData, searchTerm]);

  // ✅ 페이지네이션 처리
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const displayedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  // ✅ 날짜 포맷 변환 함수 추가
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toISOString().split('T')[0].replace(/-/g, '.'); // YYYY.MM.DD 형식
  };

  return (
    <div className="admin-container">
      <AdminNav title="공지사항 관리" />

      {isLoading && <div className="loading-message">로딩 중...</div>}
      {isError && <div className="error-message">공지사항 데이터를 불러오는 중 오류 발생: {error.message}</div>}

      <input
        type="text"
        placeholder="공지사항 제목 검색"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="list-container">
        {displayedData.map((item) => (
          <div key={item.id} className="list-item">
            <div className="list-text">
              <p className="notice-title">제목: {item.title.length > 12 ? item.title.slice(0, 12) + '...' : item.title}</p>
              <p className="notice-date">{formatDate(item.createdAt)}</p>
            </div>
            
            <div className="list-buttons">
              <button className="edit-button" onClick={() => handleEdit(item)}>수정</button>
              <button
                className="delete-button"
                onClick={() => handleDelete(item.id)}
                disabled={deleteMutation.isLoading} // 로딩 중 버튼 비활성화
              >
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

export default AdminNoticeEdit;
