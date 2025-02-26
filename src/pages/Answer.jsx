import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // ✅ framer-motion 추가
import './css/answer.css'; // FAQ와 동일한 CSS 적용
import NavigationBar from '../components/NavigationBar/NavigationBar';
import axiosCookie from '../../axiosCookie';

export const Answer = () => {
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // 한 페이지당 4개 표시

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await axiosCookie.get('/api/notice');

      if (response.data?.data?.noticeList) {
        const formattedNotices = response.data.data.noticeList.map((notice) => ({
          ...notice,
          date: formatDate(notice.createdAt),
        }));

        setNotices(formattedNotices);
        localStorage.setItem('noticeIds', JSON.stringify(formattedNotices.map(n => n.id)));
      } else {
        console.error('❌ 공지사항 데이터가 올바르지 않습니다:', response.data);
      }
    } catch (error) {
      console.error('❌ 공지사항 데이터를 불러오는 중 오류 발생:', error.response?.data || error.message);
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toISOString().split('T')[0].replace(/-/g, '.');
  };

  // 페이지네이션을 위한 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNotices = notices.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(notices.length / itemsPerPage);

  return (
    <div> 
      <NavigationBar title="공지사항" />
      <div  className="answer-container">
      <motion.div 
        className="answer-list"
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}  
        transition={{ duration: 1 }}
      >
        {currentNotices.map((notice, index) => (
          <motion.div 
            key={notice.id} 
            className="answer-item" // FAQ 스타일 적용
            onClick={() => navigate(`/notice/${notice.id}`)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className="answer-header">
              <span className="answer-question">
                {notice.title.length > 27 
                  ? `${notice.title.slice(0, 27)}...` 
                  : notice.title}
              </span>
              <span className="answer-arrow">{">"}</span>
            </div>
            <p className="answer-content">{notice.date}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* 페이지네이션 버튼 추가 */}
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
