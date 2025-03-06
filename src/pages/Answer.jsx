import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query'; // ✅ React Query 추가
import axiosCookie from '../../axiosCookie';
import './css/answer.css';
import NavigationBar from '../components/NavigationBar/NavigationBar';

const fetchNotices = async () => {
  const response = await axiosCookie.get('/api/notice');
  if (response.data?.data?.noticeList) {
    const formattedNotices = response.data.data.noticeList.map((notice) => ({
      ...notice,
      date: formatDate(notice.createdAt),
    }));

    // 🟢 날짜 기준 최신순 정렬 (내림차순)
    formattedNotices.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // localStorage에 noticeIds 저장
    localStorage.setItem('noticeIds', JSON.stringify(formattedNotices.map(n => n.id)));

    return formattedNotices;
  }
  throw new Error('Invalid notice data');
};



const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toISOString().split('T')[0].replace(/-/g, '.');
};

export const Answer = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // ✅ React Query 사용
  const { data: notices = [], isLoading, isError } = useQuery({
    queryKey: ['notices'],
    queryFn: fetchNotices,
    staleTime: 1000 * 60 * 5, // 5분 동안 캐싱된 데이터 유지
    cacheTime: 1000 * 60 * 10, // 10분 동안 캐시 보관 (사용 안 하면 삭제됨)
    refetchOnWindowFocus: false, // 창 포커스를 맞출 때 다시 불러오지 않도록 설정
  });

  // 페이지네이션을 위한 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNotices = notices.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(notices.length / itemsPerPage);

  if (isLoading) return <p>📡 공지사항을 불러오는 중...</p>;
  if (isError) return <p>⚠️ 공지사항을 불러오는데 실패했습니다.</p>;

  return (
    <div>
      <NavigationBar title="공지사항" />
      <div className="answer-container">
        <motion.div 
          className="answer-list"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}  
          transition={{ duration: 1 }}
        >
          {currentNotices.map((notice, index) => (
            <motion.div 
              key={notice.id} 
              className="answer-item"
              onClick={() => navigate(`/notice/${notice.id}`)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="answer-header">
                <span className="answer-question">
                  {notice.title}
                </span>
                <img src="/assets/gt.svg"  className="answer-arrow" alt="" />
              </div>
              <p className="answer-content">{notice.date}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* 페이지네이션 버튼 */}
        <div className="pagination-container">
          {Array.from({ length: totalPages }, (_, index) => (
            <button 
              key={index + 1} 
              className={`pagination-button ${currentPage === index + 1 ? "active" : ""}`} 
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Answer;
