import './assets/stylesheets/sanitize.min.css'
import './assets/stylesheets/index.css'
import './assets/stylesheets/ReactDeReversi.css'

import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import ReactDeReversiContainer from './containers/ReactDeReversiContainer'
import reducer from './reducers'

let store = createStore(reducer)

render(
  <Provider store={ store }>
     <ReactDeReversiContainer />
  </Provider>,
  document.getElementById('react-de-reversi')
)
