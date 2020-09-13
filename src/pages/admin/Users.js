import React, { useState, useEffect } from 'react'
import './scss/Users.scss'
import { ArrowLeftIcon, ArrowRightIcon } from '../../assets/icons/'

const Users = (props) => {
  let AllUsers = props.usersArrProps
  const [isAllUserChecked, setAllUserChecked] = useState(false)
  const [isIndeterminate, setIndeterminate] = useState(false)
  const [usersData, setUsersData] = useState([])
  // eslint-disable-next-line
  const [selectedArr, setSelectedArr] = useState([])

  const convertDate = (sec, nano) => {
    const sum = sec * 1000 + nano / (1000 ** 2)
    const d = new Date(sum);
    const year = d.getFullYear();
    let month = d.getMonth() + 1;
    let date = d.getDate();
    month = month < 10 ? `0${month}` : month
    date = date < 10 ? `0${date}` : date
    const result = `${year}/${month}/${date}`;
    return result
  }

  if (AllUsers !== undefined) {
    AllUsers.forEach((v) => {
      v.isChecked = false
      v.registerDate = convertDate(v.createdAt.seconds, v.createdAt.nanoseconds)
      v.lastLoginDate = convertDate(v.lastLogin.seconds, v.lastLogin.nanoseconds)
    })
    console.log(AllUsers)
  }

  useEffect(() => {
    setUsersData([...usersData, ...AllUsers])
    // eslint-disable-next-line
  }, [])

  const checkAll = () => {
    setIndeterminate(false)
    let newData = []
    if (!isAllUserChecked) {
      setAllUserChecked(true)
      newData = usersData.map((v) => {
        v.isChecked = true
        return v
      })
    } else if (isAllUserChecked) {
      setAllUserChecked(false)
      newData = usersData.map((v) => {
        v.isChecked = false
        return v
      })
    }
    setUsersData(newData)
  }

  const checkIndividualBox = (idx) => {
    const newData = usersData.map((v, i) => {
      v.isChecked = i === idx ? !v.isChecked : v.isChecked
      return v
    })
    const newSelectedArr = newData.filter((v) => v.isChecked)
    setUsersData(newData)
    setSelectedArr(newSelectedArr)

    if (newSelectedArr.length === 0) {
      setIndeterminate(false)
      setAllUserChecked(false)
    } else if (newSelectedArr.length === usersData.length) {
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
            {usersData !== undefined &&
              usersData.map((v, idx) => {
                return (
                  <tr className={`user-data ${idx % 2 !== 0 ? 'odd' : ''}`} key={v.uid}>
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
                    <td><label>{v.registerDate}</label></td>
                    <td><label>{v.lastLoginDate}</label></td>
                    <td><label>{v.loginCount}</label></td>
                    <td><label>{v.likes.length}</label></td>
                    <td><label>{v.bookmarks.length}</label></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <div className="table-footer">
          {/* <p>{usersData.length}件中{usersData.length}件のデータを表示中</p> */}
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

export default Users
