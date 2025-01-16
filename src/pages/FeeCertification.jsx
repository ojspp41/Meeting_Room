import React from 'react';
import './css/FeeCertification.css';

function FeeCertification() {
  return (
    <div className="fee-certification-container">
      <img src="/assets/logo.svg" alt="학생회비 로고" className="fee-logo" />
      <div className="fee-text">
        <h2>학생회비 납부 인증</h2>
        <p>다음부터는 회의실 예약이 불가능합니다.</p>
      </div>
       {/* 이름 & 학번 입력 폼 */}
       <div className="fee-form">
        <div className="input-group">
          <label htmlFor="name">이름</label>
          <input type="text" id="name" />
        </div>
        <div className="input-group">
          <label htmlFor="studentId">학번</label>
          <input type="text" id="studentId" />
        </div>
        <p className="form-info">* 학번은 아이디로 쓰일 예정입니다.</p>
      </div>
    </div>
  );
}

export default FeeCertification;
