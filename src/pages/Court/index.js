import React from 'react'
import './style.scss'
import Header from '../../component/Header/'
import { BluePalm, Court, FenceBuildings, GlassBoard, Sunset, YellowPaint } from '../../assets/img/'
import { ArrowLeftIcon, ArrowRightIcon, BookmarkEmptyIcon, HeartEmptyIcon } from '../../assets/icons/'

const CourtData = () => {
  const dammydata = {
    name: '代々木公園',
    prefecture: '東京都',
    city: '渋谷区',
    img: [BluePalm, Court, FenceBuildings, GlassBoard, Sunset, YellowPaint],
    likes: 11,
    bookmarks: 12,
    address: '東京都渋谷区代々木神園町神南2丁目',
    googleMapsUrl: 'https://www.google.com/maps/place/Basketball+courts/@35.6679925,139.6934377,15z/data=!4m5!3m4!1s0x60188cb241ddf563:0x7dcb15367b532b47!8m2!3d35.6673293!4d139.6948341',
    refUrl: 'http://www.tokyo-park.or.jp/park/format/index039.html',
    isOutside: true
  }
  return (
    <div>
      <Header color="var(--mainColor)" background="var(--subColor)" />
      <div className="court">
        <div className="upper">
          <div className="left">
            <img src={dammydata.img[0]} alt="main-img" className="main-img" />
            <div className="img-overlay">
              <div className="arrowleft-icon">
                <ArrowLeftIcon />
              </div>
              <div className="arrowright-icon">
                <ArrowRightIcon />
              </div>
            </div>
            <div className="box-footer">
            <div className="upper-row">
              <p className="pre-city">#{dammydata.prefecture} #{dammydata.city}</p>
              <div className="likes-bookmarks">
                <label>
                  <HeartEmptyIcon />
                  <span>{dammydata.likes}</span>
                </label>
                <label>
                  <BookmarkEmptyIcon />
                  <span>{dammydata.bookmarks}</span>
                </label>
              </div>
            </div>
            </div>
          </div>
          <div className="right">
            <h5 className="table-title">コート情報</h5>
            <div className="table-wrapper">
            <table>
              <tr>
                <td className="name">住所</td>
                <td className="right">{dammydata.address}</td>
              </tr>
              <tr className="odd">
                <td className="name">Google Maps</td>
                <td className="right">
                  <a href={dammydata.googleMapsUrl}>Google Mapsへ</a>
                </td>
              </tr>
              <tr>
                <td className="name">参考URL</td>
                <td className="right">
                  <a href={dammydata.refUrl}>{dammydata.refUrl}</a>
                </td>
              </tr>
              <tr className="odd">
                <td className="name">コートタイプ</td>
                <td className="right">{dammydata.isOutside}</td>
              </tr>
            </table>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourtData
