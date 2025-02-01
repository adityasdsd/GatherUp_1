import React from 'react';
import './dashboard.css';

export const UserDashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <ul>
          <li><a href="#profile">User Profile</a></li>
          <li><a href="#create">Create Community</a></li>
          <li><a href="#join">Join Community</a></li>
        </ul>
      </nav>
      {/* Main Content */}
      <main className="dashboard-content">
        <p>Find and join communities that match your interests!</p>
      </main>
      
      {/* Footer */}
      <footer className="dashboard-footer">
        <p>&copy; 2025 Community App. All rights reserved.</p>
      </footer>
    </div>
  );
};
