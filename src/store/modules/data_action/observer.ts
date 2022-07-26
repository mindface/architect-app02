import { Store, Action, Dispatch, AnyAction } from 'redux'
import { Observer, SendObserver } from '../../../types/observer'
import { RootStore } from '../reducer'

export interface ObserverState {
  isFetching: boolean
  items: Observer[]
  item: Observer
}

export function initalObserverState(): ObserverState {
  const _items = localStorage.getItem('observerItems') as string
  let items: Observer[] = JSON.parse(_items) ? JSON.parse(_items) : []
  if (typeof items === 'string' || items.length === 0 || items === null)
    items = [
      {
        id: 1,
        title: '方法利用後の結果',
        href: 'http://',
        disc: 'サーブの向上',
        differenceInfo: '',
        result: '',
        methodId: '',
        goalRate: '',
        goalScore: 0,
        playScore: 0,
      },
      {
        id: 2,
        title: '方法利用後の結果02',
        href: 'http://',
        disc: 'サーブの向上',
        differenceInfo: '',
        result: '',
        methodId: '',
        goalRate: '30',
        goalScore: 0,
        playScore: 0,
      },
      {
        id: 3,
        title: '方法利用後の結果03',
        href: 'http://',
        disc: 'サーブの向上',
        differenceInfo: '',
        result: '',
        methodId: '',
        goalRate: '40',
        goalScore: 0,
        playScore: 0,
      },
    ]
  return {
    isFetching: true,
    items: items,
    item: {
      id: 1,
      title: '方法利用後の結果',
      href: 'http://',
      disc: 'サーブの向上',
      differenceInfo: '',
      result: '',
      methodId: '',
      goalRate: '50',
      goalScore: 0,
      playScore: 0,
    },
  }
}

export interface ObserverAction extends Action {
  type: string
  items: Observer[]
  item: Observer | any
  dataId?: number
}

export interface ObserverActionFailure extends Action {
  type: string
  err: string
}

export function observerReducer(
  state: ObserverState = initalObserverState(),
  action: ObserverAction
) {
  switch (action.type) {
    case 'observer/request':
      return {
        ...state,
        isFetching: true,
        items: [],
      }
    case 'observer/success':
      return {
        ...state,
        isFetching: false,
        items: action['items'],
      }
    case 'observer/failure':
      return {
        ...state,
        isFetching: false,
        items: [],
      }
    case 'observer/add':
      localStorage.setItem('observerItems', JSON.stringify(action['item']))
      return {
        ...state,
        isFetching: false,
        items: action['item'],
      }
    case 'observer/set':
      localStorage.setItem('observerItems', JSON.stringify(action['items']))
      return {
        ...state,
        isFetching: false,
        items: action['items'],
      }
    case 'observer/update':
      const updateList = state.items.map((item: Observer) => {
        if (item.id === action['item']?.id) {
          return action['item']
        }
        return item
      })
      localStorage.setItem('observerItems', JSON.stringify(updateList))
      return {
        ...state,
        isFetching: false,
        items: updateList,
      }
    case 'observer/delete':
      const deleteList = state.items.filter((item: Observer) => {
        if (item.id !== action['dataId']) {
          return item
        }
      })
      localStorage.setItem('items', JSON.stringify(deleteList))
      return {
        ...state,
        isFetching: false,
        items: deleteList,
      }
    default:
      return state
  }
}

export const postFetchDataRequest = (): ObserverAction => {
  return {
    type: 'observer/request',
    items: [],
    item: {},
  }
}

export const postFetchDataSuccess = (data: Observer[]): ObserverAction => {
  return {
    type: 'observer/success',
    items: data,
    item: {},
  }
}

export const postFetchDataFailure = (err: string): ObserverActionFailure => {
  return {
    type: 'observer/failure',
    err: err,
  }
}
