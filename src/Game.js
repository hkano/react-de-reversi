import React, { Component } from 'react';
import $ from 'jquery';
import './Game.css';

const lineCount = 8;

const black = 'black';
const white =  'white';

const rowStrings = Array(30).fill(null).map((_, index) => { return index + 1; });
const columnStrings = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

function GuideButton(props) {
  const name = props.value ? 'off' : 'on';
  return (
    <button className="guide-button" onClick={() => props.onClick()}>
      Guide: {name}
    </button>
  );
}

function BlackComputerButton(props) {
  const name = props.value ? 'user' : 'com';
  return (
    <button className="black-computer-button" onClick={() => props.onClick()}>
      Black: {name}
    </button>
  );
}

function WhiteComputerButton(props) {
  const name = props.value ? 'user' : 'com';
  return (
    <button className="white-computer-button" onClick={() => props.onClick()}>
      White: {name}
    </button>
  );
}

function Square(props) {
  const name = props.value ? props.value : 'none';
  const displayGuide = props.displayGuide;
  let className = 'square';
  if (displayGuide) {
    className += ' ' + (props.canPlace ? 'square-o' : 'square-x');
  }
  return (
    <button className={className} onClick={() => props.onClick()}>
      <span className={name}>●</span>
    </button>
  );
}

class Menu extends Component {
  render() {
    const displayGuide = this.props.displayGuide;
    const isBlackComputer = this.props.isBlackComputer;
    const isWhiteComputer = this.props.isWhiteComputer;
    return (
      <div className="menu">
        <GuideButton
          value={displayGuide}
          onClick={() => this.props.onClickGuideButton()}
        />
        <BlackComputerButton
          value={isBlackComputer}
          onClick={() => this.props.onClickBlackComputerButton()}
        />
        <WhiteComputerButton
          value={isWhiteComputer}
          onClick={() => this.props.onClickWhiteComputerButton()}
        />
      </div>
    );
  }
}

class Board extends Component {
  renderSquare(squareNumber, canPlace, displayGuide) {
    return <Square
      key={"square-" + squareNumber}
      value={this.props.squares[squareNumber]}
      canPlace={canPlace}
      displayGuide={displayGuide}
      onClick={() => this.props.onClick(squareNumber)}
    />;
  }

  render() {
    const squares = this.props.squares;
    const step = this.props.step;
    const displayGuide = this.props.displayGuide;

    let boardBody = [];
    let boardRowNumbers = [];
    let boardColumnNumbers = [];

    for (let row = 0; row < lineCount; row++) {
      boardRowNumbers.push(<div key={"board-row-number-" + (row + 1)} className="row-number">{rowStrings[row]}</div>);
    }
    for (let column = 0; column < lineCount; column++) {
      boardColumnNumbers.push(<div key={"board-column-number-" + (column + 1)} className="column-number">{columnStrings[column]}</div>);
    }
    for (let row = 0; row < lineCount; row++) {
      let rowSquares = [];
      for (let column = 0; column < lineCount; column++) {
        const squareNumber = row * lineCount + column + 1;
        rowSquares.push(this.renderSquare(squareNumber, canPlace(squares, squareNumber, step + 1), displayGuide));
      }
      boardBody.push(<div key={"board-body-row-" + (row + 1)} className="body-row">{rowSquares}</div>);
    }
    return (
      <div className="board">
        <div className="column-numbers">
          {boardColumnNumbers}
        </div>
        <div className="row-numbers">
          {boardRowNumbers}
        </div>
        <div className="body">
          {boardBody}
        </div>
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
      historySquares: [Object.assign({}, squares)],
      displayGuide: false,
      isBlackComputer: false,
      isWhiteComputer: false
    };
  }

