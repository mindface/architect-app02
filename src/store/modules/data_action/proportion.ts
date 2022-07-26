import { Store, Action, Dispatch, AnyAction } from 'redux'
import { Proportion } from '../../../types/proportion'

export interface ProportionState {
  isFetching: boolean
  items: Proportion[]
  item: Proportion
}

export function initalProportionState(): ProportionState {
  const _items = localStorage.getItem('proportionItems') as string
  let items: Proportion[] = _items ? JSON.parse(_items) : []
  const _item = localStorage.getItem('proportionItem') as string
  let item: Proportion = _item ? JSON.parse(_item) : {}

  if (typeof items === 'string' || items.length === 0 || items === null)
    items = [
      {
        id: 1,
        title: '',
        level: 0,
        doing: 0,
        planing: 0,
        play: 0,
      },
    ]
  if (typeof item === 'string' || !item?.level || item === null)
    item = {
      id: 1,
      title: '',
      level: 0,
      doing: 0,
      planing: 0,
      play: 0,
    }

  return {
    isFetching: true,
    items: items,
    item: item,
  }
}

export interface ProportionAction extends Action {
  type: string
  items: Proportion[]
  item: Proportion | any
  dataId?: number
}

export interface ProportionActionFailure extends Action {
  type: string
  err: string
}

export function proportionReducer(
  state: ProportionState = initalProportionState(),
  action: ProportionAction
) {
  switch (action.type) {
    case 'proportion/request':
      return {
        ...state,
        isFetching: true,
        items: [],
      }
    case 'proportion/success':
      return {
        ...state,
        isFetching: false,
        items: action['items'],
      }
    case 'proportion/failure':
      return {
        ...state,
        isFetching: false,
        items: [],
      }
    case 'proportion/add':
      localStorage.setItem('proportionItems', JSON.stringify(action['item']))
      return {
        ...state,
        isFetching: false,
        items: action['item'],
      }
    case 'proportion/set':
      localStorage.setItem('proportionItem', JSON.stringify(action['item']))
      return {
        ...state,
        isFetching: false,
        item: action['item'],
      }
    case 'proportion/update':
      const updateList = state.items.map((item: Proportion) => {
        if (item.id === action['item']?.id) {
          return action['item']
        }
        return item
      })
      localStorage.setItem('proportionItems', JSON.stringify(updateList))
      return {
        ...state,
        isFetching: false,
        items: updateList,
      }
    case 'proportion/delete':
      const deleteList = state.items.filter((item: Proportion) => {
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

export const postFetchDataRequest = (): ProportionAction => {
  return {
    type: 'proportion/request',
    items: [],
    item: {},
  }
}

export const postFetchDataSuccess = (data: Proportion[]): ProportionAction => {
  return {
    type: 'proportion/success',
    items: data,
    item: {},
  }
}

export const postFetchDataFailure = (err: string): ProportionActionFailure => {
  return {
    type: 'proportion/failure',
    err: err,
  }
}
