import React from 'react';
import './css/FeeCertification.css';

function Password() {
  return (
    <div className="fee-certification-container">
      <img src="/assets/logo.svg" alt="학생회비 로고" className="fee-logo" />
      <div className="fee-text">
        <h2>비밀번호 설정 </h2>
        
      </div>
       {/* 이름 & 학번 입력 폼 */}
       <div className="fee-form">
        <div className="input-group">
          <label htmlFor="name">비밀번호</label>
          <input type="text" id="name" />
        </div>
        <div className="input-group">
          <label htmlFor="studentId">재입력</label>
          <input type="text" id="studentId" />
        </div>
        <p className="form-info">* 비밀번호를 한번더 입력하세요.</p>
      </div>

      <div className="button-container">
        <button className="next-button">다음</button>
      </div>
    </div>
  );
}

export default Password;
