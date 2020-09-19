import React, { useState, useEffect } from 'react'
import './style.scss'
import Header from '../../component/Header/'
import Login from './login'
import Search from './search'
import { BluePalm, Court, FenceBuildings, GlassBoard, Sunset, YellowPaint } from '../../assets/img/'
import { useDispatch, useSelector } from 'react-redux'
import { getIsLogin } from '../../redux/users/selectors'
import { push } from 'connected-react-router'

const Index = () => {
  const [isDialogOpen, setDialog] = useState(false)
  const [isOnFocus, setOnFocus] = useState(false)
  const [isLoginForm, setLoginForm] = useState(false)
  const randomImg = [BluePalm, Court, FenceBuildings, GlassBoard, Sunset, YellowPaint]
  const [ranNum, setRunNum] = useState(0)
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const isLogin = getIsLogin(selector)
  const user = selector.users

  useEffect(() => {
    setRunNum(Math.floor(Math.random() * randomImg.length))
  }, [randomImg.length])　

  const style = {
    mainStyle : {
      backgroundImage: `url(${randomImg[ranNum]})`,
      height: ((isLogin && user.followingPrefecture.length !== 0) ? 'calc(100vh - 85px)' : 'calc(100vh)'),
      marginTop: ((isLogin && user.followingPrefecture.length !== 0) && '85px')
    }
  }
  return (
    <div>
      <Header setDialog={() => setDialog(!isDialogOpen)} />
      <main style={style.mainStyle}>
        {(!isDialogOpen || isLogin) ?
          <div className="main-box">
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
        <button onClick={() => dispatch(push('/court/rQ9T0Rww4dDbdEOH4S28'))}>go court</button>
      </div>
    </div>
  )
}

export default Index
