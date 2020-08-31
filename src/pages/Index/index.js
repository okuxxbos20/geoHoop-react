import React, {useState} from 'react'
import './style.scss'
import Header from '../../component/Header/'
import SunsetImg from '../../assets/img/sunset.jpg'
import { GoogleIcon } from '../../assets/icons'

const Index = () => {
  const [isLoginFormOpen, setLoginForm] = useState(false)
  const mainStyle = {
    backgroundImage: `url(${SunsetImg})`
  }
  return (
    <div>
      <Header
        color='#e8ecf1'
        background='transparent'
        setLoginForm={() => setLoginForm(!isLoginFormOpen)}
      />
      <main style={mainStyle}>
        {isLoginFormOpen &&
          <form className="login-form">
          <p className="login-title">ログイン</p>
          <div className="box">
            <div className="input-place">
              <p>メールアドレス</p>
              <input type="email" />
            </div>
            <div className="input-place">
              <p>パスワード</p>
              <input type="password" />
            </div>
          </div>
          <GoogleIcon />
          <button>ログイン</button>
          <p class="switch-method">新規ユーザは<span>こちら</span></p>
        </form>
        }
      </main>
    </div>
  )
}

export default Index
