import React from 'react';
import './css/ErrorModal.css';

function ErrorModal({ message, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <p className="modal-message">{message}</p>
        <button className="modal-button" onClick={onClose}>확인</button>
      </div>
    </div>
  );
}

export default ErrorModal;
