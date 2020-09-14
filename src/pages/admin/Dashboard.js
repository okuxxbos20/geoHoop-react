import React, { useState, useEffect } from 'react'
import './scss/Dashboard.scss'
import DboardHeader from '../../component/DboardHeader'
import { Avatar } from '../../assets/img/'
import { FormIcon, GeoIcon, GraphIcon, UsersIcon } from '../../assets/icons'
import { AllCourt, Form, Report, Users } from './pages'
import { db } from '../../firebase/index'

const DashBoard = () => {
  const [isAsideFold, setAside] = useState(false)
  const [courtArr, setCourts] = useState([])
  const [usersArr, setUsers] = useState([])
  const [currentPageName, setPageName] = useState('form')

  const optionsArr = [
    {
      label: 'form',
      label_jp: 'フォーム',
      icon: <FormIcon />
    }, {
      label: 'all-court',
      label_jp: 'コート一覧',
      icon: <GeoIcon />
    }, {
      label: 'users',
      label_jp: 'ユーザ一覧',
      icon: <UsersIcon />
    }, {
      label: 'report',
      label_jp: 'レポート',
      icon: <GraphIcon />
    }
  ]

  useEffect(() => {
    const getAllCourt = async() => {
      const courtList = []
      const courts = await db.collection('court').get()
      if (courts.empty) {
        return []
      }
      courts.forEach((c) => courtList.push(c.data()))
      setCourts(courtList);
    }

    const getAllUsers = async() => {
      const userList = []
      const users = await db.collection('users').get()
      if (users.empty) {
        return []
      }
      users.forEach((u) => userList.push(u.data()))
      setUsers(userList);
    }
    getAllCourt()
    getAllUsers()
  }, [])

  const style = {
    main: {
      width: (isAsideFold ? 'calc(100% - 260px)' : 'calc(100% - 108px)')
    },
    label: {
      color: 'var(--subColor)',
      fontWeight: '500'
    }
  }
  return (
    <div className="admin">
      <DboardHeader setAside={() => setAside(!isAsideFold)} />
      <aside>
        <div className="admin-profile">
          <img src={Avatar} alt="avatar"/>
          <div className="detail">
            <p className="name">徳川家康</p>
            <p className="email">tokugawa@gmail.com</p>
          </div>
        </div>
        {optionsArr.map((v) => {
          return (
            <div className="options" key={v.label}>
              <label
                style={currentPageName === v.label ? style.label : {}}
                onClick={() => setPageName(v.label)}
              >
                {v.icon}
                <p>{v.label_jp}</p>
              </label>
            </div>
          )
         })}
      </aside>
      <main style={style.main}>
        {currentPageName === 'form' && <Form />}
        {currentPageName === 'all-court' && <AllCourt courtArr={courtArr} />}
        {currentPageName === 'users' && <Users usersArr={usersArr} />}
        {currentPageName === 'report' && <Report />}
      </main>
    </div>
 )
}

export default DashBoard
