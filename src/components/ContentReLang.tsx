import React, { useState, ReactNode } from 'react'
import { Button, Card, Input, Select, List, Typography } from 'antd'
import type { Moment } from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { RootStore } from '../store/modules/reducer'
import { AppDispatch } from '../store'
import { Post } from '../types/posts'

import searchtext01 from "../info/searchtext01.json";
import searchtext02 from "../info/searchtext02.json";
import searchtext03 from "../info/searchtext03.json";

const { Option } = Select;

type ViewList = { id: number; text: string; }

function ContentReLang() {
  const dispatch: AppDispatch = useDispatch()
  const posts = useSelector((state: RootStore) => state.post.postItems)
  const [modalPost, modalPostSet] = useState<Post>()
  const [baseText, baseTextSet] = useState("")
  const [viewListNumber, viewListNumberSet] = useState(1)
  const [viewList, viewListSet] = useState([
    searchtext01,
    searchtext02,
    searchtext03
  ])

  const handleTextSet = (value:string) => {
    console.log(value)
    viewListNumberSet(Number(value))
  }

  return (
    <div className="reLang">
      <Card
        className="mb-2"
        extra={<a href="#">More</a>}
        style={{ width: '100%' }}
      >
        <Input
          onChange={(e) => baseTextSet(e.target.value)}
        />
      </Card>
      <Card
        className="mb-2"
        extra={<a href="#">More</a>}
        style={{ width: '100%' }}
      >
        <List
          header={<div>
            実行情報
            <Select
              style={{ width: 120 }}
              onChange={handleTextSet}
            >
              <Option value={1}>01</Option>
              <Option value={2}>02</Option>
              <Option value={3}>03</Option>
            </Select>
          </div>}
          footer={<div>Footer</div>}
          bordered
        >
          <List.Item>
            <p>意識している改善の身体部位</p>
            <Typography.Text mark>{modalPost?.part}</Typography.Text>
          </List.Item>
          {viewList[viewListNumber-1].map((item) => <List.Item>
            <p><a href={`https://www.google.com/search?q=${baseText}${item.text}`} target="_brank">{baseText}{item.text}</a></p>
            <Typography.Text mark>{modalPost?.disc}</Typography.Text>
          </List.Item>)}
          <List.Item>
            <p>目的</p>
            <Typography.Text mark>{modalPost?.goal}</Typography.Text>
          </List.Item>
        </List>
      </Card>
    </div>
  )
}

export default ContentReLang
