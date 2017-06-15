import React from 'react'
import * as gameModel from '../models/game'
import * as squareModel from '../models/square'

const description = (squareNumber, index) => {
  if (index === 0) {
    return 'Game start'
  }
  return (
    <div>
      { squareNumber > 0 ? 'Move: ' : 'Skip: ' }
      <span className={ gameModel.color(index) }></span>
    </div>
  )
}

const moves = (squareNumbers, onClick) => {
  return squareNumbers.map((squareNumber, index) => {
    return (
      <li key={index} value={index}>
        <a href="#" onClick={ () => onClick(index) }>
          { description(squareNumber, index) }
        </a>
        { squareNumber > 0 ? ' (' + squareModel.position(squareNumber) + ') ' : '' }
      </li>
    )
  })
}

const Moves = ({ squareNumbers, onClick }) => (
  <div className="moves">
    <ol>{ moves(squareNumbers, onClick) }</ol>
  </div>
)

export default Moves
