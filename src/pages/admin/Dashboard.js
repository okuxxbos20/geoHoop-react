import React, { useState, useEffect } from 'react'
import './scss/Dashboard.scss'
import DboardHeader from '../../component/DboardHeader'
import { Avatar } from '../../assets/img/'
import { FormIcon, GeoIcon, GraphIcon, UsersIcon } from '../../assets/icons'
import { AllCourt, Form, Report, Users } from './pages'
import { db } from '../../firebase/index'

const DashBoard = () => {
  const [isAsideFold, setAside] = useState(false)
  // const [courtArr, setCourt] = useState([])
  const [usersArr, setUsers] = useState([])
  const [currentPageName, setPageName] = useState('form')

  useEffect(() => {
    const getAllUsers = async() => {
      const userList = []
      const users = await db.collection('users').get()
      if (users.empty) {
        return []
      }
      users.forEach((u) => userList.push(u.data()))
      setUsers(userList);
    }
    getAllUsers()
  }, [])

  const style = {
    mainStyle: {
      width: (isAsideFold ? 'calc(100% - 260px)' : 'calc(100% - 108px)')
    },
    labelStyle: {
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
       <div className="options">
         <label
          style={currentPageName === 'form' ? style.labelStyle : {}}
          onClick={() => setPageName('form')}
         >
           <FormIcon />
           <p>フォーム</p>
         </label>
       </div>
       <div className="options">
         <label
          style={currentPageName === 'all-court' ? style.labelStyle : {}}
          onClick={() => setPageName('all-court')}
         >
           <GeoIcon />
           <p>コート一覧</p>
         </label>
       </div>
       <div className="options">
         <label
          style={currentPageName === 'users' ? style.labelStyle : {}}
          onClick={() => setPageName('users')}
         >
           <UsersIcon />
           <p>ユーザ一覧</p>
         </label>
       </div>
       <div className="options">
         <label
          style={currentPageName === 'report' ? style.labelStyle : {}}
          onClick={() => setPageName('report')}
         >
           <GraphIcon />
           <p>レポート</p>
         </label>
       </div>
     </aside>
      <main style={style.mainStyle}>
        {currentPageName === 'form' && <Form />}
        {currentPageName === 'all-court' && <AllCourt court={12}/>}
        {currentPageName === 'users' && <Users usersArrProps={usersArr} />}
        {currentPageName === 'report' && <Report />}
      </main>
   </div>
 )
}

export default DashBoard
