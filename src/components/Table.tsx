import { Pokemon, TableProps } from '../interfaces/table'
import './Table.css'
import React from 'react'
import ReactDOM from 'react-dom'

const Table: React.FC<TableProps> = ({ pokemons, columns, handlePokemonDetails }) => {

  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pokemons?.map((pokemon) => (
            <tr
              key={pokemon.id}
              onClick={() => handlePokemonDetails(pokemon, true)}
              style={{ cursor: 'pointer' }}
            >
              <td>
                <img src={pokemon?.sprite}></img>
              </td>
              <td>{pokemon?.name}</td>
              <td>{pokemon?.type_1}</td>
              <td>{pokemon?.type_2}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
