import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Navbar from './components/Navbar'; 
import LottoGenerator from './components/LottoGenerator';
import MyLotto from './components/mylotto/MyLotto';
import PostList from './components/post/PostList';
import PostDetail from './components/post/PostDetail';
import PostWrite from './components/post/PostWrite';
import { theme } from './theme'; 
import GlobalStyle from './GlobalStyle'; // 글로벌 스타일

import './App.css';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Router>
                <div className="App">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<LottoGenerator />} />
                        <Route path="/mylotto" element={<MyLotto />} />
                        <Route path="/posts" element={<PostList />} />
                        <Route path="/posts/:id" element={<PostDetail />} />
                        <Route path="/posts-write" element={<PostWrite />} />
                    </Routes>
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;

