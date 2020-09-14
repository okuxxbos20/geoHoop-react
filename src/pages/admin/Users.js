import React, { useState, useEffect } from 'react'
import './scss/Users.scss'
import { ArrowLeftIcon, ArrowRightIcon } from '../../assets/icons/'

const Users = (props) => {
  let AllUsers = props.usersArr
  const [isAllUserChecked, setAllUserChecked] = useState(false)
  const [isIndeterminate, setIndeterminate] = useState(false)
  const [usersData, setUsersData] = useState([])
  const [selectedArr, setSelectedArr] = useState([])
  const [ascList, setAscList] = useState({
    isRegisterdateAsc: null,
    isLastLoginAsc: null,
    isLoginCountAsc: null,
    isLikesAsc: null,
    isBookmarksAsc: null
  })

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

  useEffect(() => {
    if (AllUsers !== undefined) {
      AllUsers.forEach((v) => {
        v.isChecked = false
        v.registerDate = convertDate(v.createdAt.seconds, v.createdAt.nanoseconds)
        v.lastLoginDate = convertDate(v.lastLogin.seconds, v.lastLogin.nanoseconds)
      })
    }
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
    setSelectedArr([...selectedArr, ...newSelectedArr])

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

  const changeRegitserdateOrder = () => {
    let newData = []
    let newAscList = {}
    Object.keys(ascList).forEach((v) => newAscList[v] = null)
    newData = usersData.sort((a, b) => {
      const time_a = a.createdAt.seconds * 1000 + a.createdAt.nanoseconds / (1000 **2)
      const time_b = b.createdAt.seconds * 1000 + b.createdAt.nanoseconds / (1000 **2)
      return time_b - time_a
    })
    newAscList.isRegisterdateAsc = false
    if (!ascList.isRegisterdateAsc) {
      newData = newData.reverse()
      newAscList.isRegisterdateAsc = true
    }
    setUsersData(newData)
    setAscList(newAscList)
  }

  const changeLastLoginOrder = () => {
    let newData = []
    let newAscList = {}
    Object.keys(ascList).forEach((v) => newAscList[v] = null)
    newData = usersData.sort((a, b) => {
      const time_a = a.lastLogin.seconds * 1000 + a.lastLogin.nanoseconds / (1000 **2)
      const time_b = b.lastLogin.seconds * 1000 + b.lastLogin.nanoseconds / (1000 **2)
      return time_b - time_a
    })
    newAscList.isLastLoginAsc = false
    if (!ascList.isLastLoginAsc) {
      newData = newData.reverse()
      newAscList.isLastLoginAsc = true
    }
    setUsersData(newData)
    setAscList(newAscList)
  }

  const changeLoginCountOrder = () => {
    let newData = []
    let newAscList = {}
    Object.keys(ascList).forEach((v) => newAscList[v] = null)
    newData = usersData.sort((a, b) => {
      return b.loginCount - a.loginCount
    })
    newAscList.isLoginCountAsc = false
    if (!ascList.isLoginCountAsc) {
      newData = newData.reverse()
      newAscList.isLoginCountAsc = true
    }
    setUsersData(newData)
    setAscList(newAscList)
  }

  const changeLikesOrder = () => {
    let newData = []
    let newAscList = []
    Object.keys(ascList).forEach((v) => newAscList[v] = null)
    newData = usersData.sort((a, b) => {
      return b.likes.length - a.likes.length
    })
    newAscList.isLikesAsc = false
    if (!ascList.isLikesAsc) {
      newData = newData.reverse()
      newAscList.isLikesAsc = true
    }
    setUsersData(newData)
    setAscList(newAscList)
  }

  const changeBookmarkOrder = () => {
    let newData = []
    let newAscList = []
    Object.keys(ascList).forEach((v) => newAscList[v] = null)
    newData = usersData.sort((a, b) => {
      return b.bookmarks.length - a.bookmarks.length
    })
    newAscList.isBookmarksAsc = false
    if (!ascList.isBookmarksAsc) {
      newData = newData.reverse()
      newAscList.isBookmarksAsc = true
    }
    setUsersData(newData)
    setAscList(newAscList)
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
              <td><label>name</label></td>
              <td><label>email</label></td>
              <td><label>isAdmin</label></td>
              <td
                className={`add-triangle ${ascList.isRegisterdateAsc === null ? '' : (ascList.isRegisterdateAsc ? 'triangle-asc' : 'triangle-desc')}`}
                onClick={() => changeRegitserdateOrder()}
              >
                <label>RegisterDate</label>
              </td>
              <td
                className={`add-triangle ${ascList.isLastLoginAsc === null ? '' : (ascList.isLastLoginAsc ? 'triangle-asc' : 'triangle-desc')}`}
                onClick={() => changeLastLoginOrder()}
              >
                <label>LastLoginDate</label>
              </td>
              <td
                className={`add-triangle ${ascList.isLoginCountAsc === null ? '' : (ascList.isLoginCountAsc ? 'triangle-asc' : 'triangle-desc')}`}
                onClick={() => changeLoginCountOrder()}
              >
                <label>LoginCount</label>
              </td>
              <td
                className={`add-triangle ${ascList.isLikesAsc === null ? '' : (ascList.isLikesAsc ? 'triangle-asc' : 'triangle-desc')}`}
                onClick={() => changeLikesOrder()}
              >
                <label>LikesCount</label>
              </td>
              <td
                className={`add-triangle ${ascList.isBookmarksAsc === null ? '' : (ascList.isBookmarksAsc ? 'triangle-asc' : 'triangle-desc')}`}
                onClick={() => changeBookmarkOrder()}
              >
                <label>BookmarksCount</label>
              </td>
              <td><label>uid</label></td>
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
                    <td><label>{`${v.uid.substring(0, 5)}...`}</label></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <div className="table-footer">
          {usersData !== undefined &&
            <div className="table-footer-box">
              <p>{usersData.length}件中{usersData.length}件のデータを表示中</p>
              <div className="pagenation">
                <label><ArrowLeftIcon /></label>
                <label><ArrowRightIcon /></label>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Users
