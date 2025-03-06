import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie-player';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/Unlogin.css';
import { useAnimationStore } from '../../store';
// Lottie 파일 경로
import startAnimation from '../../public/assets/lottie/start.json';

function Unlogin() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [showPasswordTooltip, setShowPasswordTooltip] = useState(false); 
  const { showAnimation, setShowAnimation } = useAnimationStore(); // zustand 상태 사용
  const navigate = useNavigate();
  console.log(showAnimation);
  // 컴포넌트 마운트 시 애니메이션 상태 로드

  useEffect(() => {
    if (showAnimation) {
      const timer = setTimeout(() => {
        setShowAnimation(false); // 애니메이션 종료 후 상태 변경
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [showAnimation, setShowAnimation]);
  
   // 1. 로그인된 상태 확인: accessToken과 만료 시간을 체크하여 이미 로그인된 사용자 리디렉션
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const expiresAt = localStorage.getItem('expiresAt');
    const userRole = localStorage.getItem('userRole');
    const studentId = localStorage.getItem('studentId');
    const name = localStorage.getItem('name');

    const currentTime = Date.now();

    // accessToken이 있고, 만료 시간이 아직 지나지 않았으며, userRole, studentId, name이 모두 존재하면 리디렉션
    if (accessToken && expiresAt && userRole && studentId && name && currentTime < Number(expiresAt)) {
      // userRole에 따라 리디렉션
      if (userRole === 'ROLE_ADMIN') {
        navigate('/admin');
      } else if (userRole === 'ROLE_GENERAL') {
        navigate('/mainpage');
      }
    }
  }, [navigate]);

  useEffect(() => {
    const lastShown = localStorage.getItem('lastAnimationTime');
    const currentTime = Date.now();
  
    // 1시간(3600000ms) 지나면 다시 보여줌
    if (!lastShown || currentTime - lastShown > 3600000) {
      setShowAnimation(true);
      localStorage.setItem('lastAnimationTime', currentTime);
    }
  }, []);
  

  const togglePasswordTooltip = () => {
    setShowPasswordTooltip(!showPasswordTooltip);
  };

  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };

  const handleLogin = async () => {
    if (!studentId || !password) {
      alert('학번과 비밀번호를 입력해주세요.');
      return;
    }
  
    const payload = { studentId, password };
  
    
    
    try {
      // ✅ 로그인 요청
      const response = await axios.post('https://csiereserve.store/api/login123', payload, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true, // 쿠키 포함 요청
        validateStatus: () => true, // 모든 상태 코드 응답 받기 (403, 500 포함)
      });
  
  
      // ✅ 응답 헤더에서 Authorization 토큰 추출
      const authorizationHeader = response.headers['authorization'];
      if (authorizationHeader) {
        const accessToken = authorizationHeader.split(' ')[0]; // "Bearer token_value"에서 token_value 추출
        // 9시간 후 만료되도록 설정
      const expiresAt = Date.now() + 5 * 60 * 60 * 1000; // 현재 시간 + 5시간
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('expiresAt', expiresAt.toString());
      } else {
        console.warn("❌ Authorization 헤더가 없습니다. 쿠키로 인증하는지 확인 필요");
      }
  
  
      const { userRole, studentId, name } = response.data.data;
      
      

      localStorage.setItem('userRole', userRole);
      localStorage.setItem('studentId', studentId);
      localStorage.setItem('name', name);
      
      if (response.data.data.userRole === "ROLE_ADMIN") {
        navigate("/admin");
      } else {
        navigate("/mainpage");
      }
  
    } catch (error) {
      console.error("❌ 로그인 오류:", error.response?.data || error.message);
      alert(`로그인 실패: 해당 아이디와 비밀번호가 일치하지 않습니다`);
    }
  };
  

  return (
    <div >
      {/* 5.5초 동안 애니메이션 실행 */}
      {showAnimation ? (
        <Lottie
          loop={false} // 한번만 실행
          animationData={startAnimation}
          play
          style={{ width: '100%', height: '100vh' ,backgroundColor:'white'}} // 전체 화면
        />
      ) : (
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
            <span className="auth-link" onClick={togglePasswordTooltip}>비밀번호 찾기</span>
          </div>
          {/* ✅ 툴팁 UI 추가 */}
          {showPasswordTooltip && (
            <div className="password-tooltip">
              하단 [문의하기]를 통해 
              [이름/학번]을 보내주시면 <br/>
              해결해드리겠습니다.
            </div>
          )}
          <div className="inquiry-wrapper">
            <div className="inquiry-icon-container" onClick={toggleTooltip}>
                <img src="/assets/inquiry.svg" alt="문의하기" className="inquiry-icon" />
                <a href="https://open.kakao.com/o/sQDWgggh" className="inquiry-link">문의하기</a>
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
        </div>



          
        </div>
      )}
    </div>
  );
}

export default Unlogin;
