import React, { useState } from 'react'
import { TextInputProps } from '../interfaces/table'


const TextInput: React.FC<TextInputProps> = ({ text, label, handleChange }) => {

  return (
    <div>
      <label>
        {label}:
        <input type='text' value={text} onChange={handleChange} />
      </label>
      <p>You typed: {text}</p>
    </div>
  )
}

export default TextInput
