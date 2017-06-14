import { LINE_COUNT } from '../constants/configurations'
import { ROW_STRINGS, COLUMN_STRINGS } from '../constants/stgings'

import * as gameModel from '../models/game'

/**
 * public
 */

export function position(squareNumber) {
  return ROW_STRINGS[row(squareNumber) - 1] + ', ' + COLUMN_STRINGS[column(squareNumber) - 1]
}

export function canPlace(squares, squareNumber, step) {
  if (squares[squareNumber] !== null) {
    return false
  }
  return turnSquareNumbers(squares, squareNumber, step).length > 0
}

export function canPlaceAny(squares, step) {
  return Array(Math.pow(LINE_COUNT, 2)).fill(null).some((_, index) => {
    if (squares[index + 1]) {
      return false
    }
    return canPlace(squares, index + 1, step)
  });
}

export function turnSquare(squares, squareNumber, step) {
  const myColor = gameModel.color(step)
  const _turnSquareNumbers = turnSquareNumbers(squares, squareNumber, step)
  for (let i = 0; i < _turnSquareNumbers.length; i++) {
    squares[_turnSquareNumbers[i]] = myColor
  }
  return squares
}

/**
 * private
 */

function row(squareNumber) {
  return Math.ceil(squareNumber / LINE_COUNT)
}

function column(squareNumber) {
  return (squareNumber - 1) % LINE_COUNT + 1
}

function turnSquareNumbers(squares, squareNumber, step) {
  const myColor = gameModel.color(step)
  const upFactors = [0 - LINE_COUNT - 1, 0 - LINE_COUNT, 0 - LINE_COUNT + 1]
  const sideFactors = [0 - 1, 0 + 1]
  const downFactors = [LINE_COUNT - 1, LINE_COUNT, LINE_COUNT + 1]

  let _turnSquareNumbers = []
  let _squareNumber
  let _squareNumbers = []
  let _previousRowNumber
  let _currentRowNumber

  // up
  for (let i = 0; i < upFactors.length; i++) {
    _squareNumber = squareNumber
    _squareNumbers = []
    while (true) {
      _previousRowNumber = row(_squareNumber)
      _squareNumber += upFactors[i]
      _currentRowNumber = row(_squareNumber)
      if (squares[_squareNumber] === null || _squareNumber < 1 || _previousRowNumber === _currentRowNumber || _previousRowNumber - _currentRowNumber > 1) {
        break
      }
      if (squares[_squareNumber] === myColor) {
        _turnSquareNumbers = _turnSquareNumbers.concat(_squareNumbers)
        break
      }
      _squareNumbers.push(_squareNumber)
    }
  }

  // side
  for (let i = 0; i < sideFactors.length; i++) {
    _squareNumber = squareNumber;
    _squareNumbers = []
    while (true) {
      _previousRowNumber = row(_squareNumber)
      _squareNumber += sideFactors[i]
      _currentRowNumber = row(_squareNumber)
      if (squares[_squareNumber] === null || _squareNumber < 1 || _squareNumber > Math.pow(LINE_COUNT, 2) || _previousRowNumber !== _currentRowNumber) {
        break
      }
      if (squares[_squareNumber] === myColor) {
        _turnSquareNumbers = _turnSquareNumbers.concat(_squareNumbers);
        break
      }
      _squareNumbers.push(_squareNumber)
    }
  }

  // down
  for (let i = 0; i < downFactors.length; i++) {
    _squareNumber = squareNumber
    _squareNumbers = []
    while (true) {
      _previousRowNumber = row(_squareNumber)
      _squareNumber += downFactors[i]
      _currentRowNumber = row(_squareNumber)
      if (squares[_squareNumber] === null || _squareNumber > Math.pow(LINE_COUNT, 2) || _previousRowNumber === _currentRowNumber || _currentRowNumber - _previousRowNumber > 1) {
        break
      }
      if (squares[_squareNumber] === myColor) {
        _turnSquareNumbers = _turnSquareNumbers.concat(_squareNumbers)
        break
      }
      _squareNumbers.push(_squareNumber)
    }
  }

  return _turnSquareNumbers
}
