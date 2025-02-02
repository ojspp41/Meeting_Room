import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './css/noticeDetail.css';
import NavigationBar from '../components/NavigationBar/NavigationBar';

const NoticeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    const fetchNoticeDetail = async () => {
      try {
        const response = await fetch(`/api/notices/${id}`);
        const data = await response.json();

        if (response.ok) {
          setNotice(data);
        } else {
          console.error("공지사항을 불러오지 못했습니다.");
        }
      } catch (error) {
        console.error("API 요청 중 오류 발생:", error);
      }
    };

    fetchNoticeDetail();
  }, [id]);

  if (!notice) {
    return <div className="loading">공지사항을 불러오는 중...</div>;
  }

  return (
    <div className="notice-detail-container">
      <NavigationBar title="공지사항 상세" />
      <div className="notice-content">
        <h2 className="notice-title">{notice.title}</h2>
        <p className="notice-date">{notice.date}</p>
        <p className="notice-text">{notice.content}</p>
      </div>
      <button className="back-button" onClick={() => navigate(-1)}>뒤로 가기</button>
    </div>
  );
};

export default NoticeDetail;
