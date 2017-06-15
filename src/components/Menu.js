import React from 'react'
import GuideButton from './GuideButton'

const Menu = ({ displayGuide, onClick }) => (
  <div className="menu">
    <GuideButton
      value={ displayGuide }
      onClick={ onClick }
    />
  </div>
)

export default Menu
