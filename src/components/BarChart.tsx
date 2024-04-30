import React, { useState, useEffect, useContext } from 'react'
import 'chart.js/auto'
import { Bar } from 'react-chartjs-2'
import { Dropdown } from './Dropdown'
import { get_url, DROPDOWN_OPTIONS } from '../utils/utils'
import { BarChartProps } from '../interfaces/barchart'
import TextInput from './TextInput'
import { Pokemon } from '../interfaces/table'
import Table from './Table'

var p: number[]
const pokemons_to_retrieve = '151'

const BarChart: React.FC<BarChartProps> = ({}) => {
  const [selectedDropdownValue, setSelectedDropdownValue] =
    useState<string>(pokemons_to_retrieve)
  const [pokemons, setPokemons] = useState<Pokemon[] | undefined>(undefined)
  const [error, setError] = useState<string | null>(null)

  var url = get_url(selectedDropdownValue)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await fetch(url, { mode: 'cors', method: 'GET' })

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const result = await response.json()
        setPokemons(result.pokemons)
        console.log(pokemons)
      } catch (err) {}
    }
    fetchData()
  }, [selectedDropdownValue])

  const handleDropdownSelect = (value: string) => {
    setSelectedDropdownValue(value)
  }

  return (
    <div>
      <Table pokemons={pokemons}></Table>
    </div>
  )
}

export default BarChart
