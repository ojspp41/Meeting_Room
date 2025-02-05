import React, { useState } from 'react';
import './css/FeeCertification.css';
import { useNavigate } from 'react-router-dom';
import { useFeeStore } from '../../store';
function FeeCertification() {
  const { name, setName, studentId, setStudentId } = useFeeStore();
  const navigate = useNavigate();
  
  const handleSubmit = async () => {
    if (!name || !studentId) {
      alert('이름과 학번을 입력해주세요.');
      return;
    }
    
    const payload = {
      name,
      studentId,
    };
    console.log(name,studentId);
    try {
      const response = await fetch('https://csiereserve.store/api/admin/studentFeePayer/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        throw new Error('서버 오류 발생');
      }

      const result = await response.json();
      alert(`인증 완료: ${result.message}`);
      navigate('/password');
    } catch (error) {
      alert(`인증 실패: ${error.message}`);
    }
  };
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
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="studentId">학번</label>
          <input type="text" id="studentId" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
        </div>
        <p className="form-info">* 학번은 아이디로 쓰일 예정입니다.</p>
      </div>

      <div className="button-container">
        <button className="next-button" onClick={handleSubmit}>다음</button>
      </div>
    </div>
  );
}

export default FeeCertification;
