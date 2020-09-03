import React from 'react'
import { Link } from 'react-router-dom'
import './style.scss'

const Header = (props) => {
  const style = {
    header: {
      background: props.background
    },
    geoTitle: {
      color: props.color
    },
    login: {
      color: props.color
    }
  }
  return (
    <div className="header" style={style.header}>
      <Link to="/">
        <p className="geo-title" style={style.geoTitle}>geoHoop</p>
      </Link>
      <p
        className="login"
        style={style.login}
        onClick={() => {props.setDialog()}}
      >
        Login
      </p>
    </div>
  )
}

export default Header
