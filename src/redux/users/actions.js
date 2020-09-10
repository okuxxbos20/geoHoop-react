export const LOG_IN = 'LOG_IN'

export const LoginAction = (userState) => {
  return {
    type: 'LOG_IN',
    payload: {
      isLogin: true,
      bookmarks: userState.bookmarks,
      createdAt: userState.createdAt,
      email: userState.email,
      img: userState.img,
      lastLogin: userState.lastLogin,
      loginCount: userState.loginCount,
      likes: userState.likes,
      uid: userState.uid,
      isAdmin: userState.isAdmin,
      updatedAt: userState.updatedAt,
      name: userState.name,
    }
  }
}

export const LOG_OUT = 'LOG_OUT'

export const LogOutAction = () => {
  return {
    type: 'LOG_OUT',
    payload: {
      isSignedIn: false,
      uid: '',
      name: ''
    }
  }
}