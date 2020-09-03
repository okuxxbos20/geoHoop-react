import React, {useState, useEffect} from 'react'
import './style.scss'
import Header from '../../component/Header/'
import { BluePalm, Court, FenceBuildings, GlassBoard, Sunset, YellowPaint } from '../../assets/img/'
import { SearchIcon } from '../../assets/icons'
import Prefecture from '../../assets/json/prefectureTest.json'
import Login from './login'

const Index = () => {
  const [isDialogOpen, setDialog] = useState(true)
  const [isOnFocus, setOnFocus] = useState(false)
  const [isLoginForm, setLoginForm] = useState(true)
  const randomImg = [BluePalm, Court, FenceBuildings, GlassBoard, Sunset, YellowPaint]
  const [ranNum, setRunNum] = useState(0)

  useEffect(() => {
    setRunNum(Math.floor(Math.random() * randomImg.length))
  }, [randomImg.length])　


  const style = {
    mainStyle : {
      backgroundImage: `url(${randomImg[ranNum]})`
    }
  }
  return (
    <div>
      <Header
        color='#e8ecf1'
        background='transparent'
        setDialog={() => setDialog(!isDialogOpen)}
      />
      <main style={style.mainStyle}>
        {!isDialogOpen ?
          <div className="search-box">
            <div className="search-form">
              <input
                type="text"
                placeholder="we all equal on the court."
                onFocus={() => setOnFocus(!isOnFocus)}
              />
              <SearchIcon />
            </div>
            {isOnFocus &&
              <div className="search-suggest">
                {Prefecture.map((v) => {
                  return (
                    <div className="region-box">
                      <li>{v.name}</li>
                    </div>
                  )
                })}
              </div>
            }
          </div>
          :
          <Login
            isLoginForm={isLoginForm}
            setLoginForm={() => setLoginForm(!isLoginForm)}
          />
        }
      </main>
      <div className="recommend">
        <p>this is recommend.</p>
      </div>
    </div>
  )
}

export default Index
