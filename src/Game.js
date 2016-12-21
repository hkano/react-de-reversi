import React, { Component } from 'react';
import './Game.css';

function Square(props) {
  const name = props.value ? props.value : 'none';
  return (
    <button className="square" onClick={() => props.onClick()}>
      <span className={name}>●</span>
    </button>
  );
}

class Board extends Component {
  renderSquare(i) {
    return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
  }
  render() {
    var board = [];
    for (var row = 0; row < 8; row++) {
      var squares = [];
      for (var column = 0; column < 8; column++) {
        squares.push(this.renderSquare(row * 8 + column));
      }
      board.push(<div className="board-row">{squares}</div>);
    }
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board">{board}</div>
      </div>
    );
  }
}

class Game extends Component {
  constructor() {
    super();
    var squares = Array(64).fill(null);
    squares[27] = 'black';
    squares[28] = 'white';
    squares[35] = 'white';
    squares[36] = 'black';
    this.state = {
      history: [{
        squares: squares,
        values: Array(0)
      }],
      stepNumber: 0,
      blackIsNext: true
    };
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ? 'Move #' + move : 'Game start';
      const value = move ? '(' + current.values[move - 1] + ')' : '';
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
          {value}
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.blackIsNext ? '● [先手]' : '○ [後手]');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <span>{status}</span>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
  handleClick(i) {
    var history = this.state.history.slice(0, this.state.stepNumber + 1);
    var current = history[history.length - 1];
    const squares = current.squares.slice();
    const values = current.values.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.blackIsNext ? 'black' : 'white';
    values[this.state.stepNumber] = i + 1;
    this.setState({
      history: history.concat([{
        squares: squares,
        values: values
      }]),
      stepNumber: history.length,
      blackIsNext: !this.state.blackIsNext
    });
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      blackIsNext: (step % 2) ? false : true,
    });
  }
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
