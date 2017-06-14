import '../public/assets/stylesheets/sanitize.min.css'
import '../public/assets/stylesheets/index.css'
import '../public/assets/stylesheets/ReactDeReversi.css'

import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import ReactDeReversi from './containers/ReactDeReversi'
import reducer from './reducers'

import { composeWithDevTools } from 'redux-devtools-extension'

let store = createStore(reducer, composeWithDevTools())

render(
  <Provider store={ store }>
     <ReactDeReversi />
  </Provider>,
  document.getElementById('react-de-reversi')
)
