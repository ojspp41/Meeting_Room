// App.jsx
import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Unlogin from './pages/Unlogin';
import FeeCertification from './pages/FeeCertification';
function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Unlogin  />} />
            <Route path="/fee" element={<FeeCertification  />} />
            
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
