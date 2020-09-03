import React from 'react'
import './style.scss'
import { SearchIcon } from '../../assets/icons'
import Prefecture from '../../assets/json/prefectureTest.json'

const Search = (props) => {
  return (
    <div className="search-box">
      <div className="search-form">
        <input
          type="text"
          placeholder="we all equal on the court."
          onFocus={() => props.setOnFocus()}
        />
        <SearchIcon />
      </div>
      {props.isOnFocus &&
        <div className="search-suggest">
        {Prefecture.map((v) => {
          return (
            <div key={v.code} className="region-box">
              <li>{v.name}</li>
            </div>
          )
        })}
        </div>
      }
    </div>
  )
}

export default Search