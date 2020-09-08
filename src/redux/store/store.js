import {
  createStore as reduxCreateStore,
  combineReducers
} from 'redux'

import { UsersReducer } from '../users/reducers'

const createStore = () => {
  return reduxCreateStore(
    combineReducers({
      users: UsersReducer
    })
  )
}

export default createStore