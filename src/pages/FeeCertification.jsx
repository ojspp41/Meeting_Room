import React, { useState } from 'react';
import { motion } from 'framer-motion'; // ✅ 모션 라이브러리 추가
import { useNavigate } from 'react-router-dom';
import { useFeeStore } from '../../store';
import instance from '../axiosConfig';
import './css/FeeCertification.css';

function FeeCertification() {
  const { name, setName, studentId, setStudentId } = useFeeStore();
  const navigate = useNavigate();
  
  const isValidStudentId = studentId.length === 9 && /^\d+$/.test(studentId);
  const isFormValid = name.trim() !== '' && isValidStudentId;

  const handleSubmit = async () => {
    if (!name || !studentId) {
      alert('이름과 학번을 입력해주세요.');
      return;
    }
    
    const payload = { name, studentId };
    console.log(name, studentId);
    try {
      const response = await instance.post('/admin/studentFeePayer/verify', payload);
      alert(`인증 완료: ${response.data.message}`);
      navigate('/password');
    } catch {
      alert('학생회비 납부 회원이 아닙니다.');
    }
  };

  return (
    <motion.div 
      className="fee-certification-container"
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }}  
      transition={{ duration: 0.8 }}  
    >
      <motion.img 
        src="/assets/logo.svg" 
        alt="학생회비 로고" 
        className="fee-logo" 
        initial={{ opacity: 0, scale: 0.5 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.8 }}
      />

      <motion.div 
        className="fee-text"
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }}  
        transition={{ duration: 0.8, delay: 0.3 }}  
      >
        <h2>학생회비 납부 인증</h2>
        <p>다음부터는 회의실 예약이 불가능합니다.</p>
      </motion.div>

      {/* 이름 & 학번 입력 폼 */}
      <motion.div 
        className="fee-form"
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }}  
        transition={{ duration: 0.8, delay: 0.5 }}  
      >
        <motion.div className="input-group">
          <label htmlFor="name" className='name_text'>이름</label>
          <motion.input 
            type="text" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            whileFocus={{ scale: 1.05 }}
          />
        </motion.div>
        <motion.div className="input-group">
          <label htmlFor="studentId" className='name_text'>학번</label>
          <motion.input 
            type="text" 
            id="studentId" 
            value={studentId} 
            onChange={(e) => setStudentId(e.target.value)}
            whileFocus={{ scale: 1.05 }}
          />
        </motion.div>
        <p className="form-info">* 학번은 아이디로 쓰일 예정입니다.</p>
      </motion.div>

      <motion.div className="button-container">
        <motion.button 
          className={`next-button ${isFormValid ? 'active' : ''}`} 
          onClick={handleSubmit}
          disabled={!isFormValid}
          whileTap={{ scale: 0.95 }}  // 클릭하면 살짝 작아졌다가 복귀
          whileHover={{ scale: 1.1 }} // 마우스 올리면 약간 커짐
        >
          다음
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default FeeCertification;
