import React, {useState} from 'react'
import './style.scss'
import { Link } from 'react-router-dom'
import Logo from '../../assets/img/geoHoop_01.png'

const Index = () => {
  const [isValidationClear, setValidation] = useState(false)
  const style = {
    btnStyle: {
      color: 'var(--subColor)',
      background: 'var(--mainColor)'
    }
  }
  return (  
    <div className="index">
      <header>
        <img src={Logo} alt="logo" />
        <Link to="/">
          <p className="geo-hoop">geoHoop</p>
        </Link>
      </header>
      <form>
        <p className="admin">管理者ログイン</p>
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
        <button
          style={isValidationClear ? style.btnStyle : {}}
          disabled={!isValidationClear}
        >
          ログイン
        </button>
      </form>
    </div>
  )
}

export default Index