import React, { useState } from 'react'

interface TextInputProps {
  label: string
}

const TextInput: React.FC<TextInputProps> = ({ label }) => {
  const [text, setText] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

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
