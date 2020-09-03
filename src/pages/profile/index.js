import React from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'
import { Avatar } from '../../assets/img/'

const Profile = () => {
  const dammy = {
    name: 'OKU FUJIYOSHI',
    email: 'geohoop@example.com'
  }
  return (
    <div className="profile">
      <Link to="/">
        <p className="geo-hoop">geoHoop</p>
      </Link>
      <div className="basic-info">
        <img src={Avatar} alt="avatar" />
        <div className="others">
          <p className="name">{dammy.name}</p>
          <p className="email">{dammy.email}</p>
        </div>
      </div>
    </div>
  )
}

export default Profile