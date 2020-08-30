import React, { useState } from 'react'
import './style.scss'
import DboardHeader from '../../component/DboardHeader'
import Avatar from '../../assets/img/avatar.png'
import { FormIcon, GeoIcon, GraphIcon } from '../../assets/icons/'
import { AllCourt, Form, Report } from './pages'

const Index = () => {
  const [isAsideFold, setAside] = useState(false)
  const [currentPageComp, setPageComp] = useState(<AllCourt />)
  const [currentPageName, setPageName] = useState('all-court')
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
         <img src={Avatar} alt="avator"/>
         <div className="detail">
           <p className="name">徳川家康</p>
           <p className="email">tokugawa@gmail.com</p>
         </div>
       </div>
       <div className="options">
         <label
          style={currentPageName === 'form' ? style.labelStyle : {}}
          onClick={() => {
            setPageName('form')
            setPageComp(<Form />)
          }}
         >
           <FormIcon />
           <p>フォーム</p>
         </label>
       </div>
       <div className="options">
         <label
          style={currentPageName === 'all-court' ? style.labelStyle : {}}
          onClick={() => {
            setPageName('all-court')
            setPageComp(<AllCourt />)
          }}
         >
           <GeoIcon />
           <p>コート一覧</p>
         </label>
       </div>
       <div className="options">
         <label
          style={currentPageName === 'report' ? style.labelStyle : {}}
          onClick={() => {
            setPageName('report')
            setPageComp(<Report />)
          }}
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

export default Index
