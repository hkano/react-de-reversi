import './sanitize.min.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Game from './Game';

ReactDOM.render(
  <App />,
  document.getElementById('react-app')
);

ReactDOM.render(
  <Game />,
  document.getElementById('react-game')
);
