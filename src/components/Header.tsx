import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Drawer } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import { getAuth, signOut } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { RootStore } from '../store/modules/reducer'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../store'
import firebaseConfig from '../info/firebase-config.json'

import { testerData } from '../helper/Utility'

function Header() {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const user = useSelector((state: RootStore) => state.user.user)
  const pageList = [
    { id: '/', label: 'ホーム' },
    { id: '/about', label: 'このサービスについて' },
    { id: '/infoSettings', label: 'データ操作' },
    { id: '/record', label: 'カレンダーで確認' },
    { id: '/inspection', label: '検証調整' },
    { id: '/patternTrigger', label: '行動サイクルとトリガー' },
    { id: '/phasedLevel', label: '既存アプリのツール単位' },
    { id: '/reLang', label: '調査文字列' },
  ]
  const [visible, setVisible] = useState(false)

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        const user = {
          id: 0,
          name: '',
          email: '',
        }
        dispatch({ type: 'user/set', user })
        onClose()
        navigate('/login')
      })
      .catch((error) => {
        console.log('sign out')
      })
  }

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  useEffect(() => {
    testerData(pageList, 'pageList')
  }, [])

  return (
    <>
      <header className="header pl-2 pt-1 pb-1 bg-w-c border-b">
        <div className="inner flex flex-just-sb pl-2 pr-2">
          <div className="logo">
            <img src="/images/baseLogo.png" alt="" />
          </div>
          {user.name !== '' && (
            <Button type="primary" onClick={showDrawer}>
              <MenuOutlined />
            </Button>
          )}
        </div>
        <Drawer
          title="メニュー"
          placement="right"
          onClose={onClose}
          visible={visible}
        >
          <ul className="list">
            {pageList.map((item: { id: string; label: string }) => {
              return (
                <li className="item" key={item.id}>
                  <Link
                    className="link d-b p-1"
                    to={item.id}
                    onClick={() => setVisible(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
            {user.name !== '' && (
              <li className="item">
                <a
                  className="link d-b p-1"
                  onClick={(e) => {
                    e.preventDefault()
                    handleSignOut()
                  }}
                >
                  ログアウト
                </a>
              </li>
            )}
          </ul>
        </Drawer>
      </header>
    </>
  )
}

export default Header
