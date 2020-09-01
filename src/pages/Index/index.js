import React, {useState} from 'react'
import './style.scss'
import Header from '../../component/Header/'
import { BluePalm, Court, FenceBuildings, GlassBoard, Sunset, YellowPaint } from '../../assets/img/'
import { GoogleIcon, SearchIcon } from '../../assets/icons'
import Prefecture from '../../assets/json/prefectureTest.json'

const Index = () => {
  const [isDialogOpen, setDialog] = useState(false)
  const [isOnFocus, setOnFocus] = useState(false)
  const [isLoginForm, setLoginForm] = useState(true)
  const [loginEmail, setLoginEmail] = useState(null)
  const [loginPassword, setLoginPassword] = useState(null)
  const [registerEmail, setRegisterEmail] = useState(null)
  const [registerPassword, setRegisterPassword] = useState(null)

  const checkLoginEmail = (email) => {
    setLoginEmail(email)
    console.log(loginEmail)
    if (loginEmail === null || loginEmail === '') {
    }
  }

  const checkLoginPassword = (password) => {
    setLoginPassword(password)
    if (loginPassword === null || loginPassword === '') {
    }
  }

  const checkRegisterEmail = (email) => {
    setRegisterEmail(email)
    console.log(registerEmail)
    if (registerEmail === null || registerEmail === '') {
    }
  }

  const checkRegisterPassword = (password) => {
    setRegisterPassword(password)
    if (registerPassword === null || registerPassword === '') {
    }
  }
  // ここをマウントされた時のみ走るようにする
  // const randomImg = [BluePalm, Court, FenceBuildings, GlassBoard, Sunset, YellowPaint]
  // const ranNum = Math.floor(Math.random() * randomImg.length)
  const style = {
    mainStyle : {
      backgroundImage: `url(${FenceBuildings})`
      // backgroundImage: `url(${randomImg[ranNum]})`
    }
  }

  return (
    <div>
      <Header
        color='#e8ecf1'
        background='transparent'
        setLoginForm={() => setDialog(!isDialogOpen)}
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
          <form className="login-form">
            <p className="login-title">{isLoginForm ? 'ログイン' : 'アカウント登録'}</p>
            <div className="box">
              <div className="input-place">
                <p>メールアドレス</p>
                {isLoginForm ?
                  <input type="email" onChange={(e) => checkLoginEmail(e.target.value)} />:
                  <input type="email" onChange={(e) => checkRegisterEmail(e.target.value)} />
                }
              </div>
              <div className="input-place">
                <p>パスワード</p>
                {isLoginForm ?
                  <input type="password" onChange={(e) => checkLoginPassword(e.target.value)} />:
                  <input type="password" onChange={(e) => checkRegisterPassword(e.target.value)} />
                }
              </div>
            </div>
            <div className="google-login">
              <GoogleIcon />
            </div>
            {isLoginForm ?
              <button>ログイン</button>:
              <button>アカウント作成</button>
            }
            <p className="switch-method">
              {isLoginForm ? '新規ユーザは' : 'ログインは'}
              <span onClick={() => setLoginForm(!isLoginForm)}>こちら</span>
            </p>
          </form>
        }
      </main>
      <div className="recommend">
        <p>this is recommend.</p>
      </div>
    </div>
  )
}

export default Index
