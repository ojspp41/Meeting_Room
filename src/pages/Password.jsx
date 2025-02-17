import React, { useState } from 'react';
import { useFeeStore } from '../../store';
import './css/FeeCertification.css';
import { useNavigate } from 'react-router-dom';

// framer-motion에서 motion을 import
import { motion } from 'framer-motion';

function Password() {
  const navigate = useNavigate();
  const { name, studentId, password, setPassword } = useFeeStore();
  const [confirmPassword, setConfirmPassword] = useState('');

  // 비밀번호 검증 (소문자 + 숫자 포함, 5~10자리)
  const isValidPassword = 
    password.length >= 5 && 
    password.length <= 10 && 
    /[a-z]/.test(password) && 
    /\d/.test(password);

  // 비밀번호 확인
  const isMatch = isValidPassword && password === confirmPassword;

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
      navigate('/'); // 회원가입 완료 후 메인 페이지로 이동
    } catch (error) {
      alert(`회원가입 실패: ${error.message}`);
    }
  };

  return (
    // motion.div를 사용하여 애니메이션을 적용
    <motion.div
      className="fee-certification-container"
      initial={{ opacity: 0, y: 20 }}  // 초기 상태 (안 보임, 아래에서 시작)
      animate={{ opacity: 1, y: 0 }}  // 애니메이션 상태 (보이고 원래 위치로 이동)
      transition={{ duration: 0.6 }}   // 애니메이션의 지속 시간 설정
    >
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
        <p className="form-info">* 비밀번호 소문자 + 숫자 포함 5~10자리 </p>
      </div>

      <div className="button-container">
        <button
          className="next-button"
          style={{
            backgroundColor: isMatch && isValidPassword ? 'black' : '#d3d3d3',
            cursor: isMatch ? 'pointer' : 'not-allowed'
          }}
          disabled={!isMatch || !isValidPassword}
          onClick={handleSubmit}
        >
          다음
        </button>
      </div>
    </motion.div>
  );
}

export default Password;
