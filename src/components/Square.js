import React, { PropTypes } from 'react'

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

Square.propTypes = {
//  value: PropTypes.string.isRequired,
//  displayGuide: PropTypes.bool.isRequired,
//  canPlace: PropTypes.bool.isRequired,
//  onClick: PropTypes.func.isRequired
}

export default Square
