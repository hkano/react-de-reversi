import * as actionTypes from '../constants/actionTypes'

const initialGuideState = {
  displayGuide: false
}

const guide = ( state = initialGuideState, action ) => {
  if (action.type !== actionTypes.GUIDE) {
    return state
  }

  return {
    ...state,
    displayGuide: action.value
  }
}

export default guide
