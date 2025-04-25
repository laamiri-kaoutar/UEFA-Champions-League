import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-logo">
          <div className="logo-container">
            <div className="logo-circle">
              <span className="logo-text">UEFA</span>
              <div className="logo-stars">⭐ ⭐ ⭐</div>
            </div>
            <span className="logo-subtext">Champions League</span>
          </div>
        </Link>
        <div className="navbar-title">
          <h1>Saison 2024/2025</h1>
          <div className="trophy-icon">🏆</div>
        </div>
      </div>
    </div>
  );
}

export default Navbar; 