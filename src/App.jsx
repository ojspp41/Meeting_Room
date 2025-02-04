// App.jsx
import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Unlogin from './pages/Unlogin';
import FeeCertification from './pages/FeeCertification';
import Password from './pages/Password';
import Find from './pages/Find';
import { Faq } from './pages/Faq';

import { Answer } from './pages/Answer.jsx';
import MapView from './pages/Map';
import MainPage from './pages/MainPage';
import ReservationDetails from './pages/ReservationDetails';
import NoticeDetail from './pages/NoticeDetail.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import Admin from './pages/Admin.jsx';
import AdminNotice  from './pages/AdminNotice.jsx';
import AdminFaq from './pages/AdminFaq.jsx';
import AdminNoticeWrite  from './pages/AdminNoticeWrite.jsx';
import AdminFeeEdit from './pages/AdminFeeEdit.jsx' 
import AdminFee from './pages/AdminFee.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Unlogin />} />
          <Route path="/fee" element={<FeeCertification />} />
          <Route path="/password" element={<Password />} />
          <Route path="/find" element={<Find />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/notice" element={<Answer />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/mainpage" element={<MainPage />} />
          <Route path="/reservation-details" element={<ReservationDetails />} />
          <Route path="/notice/:id" element={<NoticeDetail />} />
          {/* 관리자페이지 */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          
          <Route path="/admin/notice" element={<AdminNotice />} />
          <Route path="/admin/notice/write" element={<AdminNoticeWrite />} />
          
          <Route path="/admin/faq" element={<AdminFaq />} />

          <Route path="/admin/fee" element={<AdminFee />} />
          <Route path="/admin/fee/edit" element={<AdminFeeEdit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
