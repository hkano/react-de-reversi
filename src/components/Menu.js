import React, { PropTypes } from 'react'
import GuideButton from './GuideButton'

const Menu = ({ displayGuide, onClick }) => {
  return (
    <div className="menu">
      <GuideButton
        value={ displayGuide }
        onClick={ onClick }
      />
    </div>
  )
}

Menu.propTypes = {
//  displayGuide: PropTypes.string.isRequired,
//  onClick: PropTypes.func.isRequired
}

export default Menu
