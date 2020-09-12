import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './styles.scss'
import { Avatar } from '../../assets/img/'
import { EditIcon } from '../../assets/icons'

const Profile = () => {
  const selector = useSelector((state) => state)
  const user = selector.users

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
      <div className="log-out">
        <p>ログアウト</p>
      </div>
    </div>
  )
}

export default Profile