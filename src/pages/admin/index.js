import React, { useState } from 'react';
import './style.scss'
import DboardHeader from '../../component/DboardHeader'
import Avatar from '../../assets/img/avatar.png'
import { FormIcon, GeoIcon, GraphIcon } from '../../assets/icons/'

function Index () {
  const [isAsideFold, setAside] = useState(false)
  const asideStyle = {
   left: (!isAsideFold ? '0' : '-240px')
 }
  return (
   <div className="admin">
     <DboardHeader onClick={() => setAside(!isAsideFold)}/>
     <aside style={asideStyle}>
       <div className="admin-profile">
         <img src={Avatar} alt="avator"/>
         <div className="detail">
           <p className="name">織田信長</p>
           <p className="email">tokugawa@gmail.com</p>
         </div>
       </div>
       <div className="options">
         <label>
           <FormIcon />
           <p>フォーム</p>
         </label>
       </div>
       <div className="options">
         <label>
           <GeoIcon />
           <p>コート一覧</p>
         </label>
       </div>
       <div className="options">
         <label>
           <GraphIcon />
           <p>レポート</p>
         </label>
       </div>
     </aside>
     <main>
       <div>this is main</div>
     </main>
   </div>
 )
}

export default Index
