import { Store, Action, Dispatch, AnyAction } from "redux";
import { Posts, Post, SendPosts } from "../../../types/posts";
import { setDay } from "../../../helper/Utility";

export interface PostState {
  isFetching: boolean;
  postItems: Post[];
  postItem: {
    category: string;
    useTime: string;
    part: string;
    disc: string;
    goal: string;
  }
}

export function initalPostsState(): PostState {
  const _postItems = localStorage.getItem('postItems') as string;
  let postItems:Post[] = JSON.parse(_postItems) ? JSON.parse(_postItems) : []
  if( typeof postItems === 'string' || postItems === null || postItems.length === 0 ) postItems = [
    {
      category: "arm",
      disc: "情報のレベライズ01",
      goal: "サーブの向上",
      id: 1,
      part: "打つ時の幅",
      useTime: "22",
      createAt: setDay(),
    },
    {
      category: "arm",
      disc: "情報のレベライズ02",
      goal: "サーブの向上",
      id: 2,
      part: "打つ時の幅",
      useTime: "22",
      createAt: setDay(),
    },
    {
      category: "arm",
      disc: "情報のレベライズ03",
      goal: "サーブの向上",
      id: 3,
      part: "打つ時の幅",
      useTime: "22",
      createAt: setDay(),
    },
    {
      category: "arm",
      disc: "情報のレベライズ04",
      goal: "サーブの向上",
      id: 4,
      part: "打つ時の幅",
      useTime: "22",
      createAt: setDay(),
    }
  ]
  return {
    isFetching: true,
    postItems: postItems,
    postItem: {
      category: '',
      useTime: '0',
      part: '',
      disc: '',
      goal: '',
    }
};
}

export interface PostAction extends Action {
  type: string;
  postItems: Post[];
  postItem: Post | any;
  dataId?: number
}

export interface PostActionFailure extends Action {
  type: string;
  err: string;
}

export function postReducer(
  state: PostState = initalPostsState(),
  action: PostAction
) {
  switch (action.type) {
    case 'post/request':
      return {
        ...state,
        isFetching: true,
        postItems: [],
      };
    case 'post/success':
      return {
        ...state,
        isFetching: false,
        postItems: action["postItems"],
      };
    case 'post/failure':
      return {
        ...state,
        isFetching: false,
        postItems: [],
      };
    case 'post/add':
      localStorage.setItem('postItems',JSON.stringify(action['postItems']))
      return {
        ...state,
        isFetching: false,
        postItems: action['postItems'],
      };
    case 'post/set':
      localStorage.setItem('postItems',JSON.stringify(action['postItems']))
      return {
        ...state,
        isFetching: false,
        postItems: action['postItems'],
      };
    case 'post/update':
      const updateList = state.postItems.map((item:Post) => {
        if(item.id === action['postItem']?.id) {
          return action['postItem']
        }
        return item
      })
      localStorage.setItem('postItems',JSON.stringify(updateList))
      return {
        ...state,
        isFetching: false,
        postItems: updateList
      };
    case 'post/delete':
      const deleteList = state.postItems.filter((item:Post) => {
        if(item.id !== action['dataId']) {
          return item
        }
      })
      localStorage.setItem('postItems',JSON.stringify(deleteList))
      return {
        ...state,
        isFetching: false,
        postItems: deleteList
      };
    default:
      return state;
  }
}

export const postFetchDataRequest = (): PostAction => {
  return {
    type: 'post/request',
    postItems: [],
    postItem: {}
  };
};

export const postFetchDataSuccess = (data: Post[]): PostAction => {
  return {
    type: 'post/success',
    postItems: data,
    postItem: {}
  };
};

export const postFetchDataFailure = (err: string): PostActionFailure => {
  return {
    type: 'post/failure',
    err: err,
  };
};

export const AddPostData = (sendData: Post[]) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(postFetchDataRequest());
    dispatch(postFetchDataSuccess(sendData))
      //  return dispatch(postFetchDataFailure(err))
  };
};

export const UpdatePostData = (sendData: Posts[]) => {
  return async (dispatch: Dispatch<AnyAction>,store:Store,state:any) => {
    dispatch(postFetchDataRequest());
    console.log(store.getState)
    // dispatch(postFetchDataSuccess(sendData))
      //  return dispatch(postFetchDataFailure(err))
  };
};

// export const UpdatePostData = (sendData: Posts) => {
//   return async (dispatch: Dispatch<AnyAction>) => {
//     dispatch(postFetchDataRequest());
//     try {
//       fetchApi
//         .PutFetch<{ post: Posts; id?: number }>(
//           `http://localhost:3001/api/v1/posts`,
//           { post: sendData, id: sendData.id }
//         )
//         .then((data) => {
//           console.log(data);
//           dispatch<any>(getPostData());
//         });
//     } catch (err) {
//       console.log(err);
//       //  return dispatch(postFetchDataFailure(err))
//     }
//   };
// };

// export const deletePostData = (id: number) => {
//   return async (dispatch: Dispatch) => {
//     dispatch(postFetchDataRequest());
//     try {
//       fetchApi
//         .DeleteFetch(`http://localhost:3001/api/v1/posts`, id)
//         .then((data) => {
//           dispatch<any>(getPostData());
//         });
//     } catch (err) {
//       console.log(err);
//       //  return dispatch(postFetchDataFailure(err))
//     }
//   };
// };

// export const getPostData = () => {
//   return (dispatch: Dispatch) => {
//     dispatch(postFetchDataRequest());
//     fetchApi
//       .GetFetch<Posts[]>(`http://localhost:3001/api/v1/posts/index`)
//       .then((data) => {
//         dispatch(postFetchDataSuccess(data));
//       })
//       .catch((err) => {
//         console.log(err);
//         // dispatch(postFetchDataFailure(err))
//       });
//   };
// };
