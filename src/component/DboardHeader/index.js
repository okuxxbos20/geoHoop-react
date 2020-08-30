import React from 'react'
import { Link } from 'react-router-dom'
import './style.scss'

const DboardHeader = (props) => {
  return (
    <div className="dboard-header">
      <div className="hamburger" onClick={() => {props.setAside()}}>
        <span></span>
      </div>
      <Link to="/">
        <p className="logo">geoHoop</p>
      </Link>
    </div>
  )
}

export default DboardHeader