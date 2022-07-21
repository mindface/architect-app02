import React, { useState ,ReactNode } from 'react';
import type { BadgeProps } from 'antd';
import { Button, Badge, Calendar, Modal, Divider, List, Typography } from 'antd';
import type { Moment } from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../store/modules/reducer";
import { AppDispatch } from "../store";
import { setDay } from '../helper/Utility';
import { Post } from "../types/posts";

type ListData = {
  type:string
  content: ReactNode
}

function ContentCustom(){
  const dispatch:AppDispatch = useDispatch()
  const posts = useSelector((state:RootStore) => state.post.postItems)
  const [modalPost,modalPostSet] = useState<Post>();
  const [modalView,modalPostViewSet] = useState(false);

  const modalPostAction = (post: Post) => {
    modalPostViewSet(true)
    modalPostSet(post)
  }

  const getListData = (value: Moment, posts: Post[] ) => {
    let listData: ListData[] = [];
  
    posts.forEach((item:Post) => {
      const day = `${value.year()}/${value.month()+1}/${value.date()}`
      if(day === setDay(item.createAt) ){
        listData.push({ type: 'success', content: <Button onClick={() => modalPostAction(item)}>{item.disc}</Button> })
      }
    })
    return listData || [];
  };
  
  const getMonthData = (value: Moment) => {
    if (value.month() === 8) {
      return 1394;
    }
  };

  const monthCellRender = (value: Moment) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Moment) => {
    const listData = getListData(value,posts);
    return (
      <ul className="events">
        {listData.map((item:ListData,index:number) => (
          <li key={index}>
            <Badge status={item.type as BadgeProps['status']} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const handleOk = () => {
    modalPostViewSet(false);
  }

  const handleCancel = () => {
    modalPostViewSet(false);
  }

  return (
    <div className="record">
      <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
      <Modal
        title="時間で検証方法の確認"
        visible={modalView}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
      <List
        header={<div>実行情報</div>}
        footer={<div>Footer</div>}
        bordered
      >
        <List.Item>
          <p>意識している改善の身体部位</p>
          <Typography.Text mark>{modalPost?.part}</Typography.Text>
        </List.Item>
        <List.Item>
          <p>詳細への説明</p>
          <Typography.Text mark>{modalPost?.disc}</Typography.Text>
        </List.Item>
        <List.Item>
          <p>目的</p>
          <Typography.Text mark>{modalPost?.goal}</Typography.Text>
        </List.Item>
      </List>
      </Modal>
    </div>
  )
}

export default ContentCustom
