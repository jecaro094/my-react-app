import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import PokemonList from './components/PokemonList'
import React, { useState } from 'react'
import NavBar from './components/NavBar'
import './App.css'

const App: React.FC = () => {
  // Step 1: Add state for login status
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Function to update login status
  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <Router>
      <div>
        {!isLoggedIn ? (
          <Login onLogin={handleLogin} />
        ) : (
          <NavBar onLogout={handleLogout} /> // Pass handleLogout to the Navbar
        )}
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/pokemon' element={<PokemonList />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
