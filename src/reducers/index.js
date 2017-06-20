import { combineReducers } from 'redux'
import squares from './squares.js'
import guide from './guide.js'
import computer from './computer.js'

const reducer = combineReducers({
  squares,
  guide,
  computer,
})

export default reducer
