import { createSelector } from 'reselect'

const usersSelector = (state) => state.users

export const getIsLogin = createSelector(
  [usersSelector],
  state => state.isLogin
)

export const getUserId = createSelector(
  [usersSelector],
  state => state.uid
)