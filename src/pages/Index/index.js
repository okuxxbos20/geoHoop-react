import React, {useState, useEffect} from 'react'
import './style.scss'
import Header from '../../component/Header/'
import { BluePalm, Court, FenceBuildings, GlassBoard, Sunset, YellowPaint } from '../../assets/img/'
import { GoogleIcon, SearchIcon } from '../../assets/icons'
import Prefecture from '../../assets/json/prefectureTest.json'

const Index = () => {
  const [isDialogOpen, setDialog] = useState(true)
  const [isOnFocus, setOnFocus] = useState(false)
  const [isLoginForm, setLoginForm] = useState(true)
  // login
  const [loginEmail, setLoginEmail] = useState({ email: '', error: '' })
  const [loginPassword, setLoginPassword] = useState({ password: '', error: '' })
  // register
  const [registerEmail, setRegisterEmail] = useState({ email: '', error: '' })
  const [registerPassword, setRegisterPassword] = useState({ password: '', error: '' })

  const checkLoginEmail = (e) => {
    console.log(e.target.value)
    setLoginEmail((prev, e) => {
      return {...prev, email: e.target.value}
    })
  }

  const checkLoginPassword = (password) => {
    setLoginPassword(password)
    if (loginPassword.password === '') {
      setLoginPassword({ error: 'パスワードを入力してください' })
    }
  }

  const checkRegisterEmail = (email) => {
    setRegisterEmail(email)
    if (registerEmail.email === '') {
      setRegisterEmail({ error: 'メールアドレスを入力してください' })
    }
  }

  const checkRegisterPassword = (password) => {
    setRegisterPassword(password)
    if (registerPassword.password === '') {
      setRegisterPassword({ error: 'パスワードを入力してください' })
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
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={isLoginForm ? loginEmail.email : registerEmail.email}
                  onChange={isLoginForm ? checkLoginEmail : checkRegisterEmail}
                  autoFocus
                />
              </div>
              <div className="input-place">
                <p>パスワード</p>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={isLoginForm ? loginPassword.password : registerPassword.password}
                  onChange={isLoginForm ? checkLoginPassword : checkRegisterPassword}
                />
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
