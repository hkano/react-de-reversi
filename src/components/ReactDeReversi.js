import React, { Component } from 'react'

import TitleBar from '../components/TitleBar'
import Board from '../components/Board'
import Menu from '../components/Menu'
import Info from '../components/Info'

import $ from 'jquery'

class ReactDeReversi extends Component {
  render() {
    const { squares, guide, actions } = this.props
    const currentSquares = squares.histories[squares.histories.length - 1]
    const step = squares.numbers.length
    return (
      <div className="ReactDeReversi">
        <div className="title">
          <TitleBar />
        </div>
        <div className="game">
          <div className="game-board">
            <Board
              squares={ currentSquares }
              step={ step }
              displayGuide={ guide.displayGuide }
              onClick={ (number) => actions.onSquareClick(number) }
            />
            <div className="game-menu">
              <Menu
                displayGuide={ guide.displayGuide }
                onClick={ () => actions.onGuideClick() }
              />
            </div>
          </div>
          <div className="game-info">
            <Info
              squares={ currentSquares }
              numbers={ squares.numbers }
              onClick={ (step) => actions.onMoveClick(step) }
            />
          </div>
        </div>
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    $('.game .game-info .info .moves ol').scrollTop(9999)
  }
}

export default ReactDeReversi
