import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from './modules/reducer'
import thunkMiddleware from 'redux-thunk'

export const setupStore = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
)
export type AppDispatch = typeof setupStore.dispatch
