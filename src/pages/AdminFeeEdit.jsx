import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import './css/admin.css';
import AdminNav from '../components/NavigationBar/AdminNav';
import axiosCookie from '../../axiosCookie';

export const AdminFeeEdit = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);

  // 🔹 1️⃣ 학생회비 납부자 목록 불러오기 (React Query 사용)
  const { data, isLoading, isError } = useQuery({
    queryKey: ['studentFeePayers'],
    queryFn: async () => {
      const response = await axiosCookie.get('/api/studentFeePayer/getAll', { withCredentials: true });
      return response.data.data;
    },
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터를 fresh 상태로 유지
  });

  // 🔹 2️⃣ 삭제 Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosCookie.delete(`/api/admin/studentFeePayer/delete/${id}`, { withCredentials: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['studentFeePayers']); // 데이터 새로고침
    },
  });

  // 🔹 3️⃣ 수정 Mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, name, studentId }) => {
      return await axiosCookie.put(`/api/admin/studentFeePayer/update/${id}`, { name, studentId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['studentFeePayers']); // 데이터 새로고침
      setIsModalOpen(false);
      alert('수정 완료되었습니다');
    },
  });

  // 🔹 삭제 핸들러
  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  // 🔹 수정 모달 열기
  const handleEdit = (item) => {
    setEditId(item.id);
    setName(item.name);
    setStudentId(item.studentId);
    setIsModalOpen(true);
  };

  // 🔹 수정 핸들러
  const handleUpdate = () => {
    updateMutation.mutate({ id: editId, name, studentId });
  };

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>데이터를 불러오는 중 오류가 발생했습니다.</p>;

  const filteredData = data.filter((item) => item.name.includes(searchTerm));
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const displayedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="admin-container">
      <AdminNav title="학생회비 납부자 목록" />
      <input
        type="text"
        placeholder="이름 검색"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="list-container">
        {displayedData.map((item) => (
          <div key={item.id} className="list-item">
            <div className="list-text">
              <div>{item.name}</div>
              <div>{item.studentId}</div>
            </div>
            <div className="list-buttons">
              <button className="edit-button" onClick={() => handleEdit(item)}>수정</button>
              <button className="delete-button" onClick={() => handleDelete(item.id)}>
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
          이전
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
          다음
        </button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>학생회비자 수정</h2>
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
              <button className="modal-button" onClick={handleUpdate}>
                수정
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFeeEdit;
