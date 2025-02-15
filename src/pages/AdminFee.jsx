import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation,useQueryClient } from '@tanstack/react-query';  // ✅ React Query 추가
import './css/admin.css';
import axiosCookie from '../../axiosCookie';
import AdminNav from '../components/NavigationBar/AdminNav';

export const AdminFee = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const queryClient = useQueryClient();
  // 🔹 React Query의 useMutation을 사용하여 학생 추가 API 요청
  const addStudentMutation = useMutation({
    mutationFn: async ({ name, studentId }) => {
      return await axiosCookie.post('/api/admin/studentFeePayer/create', { name, studentId });
    },
    onMutate: async (newStudent) => {
      await queryClient.cancelQueries(['studentFeePayers']);
      const previousData = queryClient.getQueryData(['studentFeePayers']);
      queryClient.setQueryData(['studentFeePayers'], (oldData) => [
        ...(oldData || []),
        { id: Date.now(), ...newStudent }, // UI에서 먼저 추가된 것처럼 보이게 함
      ]);
      alert('학생회비자가 추가되었습니다.');
      setIsModalOpen(false);
      setName('');
      setStudentId('');
      return { previousData };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['studentFeePayers'], context.previousData); // 실패 시 복구
    },
    onSettled: () => {
      queryClient.invalidateQueries(['studentFeePayers']); // 최신 데이터 요청
    },
  });

  const handleAddStudentFeePayer = () => {
    if (!name || !studentId) {
      alert('이름과 학번을 입력하세요.');
      return;
    }
    addStudentMutation.mutate({ name, studentId });
  };

  return (
    <div className="admin-container">
      <AdminNav title="관리자 학생회비" />
      <div className="admin-button-container">
        <button className="admin-button" onClick={() => setIsModalOpen(true)}>
          학생회비자 추가
        </button>
        <button className="admin-button" onClick={() => navigate('/admin/fee/edit')}>
          학생회비자 목록 조회
        </button>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>학생회비자 추가</h2>
            <input
              type="text"
              placeholder="이름 입력"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="modal-input"
            />
            <input
              type="text"
              placeholder="학번 입력"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="modal-input"
            />
            <div className="modal-button-container">
              <button className="modal-button close" onClick={() => setIsModalOpen(false)}>
                닫기
              </button>
              <button className="modal-button" onClick={handleAddStudentFeePayer} disabled={addStudentMutation.isLoading}>
                {addStudentMutation.isLoading ? '추가 중...' : '추가'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFee;
