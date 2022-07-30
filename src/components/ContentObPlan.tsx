import React, { useState, useRef } from 'react'
import { List, Progress, Modal, Button } from 'antd'
import {
  EditOutlined,
  FundViewOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { RootStore } from '../store/modules/reducer'

import ContentObForm from './ContentObForm'

function ContentObPlan() {
  const observer = useSelector((state: RootStore) => {
    return state.observer.items
  })
  const [isModalVisible, isModalVisibleSet] = useState(false)
  const [postId, postIdSet] = useState(0)
  const [modalType, modalTypeSet] = useState('create')
  const form = useRef<HTMLDivElement>(null)

  const handleOk = () => {
    isModalVisibleSet(false)
  }

  const handleCancel = () => {
    isModalVisibleSet(false)
  }

  const editAction = (id: number) => {
    isModalVisibleSet(true)
    postIdSet(id)
    modalTypeSet('edit')
  }
  const viewAction = (id: number) => {}
  const deleteAction = (id: number) => {
    isModalVisibleSet(true)
    postIdSet(id)
    modalTypeSet('delete')
  }

  return (
    <section className="c-section p-2">
      <List
        className="bg-w-c p-2"
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page)
          },
          pageSize: 9,
        }}
        dataSource={observer}
        footer={
          <div>
            <b>ant design</b> footer part
          </div>
        }
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={[
              <Button onClick={() => viewAction(item.id!)}>
                <FundViewOutlined />
              </Button>,
              <Button onClick={() => editAction(item.id!)}>
                <EditOutlined />
              </Button>,
              <Button danger onClick={() => deleteAction(item.id!)}>
                <DeleteOutlined />
              </Button>,
            ]}
            extra={
              <Progress type="dashboard" percent={Number(item.goalRate)} />
            }
          >
            <List.Item.Meta
              title={<a href={item.href}>{item.title}</a>}
              description={item.disc}
            />
            方法について | {item.result}
          </List.Item>
        )}
      />
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <ContentObForm
          ref={form}
          formType={modalType}
          dataId={postId}
          handleClose={() => isModalVisibleSet(false)}
        />
      </Modal>
    </section>
  )
}

export default ContentObPlan
