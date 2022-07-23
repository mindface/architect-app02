import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Button, Drawer } from "antd"
import { MenuOutlined } from "@ant-design/icons"

function Header() {
  const pageList = [
    { id: "/", label: "ホーム" },
    { id: "/about", label: "このサービスについて" },
    { id: "/infoSettings", label: "データ操作" },
    { id: "/record", label: "カレンダーで確認" },
    { id: "/inspection", label: "検証調整" },
    { id: "/patternTrigger", label: "行動サイクルとトリガー" },
  ]
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  return (
    <>
      <header className="header pl-2 pt-1 pb-1 bg-w-c border-b">
        <div className="inner flex flex-just-sb pl-2 pr-2">
          <div className="logo">
            <img src="/images/baseLogo.png" alt="" />
          </div>
          <Button type="primary" onClick={showDrawer}>
            <MenuOutlined />
          </Button>
        </div>
        <Drawer
          title="メニュー"
          size={'small'}
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
          </ul>
        </Drawer>
      </header>
    </>
  )
}

export default Header
