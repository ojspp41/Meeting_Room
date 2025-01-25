import React, { useEffect, useState } from 'react';
import './css/faq.css';

export const Faq = () => {
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: "배송 기간은 얼마나 걸리나요?",
      answer: "평균적으로 2~3일 정도 소요됩니다.",
      createAt: "2025-01-01T12:00:00"
    },
    {
      id: 2,
      question: "환불 정책은 어떻게 되나요?",
      answer: "제품 수령 후 7일 이내에 환불 요청이 가능합니다.",
      createAt: "2025-01-02T14:30:00"
    }
  ]);

  // useEffect(() => {
  //   const fetchFaqs = async () => {
  //     try {
  //       const response = await fetch('/api/faq/getAll');
  //       const result = await response.json();
  //       if (result.message === "FAQ 조회 성공") {
  //         setFaqs(result.data);
  //       }
  //     } catch (error) {
  //       console.error("FAQ 데이터를 가져오는 중 오류 발생: ", error);
  //     }
  //   };
  //
  //   fetchFaqs();
  // }, []);

  return (
    <div className="faq-container">
      <h2 className="faq-title">자주 묻는 질문</h2>
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
