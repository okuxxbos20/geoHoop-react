import React, { useState, useEffect } from 'react'
import './style.scss'
import Header from '../../component/Header/'
import Login from './login'
import Search from './search'
import { BluePalm, Court, FenceBuildings, GlassBoard, Sunset, YellowPaint } from '../../assets/img/'

const Index = () => {
  const [isDialogOpen, setDialog] = useState(false)
  const [isOnFocus, setOnFocus] = useState(false)
  const [isLoginForm, setLoginForm] = useState(true)
  const randomImg = [BluePalm, Court, FenceBuildings, GlassBoard, Sunset, YellowPaint]
  const [ranNum, setRunNum] = useState(0)

  useEffect(() => {
    setRunNum(Math.floor(Math.random() * randomImg.length))
  }, [randomImg.length])　

  const style = {
    mainStyle : {
      backgroundImage: `url(${randomImg[ranNum]})`
    }
  }
  return (
    <div>
      <Header
        color='#262626'
        background='#fff'
        setDialog={() => setDialog(!isDialogOpen)}
      />
      <main style={style.mainStyle}>
        {!isDialogOpen ?
          <div className="box">
            <div className="theme">
              <h1 className="geohoop">geoHoop</h1>
              <p className="discription">みんなで作るバスケットコート検索サイト</p>
            </div>
            <Search
              isOnFocus={isOnFocus}
              setOnFocus={() => setOnFocus(!isOnFocus)}
            />
          </div>
          :
          <Login
            isLoginForm={isLoginForm}
            setLoginForm={() => setLoginForm(!isLoginForm)}
          />
        }
        <p className="read-more">
          Read more about the <span>geoHoop License</span>
        </p>
      </main>
      <div className="recommend">
        <p>this is recommend.</p>
      </div>
    </div>
  )
}

export default Index
