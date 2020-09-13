import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './styles.scss'
import { Avatar } from '../../assets/img/'
import { EditIcon } from '../../assets/icons'
import { Logout } from '../../redux/users/operations'

const Profile = () => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const user = selector.users
  console.log(user)
  return (
    <div className="profile">
      <header>
        <Link to="/">
          <p className="geo-hoop">geoHoop</p>
        </Link>
        <div className="edit-profile">
          <EditIcon />
        </div>
      </header>
      <div className="basic-info">
        <img src={Avatar} alt="avatar" />
        <div className="others">
          <p className="name">{user.name}</p>
          <p className="email">{user.email}</p>
          <p>{user.followingPrefecture}</p>
        </div>
      </div>
      <div className="log-out" onClick={() => dispatch(Logout())}>
        <p>ログアウト</p>
      </div>
    </div>
  )
}

export default Profile