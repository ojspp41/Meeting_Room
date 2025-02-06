import React, { useState } from 'react';
import './css/Unlogin.css';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
function Unlogin() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();

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

    try {
      const response = await axios.post('https://csiereserve.store/api/login123', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // 자동으로 쿠키 포함
        
      });
      
      alert(`로그인 성공: ${response.data.message}`);
      navigate('/mainpage');
    } catch (error) {
      alert(`로그인 실패: ${error.response?.data?.message || error.message}`);
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
