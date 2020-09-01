import React, { useState } from 'react'
import './Dashboard.scss'
import DboardHeader from '../../component/DboardHeader'
import { Avatar } from '../../assets/img/'
import { FormIcon, GeoIcon, GraphIcon } from '../../assets/icons'
import { AllCourt, Form, Report } from './pages'

const DashBoard = () => {
  const [isAsideFold, setAside] = useState(false)
  const [currentPageComp, setPageComp] = useState(<AllCourt />)
  const [currentPageName, setPageName] = useState('all-court')

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
          onClick={() => changePage('all-court', <AllCourt />)}
         >
           <GeoIcon />
           <p>コート一覧</p>
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
