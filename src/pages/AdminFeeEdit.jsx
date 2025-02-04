import React, { useState, useEffect } from 'react';
import './css/admin.css';
import AdminNav from '../components/NavigationBar/AdminNav';
export const AdminFeeEdit = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([
    { id: 1, name: "홍길동1", studentId: "20210001" },
    { id: 2, name: "홍길동2", studentId: "20210002" }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const itemsPerPage = 7;
  
  

  useEffect(() => {
    fetch('/api/admin/studentFeePayer/getAll')
      .then(response => response.json())
      .then(result => {
        if (result.data) {
          setData(result.data);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = (id) => {
    fetch(`/api/admin/studentFeePayer/delete/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setData(data.filter(item => item.id !== id));
        }
      })
      .catch(error => console.error('Error deleting:', error));
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setName(item.name);
    setStudentId(item.studentId);
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    
    fetch(`/api/admin/studentFeePayer/update/${editId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, studentId }),
    })
      .then(response => {
        if (response.ok) {
          setData(data.map(item => (item.id === editId ? { ...item, name, studentId } : item)));
          setIsModalOpen(false);
        }
      })
      .catch(error => console.error('Error updating:', error));
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
