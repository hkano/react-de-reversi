import React from 'react'
import Moves from './Moves'
import * as gameModel from '../models/game'

const status = (squares, numbers) => {
  const step = numbers.length
  if (gameModel.isGameEnd(squares, numbers)) {
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

const Info = ({ squares, numbers, onClick }) => (
  <div className="info">
    <span>{ status(squares, numbers) }</span>
    <div className="count">
      <span className="black"></span> { gameModel.countBlack(squares) } - { gameModel.countWhite(squares) } <span className="white"></span>
    </div>
    <Moves
      numbers={ numbers }
      onClick={ onClick }
    />
  </div>
)

export default Info
