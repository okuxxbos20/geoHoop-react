import { LoginAction, LogoutAction } from './actions'
import { auth, db, FirebaseTimestamp } from '../../firebase/index'
import { push } from 'connected-react-router'

export const listenAuthState = () => {
  return async (dispatch) => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid
        const timestamp = FirebaseTimestamp.now()

        db.collection('users').doc(uid).get().then((snapshot) => {
          const data = snapshot.data()
          dispatch(LoginAction({
            bookmarks: data.bookmarks,
            createdAt: data.createdAt,
            email: data.email,
            followingPrefecture: data.followingPrefecture,
            img: data.img,
            lastLogin: timestamp,
            likes: data.likes,
            loginCount: data.loginCount,
            uid: uid,
            isAdmin: data.isAdmin,
            updatedAt: data.updatedAt,
            name: data.name,
          }))
        }).catch((err) => console.log(err))

        const uref = db.collection('users').doc(uid)
        db.runTransaction((transaction) => {
          return transaction.get(uref).then((data) => {
            if (!data) {
              console.log('data dose not exist.')
            }
            transaction.update(uref, {
              lastLogin: timestamp,
              loginCount: data.data().loginCount + 1
            })
          }).then(() => {
            console.log('seccess to transaction!(auth)')
          }).catch((err) => {
            console.log(`err ${err}`)
          })
        })
      } else {
        console.log('plz login...')
      }
    })
  }
}

export const LoginWithEmail = (email, password) => {
  return async (dispatch) => {
    if (email === '' || password === '') {
      alert('必須項目が未入力です')
      return false
    }
    return auth.signInWithEmailAndPassword(email, password).then((result) => {
      const user = result.user
      if (user) {
        const uid = user.uid
        const timestamp = FirebaseTimestamp.now()
        db.collection('users').doc(uid).get().then((snapshot) => {
          const data = snapshot.data()
          dispatch(LoginAction({
            bookmarks: data.bookmarks,
            createdAt: data.createdAt,
            email: data.email,
            followingPrefecture: data.followingPrefecture,
            img: data.img,
            lastLogin: timestamp,
            likes: data.likes,
            loginCount: data.loginCount,
            uid: uid,
            isAdmin: data.isAdmin,
            updatedAt: data.updatedAt,
            name: data.name,
          }))
        }).catch((err) => {
          alert(err)
        })

        const uref = db.collection('users').doc(uid)
        db.runTransaction((transaction) => {
          return transaction.get(uref).then((data) => {
            if (!data) {
              console.log('data dose not exist.')
            }
            transaction.update(uref, {
              lastLogin: timestamp,
              loginCount: data.data().loginCount + 1
            })
          }).then(() => {
            console.log('seccess to transaction!')
          }).catch((err) => {
            console.log(`err ${err}`)
          })
        })
      }
    }).catch((err) => {
      alert(err)
    })
  }
}

export const RegisterWithEmail = (name, email, password) => {
  return async () => {
    if (name === '' || email === '' || password === '') {
      alert('必須項目が未入力です')
      return false
    }
    return auth.createUserWithEmailAndPassword(email, password).then((result) => {
      const user = result.user
      if (user) {
        const uid = user.uid
        const timestamp = FirebaseTimestamp.now()
        const userInitialData = {
          bookmarks: [],
          createdAt: timestamp,
          email: email,
          followingPrefecture: [],
          img: '',
          lastLogin: timestamp,
          loginCount: 0,
          likes: [],
          uid: uid,
          isAdmin: false,
          updatedAt: timestamp,
          name: name,
        }

        db.collection('users').doc(uid).set(userInitialData).then(() => {
          console.log('success to register!')
        }).catch((err) => {
          alert(err)
        })
      }
    }).catch((err) => {
      alert(err)
    })
  }
}

export const Logout = () => {
  return async (dispatch) => {
    auth.signOut().then(() => {
      dispatch(LogoutAction())
      dispatch(push('/'))
    }).catch((err) => {
      console.log(err)
    })
  }
}

export const getAllUsers = () => {
  return async () => {
    db.collection('users').get().then((snapshot) => {
      const data = snapshot.data()
      console.log(data)
      console.log('hey all user')
    }).catch((err) => console.log(err))
  }
}