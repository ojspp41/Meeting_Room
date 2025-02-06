import React, { useState, useEffect, useMemo } from 'react';
import './css/admin.css';
import AdminNav from '../components/NavigationBar/AdminNav';
import { useNavigate } from 'react-router-dom';
import { useNoticeStore } from '../../store';
import axiosCookie from '../../axiosCookie';

export const AdminNoticeEdit = () => {
  const navigate = useNavigate();
  const { setId, setTitle, setContent } = useNoticeStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]); // 공지사항 목록 데이터
  const [error, setError] = useState(null);
  const itemsPerPage = 7;

  useEffect(() => {
    fetchNotices();
  }, []);

  // ✅ 공지사항 목록 불러오기 (axiosCookie 사용)
  const fetchNotices = async () => {
    try {
      const response = await axiosCookie.get('/api/notice'); // 공지사항 목록 조회
      console.log(response);
      
      if (response.data?.data?.noticeList) {
        setData(response.data.data.noticeList);
      } else {
        setError('공지사항 데이터를 불러오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('Error fetching notices:', error.response?.data || error.message);
      setError('공지사항 데이터를 불러오는 중 오류가 발생했습니다.');
    }
  };

  // ✅ 공지사항 삭제 (axiosCookie 사용)
  const handleDelete = async (id) => {
    try {
      await axiosCookie.delete(`/api/notice/${id}`);

      setData(prevData => prevData.filter(item => item.id !== id));
      setCurrentPage(prev => Math.max(1, Math.ceil((data.length - 1) / itemsPerPage))); // 페이지 유지
    } catch (error) {
      console.error('Error deleting notice:', error.response?.data || error.message);
      setError('공지사항 삭제 중 오류가 발생했습니다.');
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
    return data.filter((item) => item.title.includes(searchTerm));
  }, [data, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const displayedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="admin-container">
      <AdminNav title="공지사항 관리" />
      {error && <div className="error-message">{error}</div>}
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
              <div>
                제목: {item.title.length > 12 ? item.title.slice(0, 12) + "..." : item.title}
              </div>
            </div>
            <div className="list-buttons">
              <button className="edit-button" onClick={() => handleEdit(item)}>수정</button>
              <button className="delete-button" onClick={() => handleDelete(item.id)}>삭제</button>
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

export default AdminNoticeEdit;
