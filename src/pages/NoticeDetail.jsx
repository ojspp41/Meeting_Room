import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/noticeDetail.css';
import NavigationBar from '../components/NavigationBar/NavigationBar';

const NoticeDetail = () => {
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);

  const [nextNotices, setNextNotices] = useState([]);
  useEffect(() => {
    // 목데이터 설정
    const mockData = {
      title: "회의실 임시 폐쇄 안내 (5.20 ~ 5.26)",
      date: "2024-05-10",
      content: "축제 준비 기간 중, 주점 준비와 청소 작업으로 인하여 아래와 같이 회의실 대여 서비스를 일시 중지 하오니 많은 양해 바랍니다.",
      details: {
        period: "2024.05.20(월) ~ 2024.05.26(일)",
        work: "주점 물품 준비, 재료 보관, 청소 작업"
      }
    };
    const mockNextNotices = [
      { id: 2, title: "동아리 박람회 일정 안내", date: "2024-05-15" },
      { id: 3, title: "학교 정전 공지 (5.28)", date: "2024-05-12" }
    ];

    setNotice(mockData);
    setNextNotices(mockNextNotices);
  }, []);

  if (!notice) {
    return <div className="loading">공지사항을 불러오는 중...</div>;
  }

  return (
    
    <div className="notice-detail-container">
      <div className="notice-navbar"><NavigationBar title="공지사항 상세" /></div>
      <div className="notice-content">
        <h2 className="notice-title">{notice.title}</h2>
        <p className="notice-date">{notice.date}</p>
        <p className="notice-text">{notice.content}</p>
        <div className="notice-details">
          <p><strong>1.일시:</strong> {notice.details.period}</p>
          <p><strong>2.작업내용:</strong> {notice.details.work}</p>
        </div>
        <div className="notice-caller">29대 학생회</div>
      </div>
      <div className="gray-block"></div>
      <div className="next-notices-container">
        {nextNotices.map((item, index) => (
          <div key={index} className="next-notice" onClick={() => navigate(`/notice/${item.id}`)}>
            
            <span className="next-notice-title">[공지] {item.title}</span>
            <span className="next-notice-date">{item.date}</span>
          </div>
        ))}
      </div>
      <div className="next-notice-button" onClick={() => navigate('/notice')}>목록</div>
    </div>

  );
};

export default NoticeDetail;
