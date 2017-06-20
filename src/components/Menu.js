import React from 'react'
import { BLACK, WHITE } from '../constants/discColors'
import GuideButton from './GuideButton'
import ComputerButton from './ComputerButton'

const Menu = ({ displayGuide, blackComputer, whiteComputer, onGuideClick, onComputerClick }) => (
  <div className="menu">
    <GuideButton
      value={ displayGuide }
      onClick={ onGuideClick }
    />
    <ComputerButton
      value={ blackComputer }
      color={ BLACK }
      onClick={ () => onComputerClick(BLACK) }
    />
    <ComputerButton
      value={ whiteComputer }
      color={ WHITE }
      onClick={ () => onComputerClick(WHITE) }
    />
  </div>
)

export default Menu
