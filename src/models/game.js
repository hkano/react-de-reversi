import { LINE_COUNT } from '../constants/configurations'
import { BLACK, WHITE } from '../constants/discColors'

/**
 * public
 */

export function color(step) {
  return isBlackMove(step) ? BLACK : WHITE
}

export function countBlack(squares) {
  let count = 0
  for (let i in squares) {
    if (squares[i] === BLACK) {
      count++
    }
  }
  return count
}

export function countWhite(squares) {
  let count = 0
  for (let i in squares) {
    if (squares[i] === WHITE) {
      count++
    }
  }
  return count
}

export function isBlackMove(step) {
  if (step === 0) {
    return null
  }
  return !!(step % 2)
}

export function isGameEnd(squares, numbers) {
  if (numbers[numbers.length - 1] === 0 && numbers[numbers.length - 2] === 0) {
    return true
  }
  return isFilled(squares)
}

export function calculateWinner(squares) {
  const blackCount = countBlack(squares)
  const whiteCount = countWhite(squares)
  if (blackCount > whiteCount) {
    return 'Winner: ' + BLACK.toUpperCase() + ' !!'
  } else if (blackCount < whiteCount) {
    return 'Winner: ' + WHITE.toUpperCase() + ' !!'
  } else {
    return 'Draw....'
  }
}

/**
 * private
 */

function isFilled(squares) {
  return Array(Math.pow(LINE_COUNT, 2)).fill(null).every((_, index) => {
    return squares[index + 1] !== null
  })
}
