import { LINE_COUNT } from '../constants/configurations'
import { ROW_STRINGS, COLUMN_STRINGS } from '../constants/stgings'

import * as gameModel from '../models/game'

/**
 * public
 */

export function position(number) {
  return ROW_STRINGS[row(number) - 1] + ', ' + COLUMN_STRINGS[column(number) - 1]
}

export function canPlace(squares, number, step) {
  if (squares[number] !== null) {
    return false
  }
  return turnNumbers(squares, number, step).length > 0
}

export function canPlaceAny(squares, step) {
  return Array(Math.pow(LINE_COUNT, 2)).fill(null).some((_, index) => {
    if (squares[index + 1]) {
      return false
    }
    return canPlace(squares, index + 1, step)
  })
}

export function turnSquare(squares, number, step) {
  const myColor = gameModel.color(step)
  const _turnNumbers = turnNumbers(squares, number, step)
  for (let i in _turnNumbers) {
    if (_turnNumbers.hasOwnProperty(i)) {
      squares[_turnNumbers[i]] = myColor
    }
  }
  return squares
}

/**
 * private
 */

function row(number) {
  return Math.ceil(number / LINE_COUNT)
}

function column(number) {
  return (number - 1) % LINE_COUNT + 1
}

function turnNumbers(squares, number, step) {
  const myColor = gameModel.color(step)
  const upFactors = [0 - LINE_COUNT - 1, 0 - LINE_COUNT, 0 - LINE_COUNT + 1]
  const sideFactors = [0 - 1, 0 + 1]
  const downFactors = [LINE_COUNT - 1, LINE_COUNT, LINE_COUNT + 1]

  let _turnNumbers = []
  let _number
  let _numbers
  let _previousRowNumber
  let _currentRowNumber

  // up
  for (let i in upFactors) {
    if (!upFactors.hasOwnProperty(i)) {
      continue
    }
    _number = number
    _numbers = []
    while (true) {
      _previousRowNumber = row(_number)
      _number += upFactors[i]
      _currentRowNumber = row(_number)
      if (squares[_number] === null || _number < 1 || _previousRowNumber === _currentRowNumber || _previousRowNumber - _currentRowNumber > 1) {
        break
      }
      if (squares[_number] === myColor) {
        _turnNumbers = _turnNumbers.concat(_numbers)
        break
      }
      _numbers.push(_number)
    }
  }

  // side
  for (let i in sideFactors) {
    if (!sideFactors.hasOwnProperty(i)) {
      continue
    }
    _number = number
    _numbers = []
    while (true) {
      _previousRowNumber = row(_number)
      _number += sideFactors[i]
      _currentRowNumber = row(_number)
      if (squares[_number] === null || _number < 1 || _number > Math.pow(LINE_COUNT, 2) || _previousRowNumber !== _currentRowNumber) {
        break
      }
      if (squares[_number] === myColor) {
        _turnNumbers = _turnNumbers.concat(_numbers)
        break
      }
      _numbers.push(_number)
    }
  }

  // down
  for (let i in downFactors) {
    if (!downFactors.hasOwnProperty(i)) {
      continue
    }
    _number = number
    _numbers = []
    while (true) {
      _previousRowNumber = row(_number)
      _number += downFactors[i]
      _currentRowNumber = row(_number)
      if (squares[_number] === null || _number > Math.pow(LINE_COUNT, 2) || _previousRowNumber === _currentRowNumber || _currentRowNumber - _previousRowNumber > 1) {
        break
      }
      if (squares[_number] === myColor) {
        _turnNumbers = _turnNumbers.concat(_numbers)
        break
      }
      _numbers.push(_number)
    }
  }

  return _turnNumbers
}
