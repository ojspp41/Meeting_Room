import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './css/noticeDetail.css';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import axiosCookie from '../../axiosCookie'; // axiosCookie 설정 파일 불러옴

const NoticeDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // URL에서 id 가져오기
  const [notice, setNotice] = useState(null);
  const [nextNotices, setNextNotices] = useState([]);

  useEffect(() => {
    if (id) {
      fetchNotices(Number(id)); // 현재 공지사항 및 다음 2개 공지사항 가져오기
    }
  }, [id]);

  // ✅ 공지사항 데이터 가져오기 (현재 ID + 다음 ID 2개)
  const fetchNotices = async (noticeId) => {
    try {
      // 현재 공지사항 가져오기
      const currentResponse = await axiosCookie.get(`/api/notice/${noticeId}`);
      console.log('📌 현재 공지사항 응답:', currentResponse);

      if (currentResponse.data?.data) {
        setNotice({
          title: currentResponse.data.data.title,
          date: formatDate(currentResponse.data.data.createdAt),
          content: currentResponse.data.data.content,
        });
      }

      // ✅ 다음 공지사항 요청 (id+1, id+2)
      const nextNoticeRequests = [
        axiosCookie.get(`/api/notice/${noticeId + 1}`).catch(error => null), // 실패 시 null 반환
        axiosCookie.get(`/api/notice/${noticeId + 2}`).catch(error => null),
      ];

      const [nextResponse1, nextResponse2] = await Promise.all(nextNoticeRequests);
      console.log('📌 다음 공지사항 응답:', nextResponse1, nextResponse2);

      // ✅ 데이터가 존재하는 공지사항만 필터링하여 저장
      const nextNoticesData = [nextResponse1, nextResponse2]
        .filter(res => res && res.data?.data) // 데이터가 있는 응답만 필터링
        .map(res => ({
          id: res.data.data.id,
          title: res.data.data.title,
          date: formatDate(res.data.data.createdAt),
        }));

      setNextNotices(nextNoticesData);
    } catch (error) {
      console.error('❌ 공지사항 데이터를 불러오는 중 오류 발생:', error.response?.data || error.message);
    }
  };

  // ✅ 날짜 변환 함수 (YYYY.MM.DD 형식으로 변경)
  const formatDate = (isoString) => {
    if (!isoString) return ''; // 날짜 데이터가 없을 경우 빈 문자열 반환
    const date = new Date(isoString);
    return date.toISOString().split('T')[0].replace(/-/g, '.');
  };

  if (!notice) {
    return <div className="loading">공지사항을 불러오는 중...</div>;
  }

  return (
    <div className="notice-detail-container">
      <div className="notice-navbar">
        <NavigationBar title="공지사항 상세" />
      </div>
      <div className="notice-content">
        <h2 className="notice-title">{notice.title}</h2>
        <p className="notice-date">{notice.date}</p>
        <p className="notice-text">{notice.content}</p>
        <div className="notice-caller">29대 학생회</div>
      </div>
      <div className="gray-block"></div>

      {/* ✅ 다음 공지사항 리스트 */}
      <div className="next-notices-container">
        {nextNotices.length > 0 ? (
          nextNotices.map((item, index) => (
            <div key={index} className="next-notice" onClick={() => navigate(`/notice/${item.id}`)}>
              <span className="next-notice-title">{item.title}</span>
              <span className="next-notice-date">{item.date}</span>
            </div>
          ))
        ) : (
          <p className="no-next-notices">다음 공지사항이 없습니다.</p>
        )}
      </div>

      <div className="next-notice-button" onClick={() => navigate('/notice')}>목록</div>
    </div>
  );
};

export default NoticeDetail;
