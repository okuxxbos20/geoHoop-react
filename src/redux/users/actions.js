export const LOG_IN = 'LOG_IN'

export const LoginAction = (userState) => {
  return {
    type: 'LOG_IN',
    payload: {
      isSignedIn: true,
      uid: userState.id,
      name: userState.name
    }
  }
}

export const SIGN_OUT = 'LOG_OUT'

export const signOutAction = () => {
  return {
    type: 'LOG_OUT',
    payload: {
      isSignedIn: false,
      uid: '',
      name: ''
    }
  }
}