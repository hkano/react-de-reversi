import React from 'react'

const Square = ({ value, displayGuide, canPlace, onClick }) => {
  const name = value ? value : 'none'
  let className = 'square'
  if (displayGuide) {
    className += ' ' + (canPlace ? 'square-o' : 'square-x')
  }
  return (
    <button className={ className } onClick={ onClick }>
      <span className={ name }></span>
    </button>
  )
}

export default Square
