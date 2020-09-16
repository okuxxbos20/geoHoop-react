import React, { useState, useEffect } from 'react'
import './style.scss'
import Header from '../../component/Header/'
import { Noimg } from '../../assets/img/'
import { ArrowLeftIcon, ArrowRightIcon, BookmarkEmptyIcon, HeartEmptyIcon } from '../../assets/icons/'
import { useSelector } from 'react-redux'
import { db } from '../../firebase/index'

const CourtData = () => {
  const selector = useSelector((state) => state)
  const path = selector.router.location.pathname
  const id = path.split('/court/')[1]
  const [courtData, setCourtData] = useState({})

  useEffect(() => {
    const getCourtData = async(id) => {
      const data = await db.collection('court').doc(id).get()
      setCourtData({ ...courtData, ...data.data() })
    }
    getCourtData(id)
  // eslint-disable-next-line
　}, [])
  // console.log(courtData)
  return (
    <div>
      <Header color="var(--mainColor)" background="var(--subColor)" />
      <div className="court">
        <div className="upper">
          <div className="left">
            {(!courtData.img || courtData.img.length === 0) ?
              <img src={Noimg} alt="main-no-img" className="main-img" />
              :
              <div>
                <img src={courtData.img[0]} alt="main-img" className="main-img" />
                <div className="img-overlay">
                  <div className="arrowleft-icon">
                    <ArrowLeftIcon />
                  </div>
                  <div className="arrowright-icon">
                    <ArrowRightIcon />
                  </div>
                </div>
              </div>
            }
            <div className="box-footer">
            <div className="upper-row">
              <p className="pre-city">#{courtData.prefecture} #{courtData.city}</p>
              <div className="likes-bookmarks">
                <label>
                  <HeartEmptyIcon />
                  <span>{courtData.likes}</span>
                </label>
                <label>
                  <BookmarkEmptyIcon />
                  <span>{courtData.bookmarks}</span>
                </label>
              </div>
            </div>
            </div>
          </div>
          <div className="right">
            <h5 className="table-title">コート情報</h5>
            <div className="table-wrapper">
            <table>
              <tbody>
                <tr>
                  <td className="name">住所</td>
                  <td className="right">{courtData.address}</td>
                </tr>
                <tr className="odd">
                  <td className="name">Google Maps</td>
                  <td className="right">
                    <a href={courtData.googleMapsUrl}>Google Mapsへ</a>
                  </td>
                </tr>
                <tr>
                  <td className="name">参考URL</td>
                  <td className="right">
                    <a href={courtData.refUrl}>{courtData.refUrl}</a>
                  </td>
                </tr>
                <tr className="odd">
                  <td className="name">コートタイプ</td>
                  <td className="right">{courtData.isOutside}</td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourtData
