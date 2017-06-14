import React, { PropTypes } from 'react'
import Square from './Square'

import { LINE_COUNT } from '../constants/configurations'
import { ROW_STRINGS, COLUMN_STRINGS } from '../constants/stgings'

import * as squareModel from '../models/square'

const renderSquare = (squares, squareNumber, canPlace, displayGuide, onClick) => {
  return <Square
    key={ "square-" + squareNumber }
    value={ squares[squareNumber] }
    canPlace={ canPlace }
    displayGuide={ displayGuide }
    onClick={ () => onClick(squareNumber) }
  />
}

const Board = ({ squares, step, displayGuide, onClick }) => {
  let boardBody = []
  let boardRowNumbers = []
  let boardColumnNumbers = []

  for (let row = 0; row < LINE_COUNT; row++) {
    boardRowNumbers.push(<div key={ "board-row-number-" + (row + 1) } className="row-number">{ ROW_STRINGS[row] }</div>);
  }
  for (let column = 0; column < LINE_COUNT; column++) {
    boardColumnNumbers.push(<div key={ "board-column-number-" + (column + 1) } className="column-number">{ COLUMN_STRINGS[column] }</div>);
  }
  for (let row = 0; row < LINE_COUNT; row++) {
    let rowSquares = [];
    for (let column = 0; column < LINE_COUNT; column++) {
      const squareNumber = row * LINE_COUNT + column + 1;
      rowSquares.push(renderSquare(squares, squareNumber, squareModel.canPlace(squares, squareNumber, step + 1), displayGuide, onClick));
    }
    boardBody.push(<div key={ "board-body-row-" + (row + 1) } className="body-row">{ rowSquares }</div>);
  }
  return (
    <div className="board">
      <div className="column-numbers">
        { boardColumnNumbers }
      </div>
      <div className="row-numbers">
        { boardRowNumbers }
      </div>
      <div className="body">
        { boardBody }
      </div>
    </div>
  )
}

Board.propTypes = {
  squares: PropTypes.object.isRequired,
  step: PropTypes.number.isRequired,
  displayGuide: PropTypes.bool.isRequired
}

export default Board
