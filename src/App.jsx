import React from 'react';
import './App.css';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';  // ✅ React Query 추가

// 기존 import 유지
import Unlogin from './pages/Unlogin';
import FeeCertification from './pages/FeeCertification';
import Password from './pages/Password';
import MeetingRoomInfo from './pages/MeetingRoomInfo.jsx'

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
import AdminFaqWrite from './pages/AdminFaqWrite.jsx';
import AdminNoticeWrite  from './pages/AdminNoticeWrite.jsx';
import AdminFeeEdit from './pages/AdminFeeEdit.jsx';
import AdminFee from './pages/AdminFee.jsx';


import AdminFaqEdit from './pages/AdminFaqEdit.jsx' ;
import AdminFaqEditDetail from './pages/AdminFaqEditDetail.jsx' ;
import AdminNoticeEdit from './pages/AdminNoticeEdit.jsx' ;
import AdminNoticeEditDetail from './pages/AdminNoticeEditDetail.jsx' ;
import Reservation from './pages/Reservation.jsx';
import OpenExternalBrowser from './pages/OpenExternalBrowser.jsx';
import PrivateRoute from './pages/PrivateRoute.jsx';
// ✅ QueryClient 인스턴스 생성
const queryClient = new QueryClient();

function App() {
  return (

    <QueryClientProvider client={queryClient}> {/* ✅ React Query 적용 */}
      <div className="App">
        <OpenExternalBrowser />
        <RecoilRoot>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Unlogin />} />
              <Route path="/fee" element={<FeeCertification />} />
              <Route path="/password" element={<Password />} />
              <Route element={<PrivateRoute />}>
                <Route path="/faq" element={<Faq />} />
                <Route path="/notice" element={<Answer />} />
                <Route path="/map" element={<MapView />} />
                <Route path="/mainpage" element={<MainPage />} />
                <Route path="/reservation-details" element={<ReservationDetails />} />
                <Route path="/notice/:id" element={<NoticeDetail />} />
                <Route path="/reservation" element={<Reservation />} />
                <Route path="/meetingroominfo" element={<MeetingRoomInfo />} />
                {/* 관리자 페이지 */}
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/login" element={<AdminLogin />} />   
                <Route path="/admin/notice" element={<AdminNotice />} />
                <Route path="/admin/notice/write" element={<AdminNoticeWrite />} />  
                <Route path="/admin/notice/edit" element={<AdminNoticeEdit />} />
                <Route path="/admin/notice/editdetail/:id" element={<AdminNoticeEditDetail />} />
                <Route path="/admin/faq" element={<AdminFaq />} />
                <Route path="/admin/faq/write" element={<AdminFaqWrite />} />
                <Route path="/admin/faq/edit" element={<AdminFaqEdit />} />
                <Route path="/admin/faq/editdetail/:id" element={<AdminFaqEditDetail />} />
                <Route path="/admin/fee" element={<AdminFee />} />
                <Route path="/admin/fee/edit" element={<AdminFeeEdit />} />
              
              </Route>

              
            </Routes>
          </BrowserRouter>
        </RecoilRoot>
      </div>
    </QueryClientProvider>

  );
}

export default App;
