import * as actionTypes from '../constants/actionTypes'

export const onSquareClick = (number) => {
  console.log(number)
  console.log("action-square")
  return ({
    type: actionTypes.SQUARE,
    number
  })
}

export const onGuideClick = () => {
  console.log("action-guide")
  return ({
    type: actionTypes.GUIDE
  })
}
