import React from 'react'
import './style.scss'
import Header from '../../component/Header/'
import SunsetImg from '../../assets/img/sunset.jpg'

function Index() {
  const mainStyle = {
    backgroundImage: `url(${SunsetImg})`
  }
  return (
    <div>
      <Header color='#e8ecf1' background='transparent' />
      <main style={mainStyle}>
      </main>
    </div>
  )
}

export default Index
