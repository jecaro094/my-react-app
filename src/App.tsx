import React, { useEffect, useState } from 'react';
import Home from './components/Home';
import BarChart from './components/BarChart'; // adjust the path based on your file structure
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const App: React.FC = () => {
  const [data, setData] = useState<number[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  var p: number[];
  const API_PORT = 80
  const AWS_URL = 'http://beanstalk-app2-env.eba-2mgkj2d6.eu-west-2.elasticbeanstalk.com';
  const LOCAL_URL = 'http://127.0.0.1';

  const url = LOCAL_URL;

  useEffect(() => {
    const fetchData = async (p: number[]) => {
      try {
        const response = await fetch(url + `:${API_PORT}/`,{mode: 'cors', method: "GET"});
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setData(result.random_number);
      } catch (err) {
      }
    };

    fetchData(p);
  }, []);

  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/"  element={<Home />} />
          <Route path="/chart"  element={<BarChart data={data} /> } />
        {/* <BarChart data={data} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
