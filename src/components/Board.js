import React from 'react'
import Square from './Square'

import { LINE_COUNT } from '../constants/configurations'
import { ROW_STRINGS, COLUMN_STRINGS } from '../constants/stgings'

import * as squareModel from '../models/square'

const renderSquare = (squares, number, canPlace, displayGuide, onClick) => {
  return <Square
    key={ "square-" + number }
    value={ squares[number] }
    canPlace={ canPlace }
    displayGuide={ displayGuide }
    onClick={ () => onClick(number) }
  />
}

const Board = ({ squares, step, displayGuide, onClick }) => {
  let boardBody = []
  let boardRowNumbers = []
  let boardColumnNumbers = []

  let row = 0
  while (row < LINE_COUNT) {
    boardRowNumbers.push(<div key={ "board-row-number-" + (row + 1) } className="row-number">{ ROW_STRINGS[row] }</div>)
    row++
  }
  let column = 0
  while (column < LINE_COUNT) {
    boardColumnNumbers.push(<div key={ "board-column-number-" + (column + 1) } className="column-number">{ COLUMN_STRINGS[column] }</div>)
    column++
  }
  row = 0
  while (row < LINE_COUNT) {
    let rowSquares = []
    column = 0
    while (column < LINE_COUNT) {
      const number = row * LINE_COUNT + column + 1
      rowSquares.push(renderSquare(squares, number, squareModel.canPlace(squares, number, step), displayGuide, onClick))
      column++
    }
    boardBody.push(<div key={ "board-body-row-" + (row + 1) } className="body-row">{ rowSquares }</div>)
    row++
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

export default Board
