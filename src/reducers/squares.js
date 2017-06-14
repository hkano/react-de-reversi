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
  console.log(action.type)
  if (action.type !== actionTypes.SQUARE) {
    return state
  }

  let squares = state.squares
  let squareNumbers = state.squareNumbers
  let historySquares = state.historySquares

  const step = squareNumbers.length

  // if (squares[action.number] || !squareModel.canPlace(squares, action.number, step)) {
  //   return state
  // }
//
  // squares[action.number] = gameModel.color(step)
  // squares = squareModel.turnSquare(squares, action.number, step)
  // squareNumbers.push(action.number)
  // historySquares.push(Object.assign({}, squares))
//
  // // skip
  // for (let i = 1; i <= 2; i++) {
  //   if (squareModel.canPlaceAny(squares, step + i) || gameModel.isGameEnd(squares, squareNumbers)) {
  //     break
  //   } else {
  //     squareNumbers.push(0)
  //     historySquares.push(Object.assign({}, squares))
  //   }
  // }

  return {
    ...state,
    squares: squares,
    squareNumbers: squareNumbers,
    historySquares: historySquares
  }
}

export default squares
