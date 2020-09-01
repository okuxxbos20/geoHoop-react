import React, {useState} from 'react'
import './style.scss'
import Header from '../../component/Header/'
import { Sunset, Court } from '../../assets/img/'
import { GoogleIcon } from '../../assets/icons'

const Index = () => {
  const [isLoginFormOpen, setLoginForm] = useState(false)
  const [loginEmail, setEmail] = useState(null)
  const [loginPassword, setPassword] = useState(null)

  const checkEmail = (email) => {
    setEmail(email)
    console.log(loginEmail)
    if (loginEmail === null || loginEmail === '') {
    }
  }

  const checkLoginPassword = (password) => {
    setPassword(password)
    if (loginPassword === null || loginPassword === '') {
    }
  }

  const randomImg = [Sunset, Court]
  const ranNum = Math.floor(Math.random() * randomImg.length)
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
        setLoginForm={() => setLoginForm(!isLoginFormOpen)}
      />
      <main style={style.mainStyle}>
        {isLoginFormOpen &&
          <form className="login-form">
          <p className="login-title">ログイン</p>
          <div className="box">
            <div className="input-place">
              <p>メールアドレス</p>
              <input type="email" onChange={(e) => checkEmail(e.target.value)} />
            </div>
            <div className="input-place">
              <p>パスワード</p>
              <input type="password" onChange={(e) => checkLoginPassword(e.target.value)} />
            </div>
          </div>
          <div className="google-login">
            <GoogleIcon />
          </div>
          <button>ログイン</button>
          <p className="switch-method">新規ユーザは<span>こちら</span></p>
        </form>
        }
      </main>
    </div>
  )
}

export default Index
