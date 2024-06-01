import React from 'react'
import { NavigationButtonsProps } from '../interfaces/table'
import './NavigationButton.css'

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentPage,
  totalPages,
  nextPage,
  prevPage,
  backPage,
}) => {
  if (backPage === undefined) {
    return (
      <div className='myDiv'>
        <button className='button' onClick={prevPage}>
          Prev
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button className='button' onClick={nextPage}>
          Next
        </button>
      </div>
    )
  }
  return (
    <div className='myDiv'>
      <button className='button' onClick={backPage}>
        Back
      </button>
    </div>
  )
}

export default NavigationButtons
