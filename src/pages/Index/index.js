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
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' })
  const inputLoginInfo = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })
  }

  // register
  const [registerInfo, setRegisterInfo] = useState({ email: '', password: '' })
  const inputRegisterInfo = (e) => {
    setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value })
  }

  // validation
  const validation = () => {
    let loginErr = {}
    let registerErr = {}

    if (isLoginForm) {
      if (loginInfo.email === '') {
        loginErr.email = '*メールアドレスを入力してください'
      }
      if (loginInfo.password === '') {
        loginErr.password = '*パスワードを入力してください'
      }
    } else {
      if (registerInfo.email === '') {
        registerErr.email = '*メールアドレスを入力してください'
      }
      if (registerInfo.password === '') {
        registerErr.password = '*パスワードを入力してください'
      }
    }

    return { loginErr, registerErr }
  }

  // showErr
  const showErr = (errObj) => {
    let errMsg = ''
    for (let err in errObj) {
      errMsg += `${errObj[err]}. `
    }
    alert(`Errors ${errMsg}`)
  }

  // submit
  const submitInfo = (e) => {
    e.preventDefault()
    const errs = validation()

    if (isLoginForm) {
      if (Object.keys(errs.loginErr).length === 0) {
        // ここでfirebaseにemailとpassを投げる
        alert(`loginInfo: ${loginInfo.email}, ${loginInfo.password}`)
        setLoginInfo({ email: '', password: '' })
      } else {
        showErr(errs.loginErr)
      }
    } else {
      if (Object.keys(errs.registerErr).length === 0) {
        // ここでfirebaseにemailとpassを投げる
        alert(`registerInfo: ${registerInfo.email}, ${registerInfo.password}`)
        setRegisterInfo({ email: '', password: '' })
      } else {
        showErr(errs.registerErr)
      }
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
  console.log(loginInfo)
  console.log(registerInfo)
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
          <form className="login-form" onSubmit={submitInfo}>
            <p className="login-title">{isLoginForm ? 'ログイン' : 'アカウント登録'}</p>
            <div className="box">
              <div className="input-place">
                <p>メールアドレス</p>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={isLoginForm ? loginInfo.email : registerInfo.email}
                  onChange={isLoginForm ? inputLoginInfo : inputRegisterInfo}
                  autoFocus
                />
              </div>
              <div className="input-place">
                <p>パスワード</p>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={isLoginForm ? loginInfo.password : registerInfo.password}
                  onChange={isLoginForm ? inputLoginInfo : inputRegisterInfo}
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
      <div type="submit" className="recommend">
        <p>this is recommend.</p>
      </div>
    </div>
  )
}

export default Index
