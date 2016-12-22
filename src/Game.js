import React, { Component } from 'react';
import './Game.css';

const lineCount = 8;

const black = 'black';
const white =  'white';

const rowStrings = Array(30).fill(null).map((_, index) => { return index + 1; });
const columnStrings = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

function Square(props) {
  const name = props.value ? props.value : 'none';
  return (
    <button className="square" onClick={() => props.onClick()}>
      <span className={name}>●</span>
    </button>
  );
}

class Board extends Component {
  renderSquare(squareNumber) {
    return <Square key={"square-" + squareNumber} value={this.props.squares[squareNumber]} onClick={() => this.props.onClick(squareNumber)} />;
  }
  render() {
    let board = [];
    for (let row = 0; row < lineCount; row++) {
      let squares = [];
      for (let column = 0; column < lineCount; column++) {
        const squareNumber = row * lineCount + column + 1;
        squares.push(this.renderSquare(squareNumber));
      }
      board.push(<div key={"board-row-" + (row + 1)} className="board-row">{squares}</div>);
    }
    return (
      <div className="board">
        {board}
      </div>
    );
  }
}

class Game extends Component {
  constructor() {
    super();
    var squares = {};
    for (let i = 0; i < Math.pow(lineCount, 2); i++) {
      squares[i + 1] = null;
    }
    squares[28] = black;
    squares[29] = white;
    squares[36] = white;
    squares[37] = black;
    this.state = {
      squares: squares,
      squareNumbers: [0],
      historySquares: [squares]
    };
  }
  render() {
    let squares = this.state.squares;
    let squareNumbers = this.state.squareNumbers;
    let historySquares = this.state.historySquares;
    const step = squareNumbers.length - 1;

    let winner = null;

    if (isGameEnd(squares, squareNumbers)) {
      winner = calculateWinner(squares);
    } else {
      const _canPlace = Array(Math.pow(lineCount, 2)).fill(null).some((_, index) => {
        if (squares[index + 1]) {
          return false;
        }
        return this.canPlace(squares, index + 1, step + 1);
      });
      if (!_canPlace) {
        squareNumbers.push(0);
        historySquares.push(squares);
        // TODO: warning.js:36 Warning: setState(...): Cannot update during an existing state transition (such as within `render` or another component's constructor). Render methods should be a pure function of props and state; constructor side-effects are an anti-pattern, but can be moved to `componentWillMount`.
        this.setState({
          squares: squares,
          squareNumbers: squareNumbers,
          historySquares: historySquares
        });
      }
    }

    const moves = squareNumbers.map((squareNumber, index) => {
      let description = 'Game start';
      if (index > 0) {
        description = ((squareNumber > 0) ? 'Move' : 'Skip') + ': ' + (isBlackMove(index) ? '●' : '○');
      }
      return (
        <li key={index} value={index}>
          <a href="#" onClick={() => this.jumpTo(index)}>
            {description}
          </a>
          {squareNumber > 0 ? ' (' + squarePosition(squareNumber) + ') ' : ''}
        </li>
      );
    });

    let status = 'Next player: ' + (isBlackMove(step + 1) ? '● [1st]' : '○ [2nd]');
    if (winner) {
      status = winner;
    }

    return (
      <div className="Game">
        <div className="Game-board">
          <Board
            squares={squares}
            onClick={(squareNumber) => this.handleClick(squareNumber)}
          />
        </div>
        <div className="Game-info">
          <span>{status}</span>
          <div className="count">
            ● {countBlack(squares)} - {countWhite(squares)} ○
          </div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

  canPlace(squares, squareNumber, step) {
    return turnSquareNumbers(squares, squareNumber, step).length > 0;
  }

  handleClick(squareNumber) {
    let squares = this.state.squares;
    let squareNumbers = this.state.squareNumbers;
    let historySquares = this.state.historySquares;
    const step = squareNumbers.length; // at clicked
    if (squares[squareNumber] || !this.canPlace(squares, squareNumber, step)) {
      return;
    }
    squares[squareNumber] = color(step);
    squares = turnSquare(squares, squareNumber, step);
    squareNumbers.push(squareNumber);
    historySquares.push(squares);
    this.setState({
      squares: squares,
      squareNumbers: squareNumbers,
      historySquares: historySquares
    });
  }

  jumpTo(step) {
    let squares = this.state.squares;
    let squareNumbers = this.state.squareNumbers;
    let historySquares = this.state.historySquares;
    for (let i = squareNumbers.length - 1; i > step; i--) {
      squares[squareNumbers[i]] = null;
    }
    this.setState({
      squares: historySquares[step],
      squareNumbers: squareNumbers.slice(0, step + 1),
      historySquares: historySquares.slice(0, step + 1)
    });
  }
}

function isBlackMove(step) {
  if (step === 0) {
    return null;
  }
  return (step % 2) ? true : false;
}

function color(step) {
  return isBlackMove(step) ? black : white;
}

function countBlack(squares) {
  let count = 0;
  for (let key in squares) {
    if (squares[key] === black) {
      count++;
    }
  }
  return count;
}

function countWhite(squares) {
  let count = 0;
  for (let key in squares) {
    if (squares[key] === white) {
      count++;
    }
  }
  return count;
}

function rowsNumber(squareNumber) {
  return Math.ceil(squareNumber / lineCount);
}

function columnNumber(squareNumber) {
  return (squareNumber - 1) % lineCount + 1;
}

function squarePosition(squareNumber) {
  return rowStrings[rowsNumber(squareNumber) - 1] + ', ' + columnStrings[columnNumber(squareNumber) - 1];
}

function turnSquareNumbers(squares, squareNumber, step) {
  const myColor = color(step);
  const upFactors = [0 - lineCount - 1, 0 - lineCount, 0 - lineCount + 1];
  const sideFactors = [0 - 1, 0 + 1];
  const downFactors = [lineCount - 1, lineCount, lineCount + 1];

  let _turnSquareNumbers = [];
  let _squareNumber;
  let _squareNumbers = [];
  let _previousRowNumber;
  let _currentRowNumber;

  // up
  for (let i = 0; i < upFactors.length; i++) {
    _squareNumber = squareNumber;
    _squareNumbers = [];
    while (true) {
      _previousRowNumber = rowsNumber(_squareNumber);
      _squareNumber += upFactors[i];
      _currentRowNumber = rowsNumber(_squareNumber);
      if (squares[_squareNumber] === null || _squareNumber < 1 || _previousRowNumber === _currentRowNumber || _previousRowNumber - _currentRowNumber > 1) {
        break;
      }
      if (squares[_squareNumber] === myColor) {
        _turnSquareNumbers = _turnSquareNumbers.concat(_squareNumbers);
        break;
      }
      _squareNumbers.push(_squareNumber);
    }
  }

  // side
  for (let i = 0; i < sideFactors.length; i++) {
    _squareNumber = squareNumber;
    _squareNumbers = [];
    while (true) {
      _previousRowNumber = rowsNumber(_squareNumber);
      _squareNumber += sideFactors[i];
      _currentRowNumber = rowsNumber(_squareNumber);
      if (squares[_squareNumber] === null || _squareNumber < 1 || _squareNumber > Math.pow(lineCount, 2) || _previousRowNumber !== _currentRowNumber) {
        break;
      }
      if (squares[_squareNumber] === myColor) {
        _turnSquareNumbers = _turnSquareNumbers.concat(_squareNumbers);
        break;
      }
      _squareNumbers.push(_squareNumber);
    }
  }

  // down
  for (let i = 0; i < downFactors.length; i++) {
    _squareNumber = squareNumber;
    _squareNumbers = [];
    while (true) {
      _previousRowNumber = rowsNumber(_squareNumber);
      _squareNumber += downFactors[i];
      _currentRowNumber = rowsNumber(_squareNumber);
      if (squares[_squareNumber] === null || _squareNumber > Math.pow(lineCount, 2) || _previousRowNumber === _currentRowNumber || _currentRowNumber - _previousRowNumber > 1) {
        break;
      }
      if (squares[_squareNumber] === myColor) {
        _turnSquareNumbers = _turnSquareNumbers.concat(_squareNumbers);
        break;
      }
      _squareNumbers.push(_squareNumber);
    }
  }

  return _turnSquareNumbers;
}

function turnSquare(squares, squareNumber, step) {
  const myColor = color(step);
  const _turnSquareNumbers = turnSquareNumbers(squares, squareNumber, step);
  for (let i = 0; i < _turnSquareNumbers.length; i++) {
    squares[_turnSquareNumbers[i]] = myColor;
  }
  return squares;
}

function isGameEnd(squares, squareNumbers) {
  let _isGameEnd = true;
  if (squareNumbers[squareNumbers.length - 1] !== 0 || squareNumbers[squareNumbers.length - 2] !== 0) {
    for (let key in squares) {
      if (squares[key] === null) {
        _isGameEnd = false;
        break;
      }
    }
  }
  return _isGameEnd;
}

function calculateWinner(squares) {
  const blackCount = countBlack(squares);
  const whiteCount = countWhite(squares);
  if (blackCount > whiteCount) {
    return 'Winner: ' + black + ' !!';
  } else if (blackCount < whiteCount) {
    return 'Winner: ' + white + ' !!';
  } else {
    return 'Draw....';
  }
}

export default Game;