  render() {
    let squares = this.state.squares;
    let squareNumbers = this.state.squareNumbers;
    let step = squareNumbers.length - 1;
    let winner = null;

    const displayGuide = this.state.displayGuide;
    const isBlackComputer = this.state.isBlackComputer;
    const isWhiteComputer = this.state.isWhiteComputer;

    if (isGameEnd(squares, squareNumbers)) {
      winner = calculateWinner(squares);
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
            step={step}
            displayGuide={displayGuide}
            onClick={(squareNumber) => this.handleClick(squareNumber)}
          />
          <div className="Game-menu">
            <Menu
              displayGuide={displayGuide}
              onClickGuideButton={() => this.displayGuide()}
              isBlackComputer={isBlackComputer}
              onClickBlackComputerButton={() => this.blackComputer()}
              isWhiteComputer={isWhiteComputer}
              onClickWhiteComputerButton={() => this.whiteComputer()}
            />
          </div>
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

  componentDidUpdate(prevProps, prevState) {
    $('.Game-info ol').scrollTop(9999);
  }

  handleClick(squareNumber) {
    let squares = this.state.squares;
    let squareNumbers = this.state.squareNumbers;
    let historySquares = this.state.historySquares;
    const step = squareNumbers.length; // at clicked
    if (squares[squareNumber] || !canPlace(squares, squareNumber, step)) {
      return;
    }

    const isBlackComputer = this.state.isBlackComputer;
    const isWhiteComputer = this.state.isWhiteComputer;

    squares[squareNumber] = color(step);
    squares = turnSquare(squares, squareNumber, step);
    squareNumbers.push(squareNumber);
    historySquares.push(Object.assign({}, squares));

    // skip and computer
    for (let i = 1; i <= 2; i++) {
      if (canPlaceAny(squares, step + i) || isGameEnd(squares, squareNumbers)) {
        if (color(step + i) === 'black' && isBlackComputer) {
          squareNumber = shuffle(squareNumbersOfPlaceable(squares, step + i))[0];
          squares[squareNumber] = color(step + i);
          squares = turnSquare(squares, squareNumber, step + i);
          squareNumbers.push(squareNumber);
          historySquares.push(Object.assign({}, squares));
        }
        if (color(step + i) === 'white' && isWhiteComputer) {
          squareNumber = shuffle(squareNumbersOfPlaceable(squares, step + i))[0];
          squares[squareNumber] = color(step + i);
          squares = turnSquare(squares, squareNumber, step + i);
          squareNumbers.push(squareNumber);
          historySquares.push(Object.assign({}, squares));
        }
      } else {
        squareNumbers.push(0);
        historySquares.push(Object.assign({}, squares));
      }
    }

    this.setState({
      squares: squares,
      squareNumbers: squareNumbers,
      historySquares: historySquares
    });
  }

  displayGuide() {
    const displayGuide = this.state.displayGuide;
    this.setState({
      displayGuide: !displayGuide
    });
  }

  blackComputer() {
    const isBlackComputer = this.state.isBlackComputer;
    this.setState({
      isBlackComputer: !isBlackComputer
    });
  }

  whiteComputer() {
    const isWhiteComputer = this.state.isWhiteComputer;
    this.setState({
      isWhiteComputer: !isWhiteComputer
    });
  }

  jumpTo(step) {
    let squares;
    let squareNumbers = this.state.squareNumbers;
    let historySquares = this.state.historySquares;

    squares = Object.assign({}, historySquares[step]);
    squareNumbers = squareNumbers.slice(0, step + 1);
    historySquares = historySquares.slice(0, step + 1);

    // skip
    for (let i = 1; i <= 2; i++) {
      if (canPlaceAny(squares, step + i) || isGameEnd(squares, squareNumbers)) {
        break;
      } else {
        squareNumbers.push(0);
        historySquares.push(Object.assign({}, squares));
      }
    }

    this.setState({
      squares: squares,
      squareNumbers: squareNumbers,
      historySquares: historySquares
    });
  }

}

function shuffle(array) {
  let num = array.length;
  let temp;
  let i;
  while (num) {
    i = Math.floor(Math.random() * num--);
    temp = array[num];
    array[num] = array[i];
    array[i] = temp;
  }
  return array;
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

function canPlace(squares, squareNumber, step) {
  if (squares[squareNumber] !== null) {
    return false;
  }
  return turnSquareNumbers(squares, squareNumber, step).length > 0;
}

function canPlaceAny(squares, step) {
  return Array(Math.pow(lineCount, 2)).fill(null).some((_, index) => {
    if (squares[index + 1]) {
      return false;
    }
    return canPlace(squares, index + 1, step);
  });
}

function squareNumbersOfPlaceable(squares, step) {
  let squareNumbers = [];
  for (let i = 1; i <= Math.pow(lineCount, 2); i++) {
    if (!squares[i + 1]) {
      if (canPlace(squares, i, step)) {
        squareNumbers.push(i);
      }
    }
  }
  return squareNumbers;
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

function isFilled(squares) {
  return Array(Math.pow(lineCount, 2)).fill(null).every((_, index) => {
    return squares[index + 1] !== null;
  });
}

function isGameEnd(squares, squareNumbers) {
  if (squareNumbers[squareNumbers.length - 1] === 0 && squareNumbers[squareNumbers.length - 2] === 0) {
    return true;
  }
  return isFilled(squares);
}

function calculateWinner(squares) {
  const blackCount = countBlack(squares);
  const whiteCount = countWhite(squares);
  if (blackCount > whiteCount) {
    return 'Winner: ' + black.toUpperCase() + ' !!';
  } else if (blackCount < whiteCount) {
    return 'Winner: ' + white.toUpperCase() + ' !!';
  } else {
    return 'Draw....';
  }
}

export default Game;
