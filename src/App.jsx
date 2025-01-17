// App.jsx
import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Unlogin from './pages/Unlogin';
import FeeCertification from './pages/FeeCertification';
import Password from './pages/Password';
import Find from './pages/Find';
function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Unlogin  />} />
            <Route path="/fee" element={<FeeCertification  />} />
            <Route path="/password" element={<Password  />} />
            <Route path="/find" element={<Find  />} />
            
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
