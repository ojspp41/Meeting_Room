import React, { useEffect, useState } from 'react';
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

  return (
    <div className="faq-container">
      <NavigationBar title="FAQ"/>
      <div className="faq-list">
        {currentFaqs.map((faq, index) => (
          <div key={faq.id} className="faq-item">
            <h3 className="faq-question">{indexOfFirstItem + index + 1}. {faq.question}</h3>
            <p className="faq-content">{faq.answer}</p>
          </div>
        ))}
      </div>

      {/* 페이지네이션 버튼 */}
      <div className="pagination-container">
        <button 
          className="pagination-button" 
          onClick={() => setCurrentPage(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          이전
        </button>
        <span className="page-info">{currentPage} / {Math.ceil(faqs.length / itemsPerPage)}</span>
        <button 
          className="pagination-button" 
          onClick={() => setCurrentPage(currentPage + 1)} 
          disabled={indexOfLastItem >= faqs.length}
        >
          다음
        </button>
      </div>

      <div className="mb"></div>
      <button className="faq-button fixed-button" onClick={openKakaoChat}>직접 문의하기</button>
    </div>
  );
};

export default Faq;
