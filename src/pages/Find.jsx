import React from 'react';
import './css/Find.css';

function Find() {
  return (
    <div className="fee-certification-container">
      <img src="/assets/logo.svg" alt="학생회비 로고" className="fee-logo" />
      <div className="fee-text">
        <h2>비밀번호 찾기 </h2>
        
      </div>
      <div className="find-form">
        <div className='find-content'>
            컴퓨터정보공학부 회의실 예약 시스템은 <br />
            개인정보 보호를 위해, 비밀번호 찾기를 할 경우<br />
            이전 비밀번호의 맨 앞자리와 끝자리만을 알려드리며<br />
            글자수와 상관없이 사이는 *로 처리되어 표시됩니다<br />
        </div>
        <div className='find-content'>
            여전히 비밀번호를 알 수 없는 경우, <br />
            문의하기를 통해 해결해드리겠습니다.
        </div>
        <div className="find-input-group">
          <label htmlFor="name">이름</label>
          <input type="text" id="name" />
        </div>
        <div className="find-input-group">
          <label htmlFor="studentId">비밀번호</label>
          <input type="text" id="studentId" />
        </div>
        

      </div>
      <div className="button-container">
            <button className="find-button">문의하기</button>
            <button className="find-button confirm">확인</button>
        </div>
    </div>
  );
}

export default Find;
