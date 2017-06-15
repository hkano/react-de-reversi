import React from 'react'
import Moves from './Moves'
import * as gameModel from '../models/game'

const status = (squares, squareNumbers) => {
  const step = squareNumbers.length
  if (gameModel.isGameEnd(squares, squareNumbers)) {
    return gameModel.calculateWinner(squares)
  }
  return (
    <div>
      {'Next player: '}
      <span className={ gameModel.color(step) }></span>
      [{gameModel.isBlackMove(step) ? '1st' : '2nd'}]
    </div>
  )
}

const Info = ({ squares, squareNumbers, onClick }) => (
  <div className="info">
    <span>{ status(squares, squareNumbers) }</span>
    <div className="count">
      <span className="black"></span> { gameModel.countBlack(squares) } - { gameModel.countWhite(squares) } <span className="white"></span>
    </div>
    <Moves
      squareNumbers={ squareNumbers }
      onClick={ onClick }
    />
  </div>
)

export default Info
