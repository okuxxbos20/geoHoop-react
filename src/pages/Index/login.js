import React, { useState } from 'react'
import { GoogleIcon } from '../../assets/icons'
import './style.scss'
import { RegisterWithEmail } from '../../redux/users/operations'
import { useDispatch } from 'react-redux'

const Login = (props) => {
  const isLoginForm = props.isLoginForm
  const dispatch = useDispatch()
  // login
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' })
  const inputLoginInfo = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })
  }

  // register
  const [registerInfo, setRegisterInfo] = useState({ name: '', email: '', password: '' })
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
      if (registerInfo.name === '') {
        registerErr.name = '*ユーザネームを入力してください'
      }
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
        dispatch(RegisterWithEmail(registerInfo.name, registerInfo.email, registerInfo.password))
        setRegisterInfo({ name: '', email: '', password: '' })
      } else {
        showErr(errs.registerErr)
      }
    }
  }
  console.log(registerInfo)
  return (
    <form className="login-form" onSubmit={submitInfo}>
    <p className="login-title">{isLoginForm ? 'ログイン' : 'アカウント登録'}</p>
    <div className="box">
      {!isLoginForm &&
        <div className="input-place">
          <p>ユーザーネーム</p>
          <input
            type="text"
            name="name"
            placeholder="your name"
            value={registerInfo.name}
            onChange={(e) => inputRegisterInfo(e)}
            autoFocus
          />
        </div>
      }
      <div className="input-place">
        <p>メールアドレス</p>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={isLoginForm ? loginInfo.email : registerInfo.email}
          onChange={isLoginForm ? inputLoginInfo : inputRegisterInfo}
          autoFocus={isLoginForm}
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
    {isLoginForm &&
      <div className="google-login">
        <GoogleIcon />
      </div>
    }
    {isLoginForm ?
      <button type="submit">ログイン</button>:
      <button type="submit">アカウント作成</button>
    }
    <p className="switch-method">
      {isLoginForm ? '新規ユーザは' : 'ログインは'}
      <span onClick={() => props.setLoginForm()}>こちら</span>
    </p>
  </form>
  )
}

export default Login