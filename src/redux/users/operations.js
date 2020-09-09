// import { auth } from "firebase"
// import { LoginAction } from './actions'

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