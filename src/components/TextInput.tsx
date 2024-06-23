import React, { useState } from 'react'
import { TextInputProps } from '../interfaces/table'
import './TextInput.css'

const TextInput: React.FC<TextInputProps> = ({ text, label, handleChange }) => {
  return (
    <div className="text-input-container">
      <label>
        {label}
        <input type='text' value={text} onChange={handleChange} />
      </label>
    </div>
)
}

export default TextInput
