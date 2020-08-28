import React from 'react'
import { Link } from 'react-router-dom'
import './style.scss'

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <p className="geoTitle">geoHoop</p>
      </Link>
    </div>
  )
}

export default Header
