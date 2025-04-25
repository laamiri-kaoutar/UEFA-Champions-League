import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MatchList from './components/MatchList';
import MatchDetail from './components/MatchDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<MatchList />} />
            <Route path="/match/:id" element={<MatchDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
