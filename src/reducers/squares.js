import { LINE_COUNT, INITIAL_BLACK_SQUARE_NUMBERS, INITIAL_WHITE_SQUARE_NUMBERS } from '../constants/configurations'
import { BLACK, WHITE } from '../constants/discColors'
import * as actionTypes from '../constants/actionTypes'
import * as gameModel from '../models/game'
import * as squareModel from '../models/square'

const initialSquaresState = {
  squares: initialSquares(),
  squareNumbers: [0],
  historySquares: [Object.assign({}, initialSquares())]
}

function initialSquares() {
  let squares = {}
  for (let i = 0; i < Math.pow(LINE_COUNT, 2); i++) {
    squares[i + 1] = null
  }
  for (var initial_black_square_number in INITIAL_BLACK_SQUARE_NUMBERS) {
    if (INITIAL_BLACK_SQUARE_NUMBERS.hasOwnProperty(initial_black_square_number)) {
      squares[INITIAL_BLACK_SQUARE_NUMBERS[initial_black_square_number]] = BLACK
    }
  }
  for (var initial_white_square_number in INITIAL_WHITE_SQUARE_NUMBERS) {
    if (INITIAL_WHITE_SQUARE_NUMBERS.hasOwnProperty(initial_white_square_number)) {
      squares[INITIAL_WHITE_SQUARE_NUMBERS[initial_white_square_number]] = WHITE
    }
  }
  return squares
}

const squares = ( state = initialSquaresState, action ) => {
  if (action.type !== actionTypes.SQUARE && action.type !== actionTypes.MOVE) {
    return state
  }

  let { squares, squareNumbers, historySquares } = state
  let step

  if (action.type === actionTypes.SQUARE) {
    const number = action.number
    step = squareNumbers.length

    if (squares[number] || !squareModel.canPlace(squares, number, step)) {
      return state
    }

    squares[number] = gameModel.color(step)
    squares = squareModel.turnSquare(squares, number, step)
    squareNumbers.push(number)
    historySquares.push(Object.assign({}, squares))
  }

  if (action.type === actionTypes.MOVE) {
    step = action.step

    squares = Object.assign({}, historySquares[step])
    squareNumbers = squareNumbers.slice(0, step + 1)
    historySquares = historySquares.slice(0, step + 1)
  }

  // skip
  for (let i = 1; i <= 2; i++) {
    if (squareModel.canPlaceAny(squares, step + i) || gameModel.isGameEnd(squares, squareNumbers)) {
      break
    } else {
      squareNumbers.push(0)
      historySquares.push(Object.assign({}, squares))
    }
  }

  return {
    ...state,
    squares: squares,
    squareNumbers: squareNumbers,
    historySquares: historySquares
  }
}

export default squares
