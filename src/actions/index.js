import * as actionTypes from '../constants/actionTypes'

export const onSquareClick = (number) => {
  return ({
    type: actionTypes.SQUARE,
    number
  })
}

export const onGuideClick = () => {
  return ({
    type: actionTypes.GUIDE
  })
}

export const onComputerClick = (color) => {
  return ({
    type: actionTypes.COMPUTER,
    color
  })
}

export const onMoveClick = (step) => {
  return ({
    type: actionTypes.MOVE,
    step
  })
}
