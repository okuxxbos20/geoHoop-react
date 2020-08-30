import React from 'react'
import { Link } from 'react-router-dom'
import './style.scss'

function DboardHeader() {
  return (
    <div className="dboard-header">
      <div className="hamburger">
        <span></span>
      </div>
      <Link to="/">
        <p className="logo">geoHoop</p>
      </Link>
    </div>
  )
}

export default DboardHeader