import React from 'react'
import { Link } from 'react-router-dom'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '../../assets/img/avatar.png'

const Header = (props) => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const user = selector.users
  console.log(user)

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
      <Link to="/">
        <p className="geo-title" style={style.geoTitle}>geoHoop</p>
      </Link>
      {user.isLogin ?
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
