import * as actionTypes from '../constants/actionTypes'
import { BLACK, WHITE } from '../constants/discColors'

const initialGuideState = {
  black: false,
  white: false,
}

const computer = ( state = initialGuideState, action ) => {
  if (action.type !== actionTypes.COMPUTER) {
    return state
  }

  return {
    ...state,
    black: action.color === BLACK ? !state.black : state.black,
    white: action.color === WHITE ? !state.white : state.white,
  }
}

export default computer
