import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">UEFA</span>
          <span className="logo-subtext">Champions League</span>
        </Link>
        <div className="navbar-title">
          <h1>Saison 2024/2025</h1>
        </div>
      </div>
    </div>
  );
}

export default Navbar; 