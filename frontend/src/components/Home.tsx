// src/components/Home.tsx
import React from 'react'
import myImage from '../assets/logo192.png'
import './Home.css'

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to My Portfolio</h1>
      <p>
        Here, I will talk briefly about my software development experiences
        though the years.
      </p>
      <p>This is an example of image:</p>
      <img src={myImage} alt='Description of the image' />
    </div>
  )
}

export default Home
