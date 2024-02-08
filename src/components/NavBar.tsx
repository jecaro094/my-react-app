// NavBar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import your custom styles

const NavBar: React.FC = () => {
  return (
    <nav className="navbar">
    {/* <div className="logo">My Logo</div> */}
        <ul className="nav-links">
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/chart">BarChart</Link></li>
        </ul>
    </nav>
  );
};

export default NavBar;
