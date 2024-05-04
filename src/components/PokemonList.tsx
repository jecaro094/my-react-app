import { useState, useEffect } from 'react'
import { get_url, PKMN_TABLE_COLS } from '../utils/utils'
import Table from './Table'
import NavigationButtons from './NavigationButton'
import TextInput from './TextInput'

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  var [currentPage, setCurrentPage] = useState(1)
  var [totalPages, setTotalPages] = useState(100)
  const [text, setText] = useState('')
  const itemsPerPage = 5

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // Make the API call with offset and limit parameters
        const url = get_url({
          offset: (currentPage - 1) * itemsPerPage,
          limit: itemsPerPage,
          text: text,
        })
        const response: any = await fetch(url, { method: 'GET', mode: 'cors' })
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const res = await response.json()
        setPokemons(res.pokemons)
        setTotalPages(Math.round(res.total / itemsPerPage))
        setError(null)
      } catch (error: any) {
        setError(error.message)
      }
      setLoading(false)
    }

    fetchData()
  }, [currentPage, text]) // Fetch data when this changes

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
  }

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
    setCurrentPage(1)
  }

  return (
    <div>
      <h1>National Pokedex</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <TextInput text={text} label='' handleChange={handleChange} />
      <Table pokemons={pokemons} columns={PKMN_TABLE_COLS} />
      <NavigationButtons
        currentPage={currentPage}
        totalPages={totalPages}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </div>
  )
}

export default PokemonList
