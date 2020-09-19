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
  const user = selector.users

  useEffect(() => {
    if (!isLogin) {
      dispatch(listenAuthState())
    }
  }, [dispatch, isLogin])

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
  console.log(user.followingPrefecture.length)
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
          SignUp
        </p>
        }
      </div>
      {(isLogin && user.followingPrefecture.length !== 0) &&
        <div className="lower-box">
        <ul>
            {user.followingPrefecture.map((v) => {
              return (
                <li className="feature-item" key={v}>{v}</li>
              )
            })}
          </ul>
        </div>
      }
    </div>
  )
}

export default Header
