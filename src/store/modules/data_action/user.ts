import { Action } from "redux"
import { User, GetUser, GetFetchUser } from "../../../types/users"
import { AppDispatch } from "../../index"

export interface UserState {
  users: User[]
  user: GetUser
}

export function initalUserState(): UserState {
  return {
    users: [],
    user: { id: 0, name: "", email: "" },
  }
}

export interface UsersAction extends Action {
  type: string
  users: User[]
}

export interface UserAction extends Action {
  type: string
  user: GetUser
}

export interface UserActionReducer extends Action {
  type: string
  users: User[]
  user: GetUser
}

export interface UserActionFailure extends Action {
  type: string
  err: string
}

export function userReducer(
  state: UserState = initalUserState(),
  action: UserActionReducer
) {
  switch (action.type) {
    case 'users/request':
      return {
        ...state,
        users: [],
      }
    case 'users/success':
      return {
        ...state,
        users: action["users"],
      }
    case 'user/success':
      return {
        ...state,
        user: action["user"],
      }
    case 'user/set':
      return {
        ...state,
        user: action["user"],
      }
    case 'users/failure':
      return {
        ...state,
        users: [],
      }
    default:
      return state
  }
}

export const userFetchDataRequest = (): UsersAction => {
  return {
    type: 'users/request',
    users: [],
  }
}

export const usersFetchDataSuccess = (data: User[]): UsersAction => {
  return {
    type: 'users/success',
    users: data,
  }
}

export const userFetchDataSuccess = (data: GetUser): UserAction => {
  return {
    type: 'user/success',
    user: data,
  }
}

export const userFetchDataFailure = (err: string): UserActionFailure => {
  return {
    type: 'users/failure',
    err: err,
  }
}

// export const getUserData = (token: string) => {
//   return async (dispatch: AppDispatch) => {
//     try {
//       const res = await fetchApi.GetFetch<{ user: GetFetchUser }>(
//         "http://localhost:3001/api/show_user",
//         token
//       );
//       const user = await res.user;
//       dispatch(
//         userFetchDataSuccess({
//           id: user.id,
//           email: user.email,
//           name: user.name,
//         })
//       );
//     } catch (err) {
//       console.log(err);
//       //  return dispatch(postFetchDataFailure(err))
//     }
//   };
// };

// // curl -i -X POST -H "Content-Type: application/json" -d '{"email":"test@dddd.com", "password":"dddd123"}' localhost:3001/api/sign_in
// export const loginData = (sendData: User) => {
//   return async (dispatch: AppDispatch) => {
//     dispatch(userFetchDataRequest());
//     try {
//       const res = await fetchApi.PostFetch<{ email: string; password: string }>(
//         "http://localhost:3001/api/sign_in",
//         sendData
//       );
//       localStorage.setItem("token", res.token);
//       dispatch(getUserData(res.token));
//     } catch (err) {
//       console.log(err);
//       //  return dispatch(postFetchDataFailure(err))
//     }
//   };
// };

// ユーザーの追加機能のケースのみ
// export const AddUserData = (sendData:User) => {
//     return new Promise<void>( (resolve,eject) => {
//       return async (dispatch:Dispatch<AnyAction>) => {
//       dispatch(postFetchDataRequest())
//       const params:object = {
//         method: 'POST',
//         cache: 'no-cache',
//         credentials: 'same-origin',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({post:sendData})
//       }
//       try {
//          const res = await fetch("http://localhost:3001/api/v1/posts", params);
//          res.json().then((res) => {
//           console.log(res)
//           dispatch<any>(getPostData())
//           resolve();
//          })
//       }
//       catch (err) {
//         eject();
//         console.log(err)
//         //  return dispatch(postFetchDataFailure(err))
//       }
//     }
//   })
// }

// export const UpdateUserData = (sendData:User) => {
//   return  (dispatch:Dispatch<AnyAction>) => {
//     return new Promise<void>( async (resolve,eject) => {
//       dispatch(postFetchDataRequest())
//       console.log(sendData)
//       const params:object = {
//         method: 'PATCH',
//         cache: 'no-cache',
//         credentials: 'same-origin',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({post:sendData,id:sendData.id})
//       }
//       try {
//         const res = await fetch("http://localhost:3001/api/v1/posts", params);
//         res.json().then((res) => {
//           console.log(res)
//           dispatch<any>(getPostData())
//           resolve();
//         })
//       }
//       catch (err) {
//         eject();
//         console.log(err)
//         //  return dispatch(postFetchDataFailure(err))
//       }
//     })
//   }
// }

// export const deleteUserData = (id:number) => {
//   return async (dispatch:Dispatch) => {
//     dispatch(postFetchDataRequest())
//     const params:object = {
//       method: 'DELETE',
//       cache: 'no-cache',
//       credentials: 'same-origin',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({id:id})
//     }
//     try {
//        const res = await fetch(`http://localhost:3001/api/v1/posts`,params);
//        res.json().then((res) => {
//         console.log(res)
//         dispatch<any>(getPostData())
//        })
//     }
//     catch (err) {
//       console.log(err)
//       //  return dispatch(postFetchDataFailure(err))
//     }
//   }
// }

// export const getUserData = () => {
//   return (dispatch: Dispatch)  => {
//     dispatch(userFetchDataRequest())
//     fetch("http://localhost:3001/api/v1/posts/index", {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//     }).then((res) => {
//       res.json().then((res) => {
//         dispatch(userFetchDataSuccess(res))
//       })
//       .catch( (err) => {
//         console.log(err)
//         // dispatch(postFetchDataFailure(err))
//       })
//     })
//   }
// }
