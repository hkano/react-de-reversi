import React, { Component } from 'react';
import './Game.css';

const lineCount = 8;

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
    squares[28] = 'black';
    squares[29] = 'white';
    squares[36] = 'white';
    squares[37] = 'black';
    this.state = {
      squares: squares,
      squareNumbers: [0]
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
          {/*
          <a href="#" onClick={() => this.jumpTo(index)}>
            {description}
          </a>
          */}
          {description}
          {squareNumber > 0 ? '(' + squarePosition(squareNumber) + ')' : ''}
        </li>
      );
    });

    let status = 'Next player: ' + (isBlackMove(step + 1) ? '● [1st]' : '○ [2nd]');
    if (winner) {
      status = 'Winner: ' + winner + '!!';
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
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

  handleClick(squareNumber) {
    let squares = this.state.squares;
    let squareNumbers = this.state.squareNumbers;
    const step = squareNumbers.length; // at clicked
    if (calculateWinner(squares) || squares[squareNumber]) {
      return;
    }
    squares[squareNumber] = isBlackMove(step) ? 'black' : 'white';
    squareNumbers.push(squareNumber);
    this.setState({
      squares: squares,
      squareNumbers: squareNumbers
    });
  }

  isPlaceable(squareNumber, squares) {

  }

  // FIXME: not implemented
  jumpTo(step) {
    let squares = this.state.squares;
    let squareNumbers = this.state.squareNumbers;
    for (let i = squareNumbers.length - 1; i > step; i--) {
      squares[squareNumbers[i]] = null;
    }
    this.setState({
      squares: squares,
      squareNumbers: squareNumbers.slice(0, step + 1)
    });
  }
}

function isBlackMove(step) {
  if (step === 0) {
    return null;
  }
  return (step % 2) ? true : false;
}

function squarePosition(squareNumber) {
  return rowStrings[Math.floor((squareNumber - 1) / lineCount)] + ', ' + columnStrings[(squareNumber - 1) % lineCount];
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
