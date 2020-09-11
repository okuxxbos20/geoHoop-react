import React from 'react'
import './style.scss'
import { SearchIcon } from '../../assets/icons'

const Searchbox = () => {
  return (
    <div className="search-box">
      <div className="wrapper">
        <SearchIcon />
        <input
          type="text"
          className="inpot-area"
          placeholder="we all equal on the court."
        />
      </div>
    </div>
  )
}

export default Searchbox
