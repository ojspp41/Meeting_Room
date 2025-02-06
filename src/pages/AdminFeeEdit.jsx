import React, { useState, useEffect } from 'react';
import './css/admin.css';
import AdminNav from '../components/NavigationBar/AdminNav';
import axiosCookie from '../../axiosCookie';
export const AdminFeeEdit = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const itemsPerPage = 7;
  
  

  useEffect(() => {
    fetchFeePayers();
  }, []);

  const fetchFeePayers = async () => {
    try {
      const response = await axiosCookie.get('/api/studentFeePayer/getAll', {
        withCredentials: true, // 쿠키 자동 포함
      });
  
      console.log(response);
      if (response.data) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error.response?.data || error.message);
    }
  };
  

  const handleDelete = async (id) => {
    try {
      const response = await axiosCookie.delete(`/api/admin/studentFeePayer/delete/${id}`, {
        withCredentials: true, // 쿠키 자동 포함
      });
  
      if (response.status === 200) {
        setData(data.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error('Error deleting:', error.response?.data || error.message);
    }
  };
  

  const handleEdit = (item) => {
    setEditId(item.id);
    setName(item.name);
    setStudentId(item.studentId);
    setIsModalOpen(true);
  };


  const handleUpdate = async () => {
    try {
      await axiosCookie.put(`/api/admin/studentFeePayer/update/${editId}`, {
        name,
        studentId,
      });

      setData(data.map(item => (item.id === editId ? { ...item, name, studentId } : item)));
      setIsModalOpen(false);
      alert("수정완료되었습니다");
    } catch (error) {
      console.error('Error updating:', error.response?.data || error.message);
    }
  };


    const filteredData = data.filter((item) =>
      item.name.includes(searchTerm)
    );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const displayedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          이전
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
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
