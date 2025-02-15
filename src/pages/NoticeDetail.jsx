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
  const [idArray, setIdArray] = useState([]);
  const [idMap, setIdMap] = useState(new Map());
  
  useEffect(() => {
    // ✅ `localStorage`에서 공지사항 ID 목록을 가져와서 `useState`에 저장
    const storedIds = JSON.parse(localStorage.getItem('noticeIds')) || [];
    setIdArray(storedIds);

    // ✅ Map으로 변환하여 빠른 검색 가능하도록 최적화
    const map = new Map(storedIds.map((id, index) => [id, index]));
    setIdMap(map);
  }, []);

  useEffect(() => {
    if (id && idArray.length > 0 && idMap.size > 0) {
      fetchNoticeById(Number(id));
    }
  }, [id, idArray, idMap]);

  // ✅ 현재 공지사항 가져오기 + 다음 공지사항 찾기
  const fetchNoticeById = async (noticeId) => {
    try {
      // ✅ 현재 공지사항 가져오기
      const currentResponse = await axiosCookie.get(`/api/notice/${noticeId}`);
      if (currentResponse.data?.data) {
        setNotice({
          title: currentResponse.data.data.title,
          date: formatDate(currentResponse.data.data.createdAt),
          content: currentResponse.data.data.content,
        });
      }

      // ✅ 다음 공지사항 찾기 (O(1) 조회)
      const currentIndex = idMap.get(noticeId);

      const nextNoticesData = [];
      if (idArray[currentIndex + 1]) {
        const nextResponse = await axiosCookie.get(`/api/notice/${idArray[currentIndex + 1]}`);
        nextNoticesData.push({
          id: nextResponse.data.data.id,
          title: nextResponse.data.data.title,
          date: formatDate(nextResponse.data.data.createdAt),
        });
      }

      if (idArray[currentIndex + 2]) {
        const nextResponse = await axiosCookie.get(`/api/notice/${idArray[currentIndex + 2]}`);
        nextNoticesData.push({
          id: nextResponse.data.data.id,
          title: nextResponse.data.data.title,
          date: formatDate(nextResponse.data.data.createdAt),
        });
      }

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
