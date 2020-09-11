import React, { useState } from 'react'
import './scss/Users.scss'
import { ArrowLeftIcon, ArrowRightIcon } from '../../assets/icons/'

const AllUsers = (props) => {
  let dammy = [
    {
      bookmarks: [],
      createdAt: '',
      email: 'aaa@gmail.com',
      lastLogin: '',
      likes: [],
      loginCount: 0,
      uid: '000001',
      isAdmin: false,
      name: 'aaa',
    }, {
      bookmarks: [],
      createdAt: '',
      email: 'bbb@gmail.com',
      lastLogin: '',
      likes: [],
      loginCount: 5,
      uid: '000002',
      isAdmin: false,
      name: 'bbb',
    }, {
      bookmarks: [],
      createdAt: '',
      email: 'ccc@gmail.com',
      lastLogin: '',
      likes: [],
      loginCount: 11,
      uid: '000003',
      isAdmin: false,
      name: 'ccc',
    }, {
      bookmarks: [],
      createdAt: '',
      email: 'ddd@gmail.com',
      lastLogin: '',
      likes: [],
      loginCount: 23,
      uid: '000004',
      isAdmin: true,
      name: 'ddd',
    },
  ]
  dammy.map((v) => v.isChecked = false)
  console.log('give me users')
  console.log(props.users)
  const [isAllUserChecked, setAllUserChecked] = useState(false)
  const [isIndeterminate, setIndeterminate] = useState(false)
  const [dammyData, setDammyData] = useState(dammy)
  // eslint-disable-next-line
  const [selectedArr, setSelectedArr] = useState([])

  const checkAll = () => {
    setIndeterminate(false)
    let newDammyData = []
    if (!isAllUserChecked) {
      setAllUserChecked(true)
      newDammyData = dammyData.map((v) => {
        v.isChecked = true
        return v
      })
    } else if (isAllUserChecked) {
      setAllUserChecked(false)
      newDammyData = dammyData.map((v) => {
        v.isChecked = false
        return v
      })
    }
    setDammyData(newDammyData)
  }

  const checkIndividualBox = (idx) => {
    const newDammyData = dammyData.map((v, i) => {
      v.isChecked = i === idx ? !v.isChecked : v.isChecked
      return v
    })
    const newSelectedArr = newDammyData.filter((v) => v.isChecked)
    setDammyData(newDammyData)
    setSelectedArr(newSelectedArr)

    if (newSelectedArr.length === 0) {
      setIndeterminate(false)
      setAllUserChecked(false)
    } else if (newSelectedArr.length === dammyData.length) {
      setIndeterminate(false)
      setAllUserChecked(true)
    } else {
      setIndeterminate(true)
      setAllUserChecked(false)
    }
  }

  return (
    <div className="all-users">
      <header>
        <p className="page-title">ユーザ一覧</p>
      </header>
      <div className="box">
        <div className="controller"></div>
        <table>
          <thead>
          <tr className="column-name">
              <td className="checkbox-place">
                <label className="all-checkbox" onClick={() => checkAll()}>
                  <span　className={`${isAllUserChecked ? 'all-select' : ''} ${isIndeterminate ? 'indeterminate' : ''}`}>
                  </span>
                </label>
              </td>
              <td><label>ユーザ名</label></td>
              <td><label>uid</label></td>
              <td><label>email</label></td>
              <td><label>isAdmin</label></td>
              <td><label>登録日</label></td>
              <td><label>最終ログイン</label></td>
              <td><label>ログイン回数</label></td>
              <td><label>likes数</label></td>
              <td><label>bookmark数</label></td>
            </tr>
          </thead>
          <tbody>
            {dammyData.map((v, idx) => {
              return (
                <tr className={`user-data ${idx % 2 !== 0 ? 'odd' : ''}`} key={v.id}>
                <td className="checkbox-place">
                  <label
                    className="individual-checkbox"
                    onClick={() => checkIndividualBox(idx)}
                  >
                    <span className={`checkmark ${v.isChecked ? 'checked' : ''}`}></span>
                  </label>
                </td>
                <td><label>{v.name}</label></td>
                <td><label>{v.uid}</label></td>
                <td><label>{v.email}</label></td>
                <td>
                  <label>
                    <span className={v.isAdmin ? 'admin-badge' : 'user-badge'}>
                      {v.isAdmin ? '管理者' : 'ユーザ'}
                    </span>
                  </label>
                </td>
                <td><label>{v.createdAt}</label></td>
                <td><label>{v.lastLogin}</label></td>
                <td><label>{v.loginCount}</label></td>
                <td><label>{v.likes.length}</label></td>
                <td><label>{v.bookmarks.length}</label></td>
              </tr>
              )
            })}
          </tbody>
        </table>
        <div className="table-footer">
          <p>{dammyData.length}件中{dammyData.length}件のデータを表示中</p>
          <div className="pagenation">
            <label>
              <ArrowLeftIcon />
            </label>
            <label>
              <ArrowRightIcon />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllUsers
