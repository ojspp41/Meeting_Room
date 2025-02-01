import React, { useState } from 'react';
import './css/Unlogin.css';

function Unlogin() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };

  const handleLogin = async () => {
    if (!studentId || !password) {
      alert('학번과 비밀번호를 입력해주세요.');
      return;
    }

    const payload = {
      studentId,
      password,
    };
    console.log(studentId,password);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        throw new Error('로그인 실패');
      }

      const result = await response.json();
      alert(`로그인 성공: ${result.message}`);
    } catch (error) {
      alert(`로그인 실패: ${error.message}`);
    }
  };

  return (
    <div className="unlogin-container">
      <img src="/assets/logo.svg" alt="Logo" className="logo" />
      <div className="subtitle">
        컴퓨터 정보공학부 <br /> 회의실
      </div>
      <input 
        type="text" 
        placeholder="학번" 
        className="input-field" 
        value={studentId} 
        onChange={(e) => setStudentId(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="비밀번호" 
        className="input-field" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button className="login-button" onClick={handleLogin}>로그인</button>

      <div className="auth-links">
        <a href="/fee" className="auth-link">회원가입</a> | 
        <a href="/find" className="auth-link">비밀번호 찾기</a>
      </div>
      
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
      
      <div className="inquiry-container">
        <a href="/inquiry" className="inquiry-link">문의하기</a>
      </div>
    </div>
  );
}

export default Unlogin;
