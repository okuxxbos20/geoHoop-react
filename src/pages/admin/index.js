import React, {useState} from 'react'
import './style.scss'
import { Link } from 'react-router-dom'
import Logo from '../../assets/img/geoHoop_01.png'

const Index = () => {
  const [admin, setAdmin] = useState({ email: '', password: '' })
  const [err, setErr] = useState({ email: '', password: '' })

  const inputAdmin = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value })
    console.log(admin)
  }

  const validation = () => {
    console.log(`admin :${admin}`)
    if (admin.email === '') {
      setErr({ ...err, email: '*メールアドレスを入力してください' })
      console.log(1)
      console.log(err)
    } else {
      setErr({ email: '', password: '' })
      console.log(2)
    }
    console.log(err)
    if (admin.password === '') {
      setErr({ ...err, password: '*パスワードを入力してください' })
      console.log(3)
    } else {
      setErr({ email: '', password: '' })
      console.log(4)
    }
    console.log(err)
  }

  const submitInfo = (e) => {
    e.preventDefault()
    validation()
    if (err.email === '' && err.password === '') {
      // ここでfirebaseにemailとpassを投げる
      alert(`success: ${admin.email}, ${admin.password}`)
      setAdmin({ email: '', password: '' })
    } else {
      alert(`Error: ${err.email}, ${err.password}`)
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
      <form onSubmit={submitInfo}>
        <p className="admin">管理者ログイン</p>
        <div className="box">
          <div className="input-place">
            <p className={err.email === '' ? 'nomal-sentence' : 'nomal-sentence'}>
              {err.email === '' ? 'メールアドレス' : err.email}
            </p>
            <input
              type="email"
              name="email"
              value={admin.email}
              onChange={inputAdmin}
            />
          </div>
          <div className="input-place">
            <p className={err.password === '' ? 'nomal-sentence' : 'err-sentence'}>
              {err.password === '' ? 'パスワード' : err.password}
            </p>
            <input
              type="password"
              name="password"
              value={admin.password}
              onChange={inputAdmin}
            />
          </div>
        </div>
        <button type="submit">ログイン</button>
      </form>
    </div>
  )
}

export default Index