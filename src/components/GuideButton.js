import React, { PropTypes } from 'react'

const GuideButton = ({ value, onClick }) => {
  return (
    <button className="guide-button" onClick={ onClick }>
      Guide: {value ? "On" : "Off" }
    </button>
  )
}

GuideButton.PropTypes = {
//  value: PropTypes.string.isRequired,
//  onClick: PropTypes.func.isRequired
}

export default GuideButton
