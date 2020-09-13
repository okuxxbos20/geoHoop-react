import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './styles.scss'
import { Avatar, Palmtrees } from '../../assets/img/'
import { EditIcon } from '../../assets/icons'
import { Logout } from '../../redux/users/operations'
import { push } from 'connected-react-router'
// import { BluePalm, Court, FenceBuildings, GlassBoard, Sunset, YellowPaint } from '../../assets/img/'

const Profile = () => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const user = selector.users
  console.log(user)

  const style = {
    header: {
      // backgroundImage: `url(${Palmtrees})`
    }
  }
  return (
    <div className="profile">
      <header style={style.header}>
        <div className="header-box">
          <p className="geo-hoop" onClick={() => dispatch(push('/'))}>geoHoop</p>
          <img src={Avatar} alt="avatar" className="profile-icon" />
          <div className="edit-profile">
            <EditIcon />
          </div>
        </div>
      </header>
      <div className="basic-info">
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