import React from 'react'
import logo from '../../public/assets/images/react-de-reversi.png'

const TitleBar = () => {
  return (
    <div className="title-bar">
      <img src={logo} className="logo" alt="logo" />
      <h2>Welcome to React de Reversi</h2>
    </div>
  )
}

export default TitleBar
