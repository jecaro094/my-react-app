// Create a component imported to PokemonList.tsx that will display a bar chart of pokemon attributes

import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Pokemon } from '../interfaces/table'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

interface BarChartProps {
  pokemon: Pokemon
}

const BarChart: React.FC<BarChartProps> = ({ pokemon }) => {
  const data = {
    labels: [
      'HP',
      'Attack',
      'Defense',
      'Special Attack',
      'Special Defense',
      'Speed',
    ],
    datasets: [
      {
        label: 'Stats',
        data: [
          pokemon.hp,
          pokemon.attack,
          pokemon.defense,
          pokemon.special_attack,
          pokemon.special_defense,
          pokemon.speed,
        ],
        backgroundColor: 'rgb(121, 214, 173)', // Set light green color for all bars
        borderColor: 'rgb(0, 0, 0)', // Set light green border color for all bars
        borderWidth: 1, // Set the same border width for all bars
      },
    ],
  }

  const options = {
    scales: {
      x: {
        type: 'category' as const,
      },
    },
  }

  return <Bar data={data} options={options} />
}

export default BarChart
