import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../actions'

import * as gameModel from '../models/game'
import * as squareModel from '../models/square'

import TitleBar from '../components/TitleBar'
import Board from '../components/Board'
import Menu from '../components/Menu'

// import $ from 'jquery'

class ReactDeReversi extends Component {
  render() {
    const { squares, guide } = this.props

    const step = squares.squareNumbers.length
    let winner = null
    if (gameModel.isGameEnd(squares.squares, squares.squareNumbers)) {
      winner = gameModel.calculateWinner(squares.squares)
    }
    let status = (step, winner) => {
      if (winner) {
        return winner
      }
      return (
        <div>
          {'Next player: '}
          <span className={ gameModel.color(step) }></span>
          [{gameModel.isBlackMove(step) ? '1st' : '2nd'}]
        </div>
      )
    }

    const moves = squares.squareNumbers.map((squareNumber, index) => {
      const description = (squareNumber, index) => {
        if (index > 0) {
          return (
            <div>
              {(squareNumber > 0) ? 'Move: ' : 'Skip: '}
              <span className={(gameModel.color(index))}></span>
            </div>
          )
        }
        return 'Game start'
      }

      return (
        <li key={index} value={index}>
          <a href="#" onClick={() => this.jumpTo(index)}>
            {description(squareNumber, index)}
          </a>
          {squareNumber > 0 ? ' (' + squareModel.position(squareNumber) + ') ' : ''}
        </li>
      )
    })

    return (
      <div className="ReactDeReversi">
        <div className="title">
          <TitleBar />
        </div>
        <div className="game">
          <div className="game-board">
            <Board
              squares={ squares.squares }
              step={ step }
              displayGuide={ guide.displayGuide }
              onClick={ (squareNumber) => actions.onSquareClick(squareNumber) }
            />
            <div className="game-menu">
              <Menu
                displayGuide={ guide.displayGuide }
                onClick={ () => actions.onGuideClick() }
              />
            </div>
          </div>
          <div className="game-info">
            <span>{ status(step, winner) }</span>
            <div className="count">
              <span className="black"></span> { gameModel.countBlack(squares.squares) } - { gameModel.countWhite(squares.squares) } <span className="white"></span>
            </div>
            <ol>{moves}</ol>
          </div>
        </div>
      </div>
    )
  }

  // componentDidUpdate(prevProps, prevState) {
  //   $('.Game-info ol').scrollTop(9999);
  // }

  displayGuide() {
    const displayGuide = this.state.displayGuide;
    this.setState({
      displayGuide: !displayGuide
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
      if (squareModel.canPlaceAny(squares.squares, step + i) || gameModel.isGameEnd(squares.squares, squares.squareNumbers)) {
        break;
      } else {
        squares.squareNumbers.push(0);
        squares.historySquares.push(Object.assign({}, squares));
      }
    }

    this.setState({
      squares: squares,
      squareNumbers: squareNumbers,
      historySquares: historySquares
    });
  }

}

var mapStateToProps = (state, ownProps) => {
  console.log(state)

  return ({
    squares: state.squares,
    guide: state.guide,
  })
}

var mapDispatch = (dispatch) => {
  console.log(dispatch)

  return ({
    actions: bindActionCreators(actions, dispatch)
  })
}

export default connect(mapStateToProps, mapDispatch)(ReactDeReversi)
