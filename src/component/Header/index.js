import React, { useEffect } from 'react'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import { Avatar, GeoHoopLogo } from '../../assets/img/'
import { getIsLogin } from '../../redux/users/selectors'
import { listenAuthState } from '../../redux/users/operations'
import Searchbox from '../Searchbox/Searchbox'

const Header = (props) => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const isLogin = getIsLogin(selector)
  // const user = selector.users
  // console.log(user)

  useEffect(() => {
    if (!isLogin) {
      dispatch(listenAuthState())
    }
  }, [dispatch, isLogin])

  // アクセス数が大きいorアクセスして欲しい順にsortして最適化する
  const featureContents = [
    {
      label: '東京'
    }, {
      label: '大阪'
    }, {
      label: '名古屋'
    }, {
      label: '福岡'
    }, {
      label: '神奈川'
    }, {
      label: '仙台'
    }, {
      label: '広島'
    }, {
      label: '沖縄'
    }, {
      label: '新潟'
    }, {
      label: '千葉'
    }, {
      label: '神戸'
    }, {
      label: '北海道'
    }, {
      label: '岐阜'
    }, {
      label: '岡山'
    }, {
      label: '福島'
    }, {
      label: '和歌山'
    }, {
      label: '鳥取'
    },
  ]

  const style = {
    header: {
      background: props.background
    },
    geoTitle: {
      color: props.color
    },
    login: {
      color: props.color
    }
  }
  return (
    <div className="header" style={style.header}>
      <div className="upper-box">
        <img
          src={GeoHoopLogo}
          alt="logo"
          className="logo"
          onClick={() => dispatch(push('/'))}
        />
        <Searchbox />
        {isLogin ?
        <img
          src={Avatar}
          alt="avatar"
          className="profile-img"
          onClick={() => dispatch(push('/profile'))}
        />
        :
        <p
          className="login"
          style={style.login}
          onClick={() => {props.setDialog()}}
        >
          Login
        </p>
        }
      </div>
      <div className="lower-box">
        <ul>
          {featureContents.map((v) => {
            return (
              <li className="feature-item" key={v.label}>
                {v.label}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Header
