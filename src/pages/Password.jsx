import React, { useState } from 'react';
import { useFeeStore } from '../../store';
import './css/FeeCertification.css';
import { useNavigate } from 'react-router-dom';
function Password() {
  const navigate = useNavigate();
  const { name, studentId, password, setPassword } = useFeeStore();
  const [confirmPassword, setConfirmPassword] = useState('');
  const isMatch = password && confirmPassword && password === confirmPassword;

  const handleSubmit = async () => {
    if (!isMatch) return;

    const payload = {
      name: name,
      userStudnetId: studentId,
      userPassword: password,
    };
    
    console.log(payload);
    try {
      const response = await fetch('https://csiereserve.store/api/signup', {
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
      alert(`회원가입 완료: ${result.message}`);
      navigate('/'); // ✅ 회원가입 완료 후 메인 페이지로 이동
    } catch (error) {
      alert(`회원가입 실패: ${error.message}`);
    }
  };

  return (
    <div className="fee-certification-container">
      <img src="/assets/logo.svg" alt="학생회비 로고" className="fee-logo" />
      <div className="fee-text">
        <h2>비밀번호 설정</h2>
      </div>
       
      <div className="fee-form">
        <div className="input-group">
          <label htmlFor="password">비밀번호</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <div className="input-group">
          <label htmlFor="confirmPassword">재입력</label>
          <input 
            type="password" 
            id="confirmPassword" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />
        </div>
        <p className="form-info">* 비밀번호를 한 번 더 입력하세요.</p>
      </div>

      <div className="button-container">
        <button 
          className="next-button" 
          style={{ backgroundColor: isMatch ? 'black' : '#d3d3d3', cursor: isMatch ? 'pointer' : 'not-allowed' }}
          disabled={!isMatch}
          onClick={handleSubmit}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default Password;
