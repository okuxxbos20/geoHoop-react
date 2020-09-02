import React, {useState} from 'react'
import './AllCourt.scss'
import { ArrowLeftIcon, ArrowRightIcon } from '../../assets/icons/'

const AllCourt = () => {
  const [isAllCourtChecked, setAllCourtChecked] = useState(false)
  const [isIndeterminate, setIndeterminate] = useState(false)
  const dammyData = [
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
  return (
    <div className="all-court">
      <header>
        <p className="page-title">コート一覧</p>
      </header>
      <div className="box">
        <div className="controller">
          <p>フィルター</p>
        </div>
        <table>
          <tr className="column-name">
            <td className="checkbox-place">
              <label
                className="all-checkbox"
                onClick={() => setAllCourtChecked(!isAllCourtChecked)}
              >
                <span
                  className={`${isAllCourtChecked ? 'allSelect' : ''} ${isIndeterminate ? 'indeterminate' : ''}`}
                >
                </span>
              </label>
            </td>
            <td><label>コート名</label></td>
            <td><label>都道府県</label></td>
            <td><label>市町村区</label></td>
            <td className="add-triangle"><label>Likes</label></td>
            <td className="add-triangle"><label>Bookmarks</label></td>
            <td><label>コートタイプ</label></td>
            <td><label>登録日</label></td>
            <td><label>id</label></td>
          </tr>
          {dammyData.map((v, idx) => {
            return (
              <tr className={`court-data ${idx % 2 !== 0 ? 'odd' : ''}`} key={idx}>
                <td className="checkbox-place">
                  <label className="individual-checkbox">
                    <span className="checkmark"></span>
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
        </table>
        <div className="table-footer">
          <p>4件中4件のデータを表示中</p>
          <div className="pagenation">
            <label>
              <ArrowLeftIcon />
            </label>
            <label>
              <ArrowRightIcon />
            </label>
          </div>
        </div>
        {/* 仮のボタン */}
        <button onClick={() => setIndeterminate(!isIndeterminate)}>intermidiate</button>
      </div>
    </div>
  )
}

export default AllCourt

