import { combineReducers } from 'redux'
import squares from './squares.js'
import guide from './guide.js'

const reducer = combineReducers({
  squares,
  guide
})

export default reducer
