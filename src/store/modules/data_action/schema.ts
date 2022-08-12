import { Store, Action, Dispatch, AnyAction } from 'redux'
import { Schema, SendSchema } from '../../../types/schema'
import { setDay } from '../../../helper/Utility'

export interface SchemaState {
  isFetching: boolean
  schemaItems: Schema[]
  schemaItem?: Schema
}

export function initalSchemaState(): SchemaState {
  const _postItems = localStorage.getItem('postItems') as string
  // let postItems: Schema[] = JSON.parse(_postItems) ? JSON.parse(_postItems) : []
  // if (
  //   typeof postItems === 'string' ||
  //   postItems === null ||
  //   postItems.length === 0
  // )
  const items = [
    {
      category: 'arm',
      disc: 'data strict01',
      itemId: 'level01',
      id: 1,
      useTime: '22',
      parentId: 'originId',
      createAt: setDay(),
    },
    {
      category: 'arm',
      disc: 'data strict02',
      itemId: 'level02',
      id: 2,
      useTime: '22',
      parentId: 'id',
      createAt: setDay(),
    },
  ]
  return {
    isFetching: true,
    schemaItems: items,
    schemaItem: {
      category: 'arm',
      disc: 'data strict',
      itemId: 'level02',
      id: 2,
      useTime: '22',
      parentId: 'id',
      createAt: setDay(),
    },
  }
}

export interface SchemaAction extends Action {
  type: string
  schemaItems: Schema[]
  schemaItem: Schema | any
  dataId?: number
}

export interface SchemaActionFailure extends Action {
  type: string
  err: string
}

export function schemaReducer(
  state: SchemaState = initalSchemaState(),
  action: SchemaAction
) {
  switch (action.type) {
    case 'schema/request':
      return {
        ...state,
        isFetching: true,
        schemaItems: [],
      }
    case 'schema/success':
      return {
        ...state,
        isFetching: false,
        schemaItems: action['schemaItems'],
      }
    case 'schema/failure':
      return {
        ...state,
        isFetching: false,
        schemaItems: [],
      }
    case 'schema/add':
      localStorage.setItem('postItems', JSON.stringify(action['schemaItems']))
      return {
        ...state,
        isFetching: false,
        schemaItems: action['schemaItems'],
      }
    case 'schema/setItems':
      localStorage.setItem('schemaItems', JSON.stringify(action['schemaItems']))
      return {
        ...state,
        isFetching: false,
        schemaItems: action['schemaItems'],
      }
    case 'schema/create':
      localStorage.setItem('schemaItem', JSON.stringify(action['schemaItem']))
      let list: Schema[] = state.schemaItems
      console.log(action['schemaItem'])
      return {
        ...state,
        isFetching: false,
        schemaItems: [...list, action['schemaItem']],
      }
    case 'schema/update':
      const updateList = state.schemaItems.map((item: Schema) => {
        if (item.id === action['schemaItem']?.id) return action['schemaItem']
        return item
      })
      localStorage.setItem('schemaItems', JSON.stringify(updateList))
      return {
        ...state,
        isFetching: false,
        schemaItems: updateList,
      }
    case 'schema/delete':
      const deleteList = state.schemaItems.filter((item: Schema) => {
        if (item.id !== action['dataId']) {
          return item
        }
      })
      console.log(deleteList)
      localStorage.setItem('postItems', JSON.stringify(deleteList))
      return {
        ...state,
        isFetching: false,
        schemaItems: deleteList,
      }
    default:
      return state
  }
}

export const schemaFetchDataRequest = (): SchemaAction => {
  return {
    type: 'schema/request',
    schemaItems: [],
    schemaItem: {},
  }
}

export const schemaFetchDataSuccess = (data: Schema[]): SchemaAction => {
  return {
    type: 'schema/success',
    schemaItems: data,
    schemaItem: {},
  }
}

export const schemaFetchDataFailure = (err: string): SchemaActionFailure => {
  return {
    type: 'schema/failure',
    err: err,
  }
}

export const AddSchemaData = (sendData: Schema[]) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(schemaFetchDataRequest())
    dispatch(schemaFetchDataSuccess(sendData))
    //  return dispatch(schemaFetchDataFailure(err))
  }
}

export const UpdateSchemaData = (sendData: Schema[]) => {
  return async (dispatch: Dispatch<AnyAction>, store: Store, state: any) => {
    dispatch(schemaFetchDataRequest())
    console.log(store.getState)
    // dispatch(postFetchDataSuccess(sendData))
    //  return dispatch(postFetchDataFailure(err))
  }
}
