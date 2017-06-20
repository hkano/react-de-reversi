import React from 'react'
import { toFirstUpperCase } from '../libs/utils'

const ComputerButton = ({ value, color, onClick }) => {
  const className = 'computer-button ' + (value ? 'button-on' : 'button-off')
  return (
    <button className={ className } onClick={ onClick }>
      { toFirstUpperCase(color) }: {value ? "Com" : "User" }
    </button>
  )
}

export default ComputerButton
