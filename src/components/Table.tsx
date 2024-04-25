// Table.tsx

import React from 'react'
import { TableProps } from '../interfaces/table'

const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {data.map((person, index) => (
          <tr key={index}>
            <td>{person.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
