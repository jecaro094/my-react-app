// Table.tsx

import React from 'react'
import { Pokemon, PokemonListProps } from '../interfaces/table'
import './Table.css'

const Table: React.FC<PokemonListProps> = ({ pokemons }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>image</th>
            <th>name</th>
            {/* <th>audio</th> */}
            <th>type_1</th>
            <th>type_2</th>
            <th>hp</th>
            <th>attack</th>
            <th>special_attack</th>
            <th>defense</th>
            <th>special_defense</th>
            <th>speed</th>
          </tr>
        </thead>
        <tbody>
          {pokemons?.map((pokemon) => (
            <tr>
              <td>
                <img src={pokemon?.sprite}></img>
              </td>
              <td>{pokemon?.name}</td>
              {/* <td>
                <audio controls>
                  <source src={pokemon?.audio} type='audio/ogg' />
                  Your browser does not support the audio element.
                </audio>
              </td> */}
              <td>{pokemon?.type_1}</td>
              <td>{pokemon?.type_2}</td>
              <td>{pokemon?.hp}</td>
              <td>{pokemon?.attack}</td>
              <td>{pokemon?.special_attack}</td>
              <td>{pokemon?.defense}</td>
              <td>{pokemon?.special_defense}</td>
              <td>{pokemon?.speed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
