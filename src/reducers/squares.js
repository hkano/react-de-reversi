import { LINE_COUNT, INITIAL_BLACK_NUMBERS, INITIAL_WHITE_NUMBERS } from '../constants/configurations'
import { BLACK, WHITE } from '../constants/discColors'
import * as actionTypes from '../constants/actionTypes'
import * as gameModel from '../models/game'
import * as squareModel from '../models/square'

const initialSquaresState = {
  histories: [initialSquares()],
  numbers: [0],
}

function initialSquares() {
  let squares = {}
  let i = 0
  while (i < Math.pow(LINE_COUNT, 2)) {
    squares[i + 1] = null
    i++
  }
  for (let initial_black_number in INITIAL_BLACK_NUMBERS) {
    if (INITIAL_BLACK_NUMBERS.hasOwnProperty(initial_black_number)) {
      squares[INITIAL_BLACK_NUMBERS[initial_black_number]] = BLACK
    }
  }
  for (let initial_white_number in INITIAL_WHITE_NUMBERS) {
    if (INITIAL_WHITE_NUMBERS.hasOwnProperty(initial_white_number)) {
      squares[INITIAL_WHITE_NUMBERS[initial_white_number]] = WHITE
    }
  }
  return squares
}

const squares = ( state = initialSquaresState, action ) => {
  if (action.type !== actionTypes.SQUARE && action.type !== actionTypes.MOVE) {
    return state
  }

  let { histories, numbers } = state
  let squares = Object.assign({}, histories[histories.length - 1])
  let step

  if (action.type === actionTypes.SQUARE) {
    const number = action.number
    step = numbers.length

    if (squares[number] || !squareModel.canPlace(squares, number, step)) {
      return state
    }

    squares[number] = gameModel.color(step)
    squares = squareModel.turnSquare(squares, number, step)
    histories.push(squares)
    numbers.push(number)
  }

  if (action.type === actionTypes.MOVE) {
    step = action.step

    squares = histories[step]
    histories = histories.slice(0, step + 1)
    numbers = numbers.slice(0, step + 1)
  }

  // skip
  let i = 1
  while (i <= 2) {
    if (squareModel.canPlaceAny(squares, step + i) || gameModel.isGameEnd(squares, numbers)) {
      break
    } else {
      histories.push(squares)
      numbers.push(0)
      i++
    }
  }

  return {
    ...state,
    histories: histories,
    numbers: numbers,
  }
}

export default squares
