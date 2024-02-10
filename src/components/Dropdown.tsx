import React, { useState, useContext } from 'react';
import './Dropdown.css'

interface DropdownProps {
  options: string[];
  onSelect: (selectedValue: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value
    setSelectedOption(newValue);
    onSelect(newValue);
    console.log(`Selected option in DROPDOWN: ${selectedOption}`)
  };

  return (
    <div className="dropdown-container">
      <label>Select an option: </label>
      <select value={selectedOption} onChange={handleSelectChange} className="custom-dropdown">
        <option value="">Select...</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {selectedOption && <p>Selected option: {selectedOption}</p>}
    </div>
  );
};