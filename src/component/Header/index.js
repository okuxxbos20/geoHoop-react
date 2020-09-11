import React, { useEffect } from 'react'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import Avatar from '../../assets/img/avatar.png'
import { getIsLogin } from '../../redux/users/selectors'
import { listenAuthState } from '../../redux/users/operations'

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
      <p
        className="geo-title"
        style={style.geoTitle}
        onClick={() => dispatch(push('/'))}
      >
        geoHoop
      </p>
      {isLogin ?
      <img
        src={Avatar}
        alt="avatar"
        className="profile-img"
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
  )
}

export default Header
