import React, { useState } from 'react'
import './scss/Dashboard.scss'
import DboardHeader from '../../component/DboardHeader'
import { Avatar } from '../../assets/img/'
import { FormIcon, GeoIcon, GraphIcon, UsersIcon } from '../../assets/icons'
import { AllCourt, Form, Report, Users } from './pages'
import { db } from '../../firebase/index'

const DashBoard = () => {
  const [isAsideFold, setAside] = useState(false)
  const [courtArr, setCourt] = useState([])
  const [usersArr, setUsers] = useState([])
  const [currentPageComp, setPageComp] = useState(<Users users={usersArr}/>)
  const [currentPageName, setPageName] = useState('users')

  const getDataFromFirebase = (collection) => {
    return db.collection(collection).get().then((result) => {
      console.log('yoyo')
      console.log(result)
      if (collection === 'court') {
        result.forEach((v) => {
          setCourt(...courtArr, v.data())
          console.log(v.data())
        })
      }
      if (collection === 'users') {
        result.forEach((v) => {
          setUsers(...usersArr, v.data())
          console.log(v.data())
        })
      }
    })
  }

  getDataFromFirebase('court')
  getDataFromFirebase('users')

  const changePage = (to, comp) => {
    setPageName(to)
    setPageComp(comp)
  }
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
          onClick={() => changePage('from', <Form />)}
         >
           <FormIcon />
           <p>フォーム</p>
         </label>
       </div>
       <div className="options">
         <label
          style={currentPageName === 'all-court' ? style.labelStyle : {}}
          onClick={() => changePage('all-court', <AllCourt court={courtArr} />)}
         >
           <GeoIcon />
           <p>コート一覧</p>
         </label>
       </div>
       <div className="options">
         <label
          style={currentPageName === 'users' ? style.labelStyle : {}}
          onClick={() => changePage('users', <Users users={usersArr} />)}
         >
           <UsersIcon />
           <p>ユーザ一覧</p>
         </label>
       </div>
       <div className="options">
         <label
          style={currentPageName === 'report' ? style.labelStyle : {}}
          onClick={() => changePage('report', <Report />)}
         >
           <GraphIcon />
           <p>レポート</p>
         </label>
       </div>
     </aside>
     <main style={style.mainStyle}>
       {currentPageComp}
     </main>
   </div>
 )
}

export default DashBoard
