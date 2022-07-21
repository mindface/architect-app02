import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

function Header() {
  const pageList = [
    { id: "/", label: "home" },
    { id: "/about", label: "about" },
    { id: "/infoSettings", label: "infoSettings" },
    { id: "/record", label: "record" },
  ];
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <header className="header pl-2 pt-1 pb-1 bg-w-c border-b">
        <div className="inner flex flex-just-sb pl-2 pr-2">
         <div className="logo">
          <img src="/logo.png" alt="" />
         </div>
         <Button type="primary" onClick={showDrawer}>
          <MenuOutlined />
         </Button>
        </div>
        <Drawer title="メニュー" placement="right" onClose={onClose} visible={visible}>
          <ul className="list">
            {pageList.map((item: { id: string; label: string }) => {
              return (
                <li
                  className="item"
                  key={item.id}
                >
                 <Link className="link d-i p-1" to={item.id} onClick={() => setVisible(false)} >{item.label}</Link>
                </li>
              );
            })}
          </ul>
        </Drawer>
      </header>
    </>
  );
}

export default Header;
