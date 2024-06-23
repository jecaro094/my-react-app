// NavBar.tsx
import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css' // Import your custom styles
import { get_url } from '../utils/utils'
import { useNavigate } from 'react-router-dom'

type LogoutProps = {
  onLogout: () => void;
};

const NavBar = ({ onLogout }: LogoutProps)  => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    const logout_url = get_url({
      path: '/logout',
    })
    const response = await fetch(logout_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    
    if (response.ok) {
      onLogout()
      navigate('/login')
    }
  }

  return (
    <nav className='navbar'>
      {/* <div className="logo">My Logo</div> */}
      <ul className='nav-links'>
        <li>
          <Link to='/home' className='nav-link'>
            Home
          </Link>
        </li>
        <li>
          <Link to='/pokemon' className='nav-link'>PokeAPI</Link>
        </li>
        <li>
          <button onClick={handleLogout} className='nav-link'>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
