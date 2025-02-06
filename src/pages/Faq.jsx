import React, { useEffect, useState } from 'react';
import './css/faq.css';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import instance from '../axiosConfig';
export const Faq = () => {
  const [faqs, setFaqs] = useState([]);

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

  return (
    <div className="faq-container">
      <NavigationBar title="FAQ"/>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={faq.id} className="faq-item">
            <h3 className="faq-question">{index + 1}. {faq.question}</h3>
            <p className="faq-content">{faq.answer}</p>
          </div>
        ))}
      </div>
      <button className="faq-button fixed-button">직접 문의하기</button>
    </div>
  );
};

export default Faq;
