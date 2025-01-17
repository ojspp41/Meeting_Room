import React, { useState } from 'react';
import './css/Unlogin.css';

function Unlogin() {
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };
  return (
    <div className="unlogin-container">
      <img src="/assets/logo.svg" alt="Logo" className="logo" /> {/* 로고 이미지 */}
      <div className="subtitle">
        컴퓨터 정보공학부 <br /> 회의실
      </div>
      <input type="text" placeholder="학번" className="input-field" />
      <input type="password" placeholder="비밀번호" className="input-field" />
      <button className="login-button">로그인</button>

      {/* 회원가입, 비밀번호 찾기 링크 */}
      <div className="auth-links">
        <a href="/fee" className="auth-link">회원가입</a> | 
        <a href="/find" className="auth-link">비밀번호 찾기</a>
      </div>
       {/* 문의하기 아이콘 및 말풍선 */}
       <div className="inquiry-icon-container" onClick={toggleTooltip}>
        <img src="/assets/inquiry.svg" alt="문의하기" className="inquiry-icon" />
      </div>

      {showTooltip && (
        <div className="tooltip">
          <p>1. 가입한 적 없는데 존재한다고 떠요 <br />
             문의하기를 통해 [1/이름/학번] 이라고 보내주세요
          </p>
          <p>2. 비밀번호를 까먹었어요 <br />
             문의하기를 통해 [2/이름/학번] 이라고 보내주세요
          </p>
        </div>
      )}
      {/* 문의하기 영역 */}
      <div className="inquiry-container">
        
        <a href="/inquiry" className="inquiry-link">문의하기</a>
      </div>
    </div>
  );
}

export default Unlogin;
