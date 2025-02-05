import React, { useEffect, useState } from 'react';
import './css/faq.css';
import NavigationBar from '../components/NavigationBar/NavigationBar';

export const Faq = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        console.log(response);
        const response = await fetch('https://csiereserve.store/api/admin/faq/getAll');
        if (!response.ok) {
          throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
        }
        
        const result = await response.json();
        console.log("API 응답 데이터:", result);
        
        if (result.message === "FAQ 조회 성공" && Array.isArray(result.data)) {
          setFaqs(result.data);
        }
      } catch (error) {
        console.error("FAQ 데이터를 가져오는 중 오류 발생: ", error);
      }
    };

    fetchFaqs();
  }, []);
  return (
    <div className="faq-container">
      <NavigationBar title="FAQ"/>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={faq.id} className="faq-item">
            <h3 className="faq-question">{index + 1}. {faq.question}</h3>
            <p className="faq-answer">{faq.answer}</p>
          </div>
        ))}
      </div>
      <button className="faq-button fixed-button">직접 문의하기</button>
    </div>
  );
};

export default Faq;
