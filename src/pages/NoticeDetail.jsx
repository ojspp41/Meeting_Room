import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import './css/noticeDetail.css';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import axiosCookie from '../../axiosCookie';

const fetchNoticeById = async (id) => {
  const response = await axiosCookie.get(`/api/notice/${id}`);
  return response.data?.data;
};

const NoticeDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // URL에서 id 가져오기
  const [idArray, setIdArray] = useState([]);
  const [idMap, setIdMap] = useState(new Map());

  // ✅ `localStorage`에서 공지사항 ID 목록 가져오기
  useEffect(() => {
    const storedIds = JSON.parse(localStorage.getItem('noticeIds')) || [];
    setIdArray(storedIds);
    setIdMap(new Map(storedIds.map((id, index) => [id, index])));
  }, []);

  // ✅ React Query를 이용하여 현재 공지사항 데이터 가져오기
  const { data: notice, isLoading, isError } = useQuery({
    queryKey: ['notice', id],
    queryFn: () => fetchNoticeById(id),
    staleTime: 1000 * 60 * 5, // 5분 동안 캐싱 유지
    enabled: !!id, // id가 있을 때만 요청
  });

  // ✅ 다음 공지사항 가져오기
  const nextNotices = useQuery({
    queryKey: ['nextNotices', id],
    queryFn: async () => {
      const currentIndex = idMap.get(Number(id));
      if (currentIndex === undefined) return [];

      const nextNoticesData = [];
      for (let i = 1; i <= 2; i++) {
        const nextId = idArray[currentIndex + i];
        if (nextId) {
          const nextNotice = await fetchNoticeById(nextId);
          if (nextNotice) {
            nextNoticesData.push({
              id: nextNotice.id,
              title: nextNotice.title,
              date: formatDate(nextNotice.createdAt),
            });
          }
        }
      }
      return nextNoticesData;
    },
    enabled: idArray.length > 0 && idMap.size > 0, // 데이터가 있을 때만 실행
  });

  // ✅ 날짜 변환 함수 (YYYY.MM.DD 형식으로 변경)
  const formatDate = (isoString) => {
    if (!isoString) return '';
    return new Date(isoString).toISOString().split('T')[0].replace(/-/g, '.');
  };

  // ✅ 로딩 & 에러 처리
  if (isLoading) return <div className="loading">공지사항을 불러오는 중...</div>;
  if (isError) return <div className="error">❌ 데이터를 불러오는 데 실패했습니다.</div>;

  return (
    <div>
      <div className="notice-detail-container">
        <NavigationBar title="공지사항 상세" />

        <div className="notice-content">
          <h2 className="notice-title">{notice?.title}</h2>
          <p className="notice-dates">{formatDate(notice?.createdAt)}</p>
          <p className="notice-texts">{notice?.content}</p>
          <div className="notice-caller">29대 학생회</div>
        </div>
        <div className="gray-block"></div>

        {/* ✅ 다음 공지사항 리스트 */}
        <div className="next-notices-container">
          {nextNotices.data?.length > 0 ? (
            nextNotices.data.map((item, index) => (
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
    </div>
  );
};

export default NoticeDetail;
