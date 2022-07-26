import { combineReducers } from 'redux'
import {
  TypedUseSelectorHook,
  useSelector as rawUseSelector,
} from 'react-redux'
import * as post from './data_action/post'
import * as user from './data_action/user'
import * as observer from './data_action/observer'
import * as proportion from './data_action/proportion'

export interface RootStore {
  post: post.PostState
  user: user.UserState
  observer: observer.ObserverState
  proportion: proportion.ProportionState
}

export const reducers = combineReducers({
  post: post.postReducer,
  user: user.userReducer,
  observer: observer.observerReducer,
  proportion: proportion.proportionReducer,
})

export const rootReducer = (state: RootStore | undefined, action: any) => {
  if (action?.type === '') {
    state = undefined
  }
  return reducers(state, action)
}

export const useRootSelector: TypedUseSelectorHook<RootStore> = rawUseSelector
