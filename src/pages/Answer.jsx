import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/answer.css';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import axiosCookie from '../../axiosCookie'; // axiosCookie 설정 파일을 불러옴

export const Answer = () => {
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);
  
  useEffect(() => {
    fetchNotices();
  }, []);

  // ✅ 공지사항 목록 불러오기 (axiosCookie 사용)
  const fetchNotices = async () => {
    try {
      const response = await axiosCookie.get('/api/notice'); // 공지사항 목록 조회
       
      if (response.data?.data?.noticeList) {
        // 날짜 변환: "2025-02-06T23:00:05.854409" → "2025.02.06"
        const formattedNotices = response.data.data.noticeList.map((notice) => ({
          ...notice,
          date: formatDate(notice.createdAt),
        }));

        setNotices(formattedNotices);

        const idArray = formattedNotices.map(notice => notice.id);
        console.log(idArray);
        localStorage.setItem('noticeIds', JSON.stringify(idArray));
      } else {
        console.error('❌ 공지사항 데이터가 올바르지 않습니다:', response.data);
      }
    } catch (error) {
      console.error('❌ 공지사항 데이터를 불러오는 중 오류 발생:', error.response?.data || error.message);
    }
  };
  // ✅ 날짜 변환 함수
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toISOString().split('T')[0].replace(/-/g, '.'); // YYYY.MM.DD 형식 변환
  };

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
