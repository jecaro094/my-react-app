// src/components/Home.tsx
import React from 'react';
import myImage from '../assets/logo192.png';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to My Portfolio</h1>
      <p>This is the home page of my React portfolio.</p>
      <p>This is an example of image:</p>
      <img src={myImage} alt="Description of the image" />
      <p>From now on, I think that it is a matter of investigating and knowing 
        to include and what not to include...
      </p>
    </div>
  );
};

export default Home;
