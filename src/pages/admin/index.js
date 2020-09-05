import React, { useState } from 'react'
import './style.scss'
import { Link } from 'react-router-dom'
import Logo from '../../assets/img/geoHoop_01.png'

const Index = () => {
  const [admin, setAdmin] = useState({ email: '', password: '' })
  const [err, setErr] = useState({ email: '', password: '' })

  const inputAdmin = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value })
    console.log(admin)
    validation()
  }

  const validation = () => {
    let error = { email: '', password: '' }
    error.email = admin.email === '' ? '*メールアドレスを入力してください'　: ''
    error.password = admin.password === '' ? '*パスワードを入力してください' : ''
    console.log(error)
    setErr({ ...err, ...error })
    console.log(err)
  }

  const submitInfo = (e) => {
    e.preventDefault()
    console.log('lets go validation!')
    validation()
    console.log(err)
    if (err.email === '' && err.password === '') {
      // ここでfirebaseにemailとpassを投げる
      console.log(`success: ${admin.email}, ${admin.password}`)
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
            <p className={err.email === '' ? 'nomal-sentence' : 'err-sentence'}>
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