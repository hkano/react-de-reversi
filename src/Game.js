import React, { Component } from 'react';
import './Game.css';

const lineCount = 8;

const black = 'black';
const white =  'white'

const rowStrings = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
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
    const squares = this.state.squares;
    const squareNumbers = this.state.squareNumbers;
    const step = squareNumbers.length - 1;
    const winner = calculateWinner(squares);
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
          {squareNumber > 0 ? '(' + squarePosition(squareNumber) + ')' : ''}
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
            ● : {countBlack(squares)} vs ○ : {countWhite(squares)}
          </div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

  handleClick(squareNumber) {
    let squares = this.state.squares;
    let squareNumbers = this.state.squareNumbers;
    let historySquares = this.state.historySquares;
    const step = squareNumbers.length; // at clicked
    if (calculateWinner(squares) || squares[squareNumber]) {
      return;
    }
    squares[squareNumber] = isBlackMove(step) ? black : white;
    squareNumbers.push(squareNumber);
    historySquares.push(squares)
    this.setState({
      squares: squares,
      squareNumbers: squareNumbers,
      historySquares: historySquares
    });
  }

  isPlaceable(squareNumber, squares) {

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
  return squareNumber % lineCount;
}

function squarePosition(squareNumber) {
  return rowStrings[rowsNumber(squareNumber) - 1] + ', ' + columnStrings[columnNumber(squareNumber) - 1];
}

function turnSquare(squares, squareNumber, step) {
  const myColor = isBlackMove(step) ? black : white;
  const otherColor = isBlackMove(step + 1) ? black : white;

  var _squareNumber = squareNumber;
  var _squareNumbers = [];

  const upRowFactors = [0 - lineCount - 1, 0 - lineCount, 0 - lineCount + 1];
  const sameRowFactors = [-1, 1];
  const downRowFactors = [lineCount - 1, lineCount, lineCount + 1];

  // up row
  while (true) {
    for (let i = 0; i < upRowFactors.length; i++) {
      var previousRowNumber = rowsNumber(_squareNumber);
      _squareNumber = _squareNumber + upRowFactors[i];
      var currentRowNumber = rowsNumber(_squareNumber);
      if (squares[_squareNumber] === myColor) {
        for (let j = 0; j < _squareNumbers.length; j++) {
          squares[_squareNumbers[j]] = myColor;
        }
        break;
      }
      _squareNumbers.push(_squareNumber);
      if (squares[_squareNumber] === null || _squareNumber <= 0 || previousRowNumber === currentRowNumber || previousRowNumber - currentRowNumber > 1) {
        break;
      }
    }
  }

  // same row
//
//  - lineCount
//  - lineCount + 1
//  - 1
//  + 1
//  + lineCount - 1
//  + lineCount
//  + lineCount + 1

  // down row


  return squares;
}

function calculateWinner(squares) {
  const blackCount = countBlack(squares);
  const whiteCount = countWhite(squares);

  for (let key in squares) {
    if (squares[key] === null) {
      return null;
    }
  }

  if (blackCount > whiteCount) {
    return 'Winner: ' + black + '!!';
  } else if (blackCount < whiteCount) {
    return 'Winner: ' + white + '!!';
  } else {
    return 'Draw....';
  }
}

export default Game;
