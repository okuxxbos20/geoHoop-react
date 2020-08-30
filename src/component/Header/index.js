import React from 'react'
import { Link } from 'react-router-dom'
import './style.scss'

function Header(props) {
  const style = {
    header: {
      background: props.background
    },
    geoTitle: {
      color: props.color
    }
  }
  const pushLogin = () => {
    // ここにログイン処理を書く
    alert('yo')
  }
  return (
    <div className="header" style={style.header}>
      <Link to="/">
        <p className="geo-title" style={style.geoTitle}>geoHoop</p>
      </Link>
      <p className="login" onClick={() => {pushLogin()}}>Login</p>
    </div>
  )
}

export default Header
