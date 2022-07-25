import React, {
  useEffect,
  useState,
  useRef,
} from "react"
import { Typography, Input, Space, Button } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { RootStore } from "../store/modules/reducer"
import { AppDispatch } from "../store"
import { initializeApp } from "firebase/app"
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import firebaseConfig from "../info/firebase-config.json";

const provider = new GoogleAuthProvider();

function ContentLogin() {
  const dispatch:AppDispatch = useDispatch()
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const post = useSelector((state: RootStore) => state.post.postItems)
  const filrebaseUiArea = useRef(null)
  const [state, stateSet] = useState({
    name: "",
    password: "",
  })
  const { Title } = Typography;

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      console.log('sign out')
    })
  }

  const handleLogin = () => {
    provider.setCustomParameters({
      'login_hint': 'in00und@gmail.com'
    });

    signInWithPopup(auth,provider)
      .then((result:any) => {
        const userInfo = result.user
        console.log(result)
        const user = {
          id: userInfo.uid,
          name: userInfo.displayName,
          email: userInfo.email
        }
        dispatch({type:"user/set",user})

      }).catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        const email = error.customData.email
        const credential = GoogleAuthProvider.credentialFromError(error)
        console.log(error)
      });
  }

  useEffect(() => {
  },[])

  return (
    <div className="c-div p-2">
      <Space direction="vertical">
        <Title level={4}>ログイン</Title>
        <Input placeholder="input name" />
        <Input.Password placeholder="input password" />
        <Button onClick={handleLogin}>グーグルアカウントでログイン</Button>
      </Space>
      <div ref={filrebaseUiArea} className="filrebase-ui-area"></div>
    </div>
  )
}

export default ContentLogin
