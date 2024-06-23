import React, { useState } from 'react'
import { get_url } from '../utils/utils'
import { useNavigate } from 'react-router-dom'
import './Login.css'

type LoginProps = {
  onLogin: () => void
}

const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const login_url = get_url({
        path: '/token',
      })
      const response = await fetch(login_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include credentials in the request
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      setMessage(data.message)

      console.log(`data.message: '${data.message}'`)
      if (response.ok) {
        onLogin() // Call the `onLogin` function passed as a prop
        navigate('/home')
      } else {
        setMessage('Login failed') // Update message state to reflect failed login
      }
    } catch (error) {
      setMessage('Login failed')
    }
  }

  return (
    <div className='login-container'>
      <div className='login-form'>
        <input
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Username'
        />
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />
        <button onClick={handleLogin}>Login</button>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default Login
