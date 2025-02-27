import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './css/faq.css';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import instance from '../axiosConfig';
import { useQuery } from '@tanstack/react-query'; // ✅ react-query 추가

export const Faq = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // 한 페이지에 표시할 항목 수

  // ✅ React Query를 사용하여 FAQ 데이터 가져오기
  const { data, isLoading, isError } = useQuery({
    queryKey: ['faqs'], // 캐싱을 위한 key
    queryFn: async () => {
      const response = await instance.get('/faq/getAll');
      return response.data.data; // API 응답에서 필요한 데이터만 반환
    },
    staleTime: 120000, // 1분 동안 데이터 유지
  });

  const openKakaoChat = () => {
    window.location.href = "https://open.kakao.com/o/sQDWgggh"; // 🔹 여기에 오픈카톡 링크 넣기!
  };

  // 로딩 상태 처리
  if (isLoading) {
    return <div className="loading">데이터를 불러오는 중...</div>;
  }

  // 오류 발생 시 처리
  if (isError) {
    return <div className="error">FAQ 데이터를 가져오는 중 오류가 발생했습니다.</div>;
  }

  // 현재 페이지에 표시할 FAQ 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFaqs = data.slice(indexOfFirstItem, indexOfLastItem);

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div>
      <NavigationBar title="FAQ"/>
      <div className="faq-container">
      
      {/* FAQ 리스트 */}
      <motion.div 
        className="faq-list"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {currentFaqs.map((faq, index) => (
          <motion.div 
            key={faq.id} 
            className="faq-item"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <h3 className="faq-question">{indexOfFirstItem + index + 1}. {faq.question}</h3>
            <p className="faq-content">{faq.answer}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* 페이지네이션 버튼 */}
      <motion.div 
        className="pagination-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {Array.from({ length: totalPages }, (_, index) => (
          <motion.button 
            key={index + 1} 
            className={`pagination-button ${currentPage === index + 1 ? "active" : ""}`} 
            onClick={() => setCurrentPage(index + 1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {index + 1}
          </motion.button>
        ))}
      </motion.div>

      <motion.button 
        className="faq-button" 
        onClick={openKakaoChat}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        직접 문의하기
      </motion.button>

      </div>
    </div>
  );
};

export default Faq;
