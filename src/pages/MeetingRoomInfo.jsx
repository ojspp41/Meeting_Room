import React from "react";
import "../pages/css/MeetingRoomInfo.css";
import NavigationBar from '../components/NavigationBar/NavigationBar';

const facilities = [
  { name: "중앙도서관 4층 그룹 연구실", url: "https://library.catholic.ac.kr/studyroom/groupReserveStat?gId=2" },
  { name: "소피아바라관 1층 세미나실", url: "https://aicodi.catholic.ac.kr/ptfol/studyRoom/meeting/view.do?dataSeq=1000014&mngtProc=Y" },
  { name: "소피아바라관 2층 스타트업라운지", url: "https://aicodi.catholic.ac.kr/ptfol/studyRoom/meeting/view.do?dataSeq=1000020&mngtProc=Y" }
];

const MeetingRoomInfo = () => {
  return (
    <div className="container">
      <NavigationBar title="교내 타회의실 예약" />
      {facilities.map((facility, index) => (
        <div className='item-container' key={index}>
          <div className='text-container'>
            <div className="title">
              {facility.name}
              <button 
                className="go-button" 
                onClick={() => window.location.href = facility.url}
              >
                &gt;
              </button>
            </div>
            <p className="info-text">예약인원: 최소 4인 이상</p>
            <p className="info-text">예약 신청: 이용일 3일 전부터 예약 가능</p>
            <p className="info-text">이용 시간: 2시간 이내</p>
            <p className="info-text">운영시간:</p>
            <p className="info-text">이용시설: 빔프로젝터 및 전동스크린, 벽면 고정식 화이트보드</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MeetingRoomInfo;
