import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/answer.css';
import NavigationBar from '../components/NavigationBar/NavigationBar';

export const Answer = () => {
    const navigate = useNavigate();
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "[공지] 화장실 임시 폐쇄 안내 (5.20 ~ 5.26)",
      date: "2024.05.10"
    },
    {
      id: 2,
      title: "[공지] 정전 점검 일정 안내 (6.10)",
      date: "2024.05.15"
    }
  ]);

  return (
    <div className="answer-container">
      <NavigationBar title="공지사항" />
      <div className="answer-list">
        {notices.map((notice) => (
          <div key={notice.id} className="answer-item" onClick={() => navigate(`/notice/${notice.id}`)}>
            <div className="answer-header">
              <span className="answer-titles">{notice.title}</span>
              <span className="answer-arrow">{">"}</span>
            </div>
            <p className="answer-date">{notice.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Answer;
