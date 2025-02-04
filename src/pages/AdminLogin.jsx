import React, { useState } from 'react';
import './css/Unlogin.css';

function AdminLogin() {
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
        컴퓨터 정보공학부 <br /> 관리자 로그인
      </div>
      <input 
        type="text" 
        placeholder="아이디" 
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

      
      
      

      
    </div>
  );
}

export default AdminLogin;
