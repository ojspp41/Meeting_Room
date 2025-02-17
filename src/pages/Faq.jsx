import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // Framer Motion 추가
import './css/faq.css';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import instance from '../axiosConfig';

export const Faq = () => {
  const [faqs, setFaqs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // 한 페이지에 표시할 항목 수

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await instance.get('/faq/getAll');

        if (response.status === 200) {
          console.log("API 응답 데이터:", response.data);
          
          if (Array.isArray(response.data.data)) {
            setFaqs(response.data.data);
          }
        }
      } catch (error) {
        console.error("FAQ 데이터를 가져오는 중 오류 발생: ", error);
      }
    };

    fetchFaqs();
  }, []);

  const openKakaoChat = () => {
    window.location.href = "https://open.kakao.com/o/sQDWgggh"; // 🔹 여기에 오픈카톡 링크 넣기!
  };

  // 현재 페이지에 표시할 FAQ 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFaqs = faqs.slice(indexOfFirstItem, indexOfLastItem);

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(faqs.length / itemsPerPage);

  return (
    <div className="faq-container">
      <NavigationBar title="FAQ"/>
      
      {/* FAQ 리스트 */}
      <motion.div 
        className="faq-list"
        initial={{ opacity: 0, y: 10 }} // 처음에 약간 아래에서 시작
        animate={{ opacity: 1, y: 0 }} // 나타날 때 자연스럽게 올라오면서 페이드 인
        transition={{ duration: 0.5 }}
      >
        {currentFaqs.map((faq, index) => (
          <motion.div 
            key={faq.id} 
            className="faq-item"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }} // 각 항목이 순차적으로 나타남
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
            whileHover={{ scale: 1.1 }} // 버튼에 마우스 올리면 약간 커짐
            whileTap={{ scale: 0.9 }} // 버튼 클릭 시 살짝 작아짐
          >
            {index + 1}
          </motion.button>
        ))}
      </motion.div>

      <motion.button 
        className="faq-button" 
        onClick={openKakaoChat}
        whileHover={{ scale: 1.05 }} // 버튼에 마우스 올리면 커짐
        whileTap={{ scale: 0.95 }} // 버튼 클릭 시 작아짐
      >
        직접 문의하기
      </motion.button>
    </div>
  );
};

export default Faq;
