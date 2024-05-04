import Home from './components/Home'
// import BarChart from './components/BarChart' // adjust the path based on your file structure
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PokemonList from './components/PokemonList'

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/chart' element={<PokemonList />} />
          {/* <BarChart data={data} /> */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
