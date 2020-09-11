import React from 'react'
import './style.scss'
import { SearchIcon } from '../../assets/icons'

const Search = (props) => {
  return (
    <div className="search-box">
      <div className="search-form">
        <SearchIcon />
        <input
          type="text"
          placeholder="we all equal on the court."
          onFocus={() => props.setOnFocus()}
        />
      </div>
    </div>
  )
}

export default Search