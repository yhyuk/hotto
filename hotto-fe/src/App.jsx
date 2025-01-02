import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // react-router-dom 사용
import Navbar from './components/Navbar'; 
import LottoGenerator from './components/LottoGenerator';
import MyLotto from './components/MyLotto';

import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar /> {/* 네비바 추가 */}
                <Routes>
                    <Route path="/" element={<LottoGenerator />} /> {/* 추첨 페이지 */}
                    <Route path="/mylotto" element={<MyLotto />} /> {/* 마이로또 페이지 */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;

