import React, { useState, ReactNode, useEffect } from 'react'
import { Button, Card, Modal, Select, Empty, Input, Tabs } from 'antd'
import type { TabsProps } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { RootStore } from '../store/modules/reducer'
import { AppDispatch } from '../store'
import { Post } from '../types/posts'

import PhasedForm from '../components/PhasedForm'
import PhasedListInfo from '../components/PhasedListInfo'

function ContentPhased() {
  const dispatch: AppDispatch = useDispatch()
  const posts = useSelector((state: RootStore) => state.post.postItems)
  const [cardPost, cardPostSet] = useState<Post[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)

  const items: TabsProps['items'] = [
    {
      key: "1",
      label: "考察入力",
      children: <PhasedForm inputOn={cardPost.length === 0 ? false : true} />,
    },
    {
      key: "2",
      label: "関連サービス",
      children: <PhasedListInfo />,
    }
  ]

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const addCardItems = () => {
    const list = posts.filter((item: Post) => selectedItems.includes(item.disc))
    cardPostSet(list)
  }

  const [selectedItems, setSelectedItems] = useState<string[]>([])

  return (
    <div className="content-phased">
      <Button type="primary" onClick={showModal}>
        カードの追加
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Select
          mode="multiple"
          placeholder="Inserted are removed"
          value={selectedItems}
          onChange={setSelectedItems}
          style={{ width: '100%' }}
        >
          {posts.map((item) => (
            <Select.Option key={item.id} value={item.disc}>
              {item.disc}
            </Select.Option>
          ))}
        </Select>
        <div className="p-1">
          <Button type="primary" onClick={addCardItems}>
            Add pos
          </Button>
        </div>
      </Modal>
      <div className="phased pt-2 flex">
        <div className="card-box pr-2">
          {cardPost.map((item: Post) => (
            <>
              <Card
                key={item.id}
                title={item.category}
                className="mb-2"
                extra={<a href="#">More</a>}
                style={{ width: 300 }}
              >
                <p>{item.disc}</p>
                <p>{item.useTime}</p>
                <p>{item.goal}</p>
              </Card>
            </>
          ))}
          {cardPost.length == 0 && <Empty />}
        </div>
        <div className="input-box flex-1">
          <Tabs defaultActiveKey="1" items={items}></Tabs>
        </div>
      </div>
    </div>
  )
}

export default ContentPhased
