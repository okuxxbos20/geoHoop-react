import React, { useState } from 'react'
import './AllCourt.scss'
import { ArrowLeftIcon, ArrowRightIcon } from '../../assets/icons/'

const AllCourt = () => {
  let dammy = [
    {
      name: 'aaa',
      prefecture: '東京都',
      city: '大田区',
      likes: 10,
      bookmarks: 5,
      isOutside: false,
      createdAt: '2020/02/18',
      id: 'cncad29bs'
    }, {
      name: 'bbb',
      prefecture: '大阪府',
      city: '北区',
      likes: 20,
      bookmarks: 21,
      isOutside: false,
      createdAt: '2020/01/12',
      id: 'x38y9bzgh'
    }, {
      name: 'ccc',
      prefecture: '愛知県',
      city: '名古屋市',
      likes: 18,
      bookmarks: 31,
      isOutside: true,
      createdAt: '2020/09/09',
      id: '83x43xaxb'
    }, {
      name: 'ddd',
      prefecture: '岐阜県',
      city: '岐阜市',
      likes: 0,
      bookmarks: 9,
      isOutside: false,
      createdAt: '2020/07/08',
      id: '9jsaha63h'
    }
  ]

  dammy.map((v) => v.isChecked = false)

  const [isAllCourtChecked, setAllCourtChecked] = useState(false)
  const [isIndeterminate, setIndeterminate] = useState(false)
  const [dammyData, setDammyData] = useState(dammy)
  // eslint-disable-next-line
  const [selectedArr, setSelectedArr] = useState([])
  const [isLikesAsc, setLikesAsc] = useState(null)
  const [isBookmarksAsc, setBookmarksAsc] = useState(null)

  const changeLikesOrder = () => {
    if (isLikesAsc || isLikesAsc === null) {
       const newDammyData = dammyData.sort((a, b) => {
        return b.likes - a.likes;
      })
      setDammyData(newDammyData)
      setBookmarksAsc(null)
      setLikesAsc(false)
    } else if (!isLikesAsc) {
      const newDammyData = dammyData.sort((a, b) => {
        return a.likes - b.likes;
      })
      setDammyData(newDammyData)
      setBookmarksAsc(null)
      setLikesAsc(true)
    }
  }

  const changeBookmarkOrder = () => {
    if (isBookmarksAsc || isBookmarksAsc === null) {
      const newDammyData = dammyData.sort((a, b) => {
        return b.bookmarks - a.bookmarks
      })
      setDammyData(newDammyData)
      setLikesAsc(null)
      setBookmarksAsc(false)
    } else if (!isBookmarksAsc) {
      const newDammyData = dammyData.sort((a, b) => {
        return a.bookmarks - b.bookmarks
      })
      setDammyData(newDammyData)
      setLikesAsc(null)
      setBookmarksAsc(true)
    }
  }

  const checkAll = () => {
    setIndeterminate(false)
    let newDammyData = []
    if (!isAllCourtChecked) {
      setAllCourtChecked(true)
      newDammyData = dammyData.map((v) => {
        v.isChecked = true
        return v
      })
    } else if (isAllCourtChecked) {
      setAllCourtChecked(false)
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
      setAllCourtChecked(false)
    } else if (newSelectedArr.length === dammyData.length) {
      setIndeterminate(false)
      setAllCourtChecked(true)
    } else {
      setIndeterminate(true)
      setAllCourtChecked(false)
    }
  }

  return (
    <div className="all-court">
      <header>
        <p className="page-title">コート一覧</p>
      </header>
      <div className="box">
        <div className="controller">
        </div>
        <table>
          <thead>
            <tr className="column-name">
              <td className="checkbox-place">
                <label className="all-checkbox" onClick={() => checkAll()}>
                  <span　className={`${isAllCourtChecked ? 'all-select' : ''} ${isIndeterminate ? 'indeterminate' : ''}`}>
                  </span>
                </label>
              </td>
              <td><label>コート名</label></td>
              <td><label>都道府県</label></td>
              <td><label>市町村区</label></td>
              <td
                className={`add-triangle ${isLikesAsc === null ? '' : (isLikesAsc ? 'triangle-asc' : 'triangle-desc')}`}
                onClick={() => changeLikesOrder()}
              >
                <label>Likes</label>
              </td>
              <td
                className={`add-triangle ${isBookmarksAsc === null ? '' : (isBookmarksAsc ? 'triangle-asc' : 'triangle-desc')}`}
                onClick={() => changeBookmarkOrder()}
              >
                <label>Bookmarks</label>
              </td>
              <td><label>コートタイプ</label></td>
              <td><label>登録日</label></td>
              <td><label>id</label></td>
            </tr>
          </thead>
          <tbody>
          {dammyData.map((v, idx) => {
            return (
              <tr className={`court-data ${idx % 2 !== 0 ? 'odd' : ''}`} key={v.id}>
                <td className="checkbox-place">
                  <label
                    className="individual-checkbox"
                    onClick={() => checkIndividualBox(idx)}
                  >
                    <span className={`checkmark ${v.isChecked ? 'checked' : ''}`}></span>
                  </label>
                </td>
                <td><label>{v.name}</label></td>
                <td><label>{v.prefecture}</label></td>
                <td><label>{v.city}</label></td>
                <td><label>{v.likes}</label></td>
                <td><label>{v.bookmarks}</label></td>
                <td>
                  <label>
                    <span className={v.isOutside ? 'outside' : 'inside'}>
                      {v.isOutside ? '屋外' : '屋内'}
                    </span>
                  </label>
                </td>
                <td><label>{v.createdAt}</label></td>
                <td>
                  <label className="court-id">{v.id}</label>
                </td>
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

export default AllCourt

