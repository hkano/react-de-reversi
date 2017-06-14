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
