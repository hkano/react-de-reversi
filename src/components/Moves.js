import React from 'react'
import * as gameModel from '../models/game'
import * as squareModel from '../models/square'

const description = (number, index) => {
  if (index === 0) {
    return 'Game start'
  }
  return (
    <div>
      { number > 0 ? 'Move: ' : 'Skip: ' }
      <span className={ gameModel.color(index) }></span>
    </div>
  )
}

const moves = (numbers, onClick) => {
  return numbers.map((number, index) => {
    return (
      <li key={index} value={index}>
        <a onClick={ () => onClick(index) }>
          { description(number, index) }
        </a>
        { number > 0 ? ' (' + squareModel.position(number) + ') ' : '' }
      </li>
    )
  })
}

const Moves = ({ numbers, onClick }) => (
  <div className="moves">
    <ol>{ moves(numbers, onClick) }</ol>
  </div>
)

export default Moves
