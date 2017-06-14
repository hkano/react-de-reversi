import React from 'react'

const GuideButton = ({ value, onClick }) => {
  const className = 'guide-button ' + (value ? 'guide-button-on' : 'guide-button-off')
  return (
    <button className={ className } onClick={ onClick }>
      Guide: {value ? "On" : "Off" }
    </button>
  )
}

export default GuideButton
