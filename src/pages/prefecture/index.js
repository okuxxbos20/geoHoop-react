import React from 'react'
import './style.scss'
import Header from '../../component/Header/'
import { Gifu } from '../../assets/geo'

const Prefecture = () => {
  return (
    <div className="prefecture">
      <Header />
      <div className="window">
        <p className="pre-result-title">
          <span>岐阜県</span>の検索結果
        </p>
        <Gifu />
      </div>
    </div>
  )
}

export default Prefecture
