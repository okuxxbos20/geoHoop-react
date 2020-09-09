// import { LoginAction } from './actions'
import { auth, db, FirebaseTimestamp } from '../../firebase/index'

// export const login = (email, password) => {
//   return async (dispatch, getState) => {
//     const state = getState()
//     const isLogin = state.users.isLogin
//     if (!isLogin) {
//       ここでfirebaseのlogin処理をする
//       const userData = await auth
//       dispatch(LoginAction({
//         isLogin: true,
//         bookmarks: [],
//         createdAt: '',
//         email: '',
//         img: '',
//         lastLogin: '',
//         likes: [],
//         name: '',
//         uid: ''
//       }))
//     }
//   }
// }

export const register = (email, password) => {
  return async (dispatch) => {
    if (email === '' || password === '') {
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
          img: '',
          lastLogin: timestamp,
          likes: [],
          uid: uid,
          isAdmin: false,
          updatedAt: timestamp,
          name: '',
        }

        db.collection('users').doc(uid).set(userInitialData).then(() => {
          console.log('success to register!')
        }).catch((err) => {
          alert(err)
        })
      }
    })
  }
}