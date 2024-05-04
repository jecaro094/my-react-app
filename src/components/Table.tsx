import { TableProps } from '../interfaces/table'

import './Table.css'

const Table: React.FC<TableProps> = ({ pokemons, columns }) => (
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
          <tr>
            <td>
              <img src={pokemon?.sprite}></img>
            </td>
            <td>{pokemon?.name}</td>
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

export default Table
