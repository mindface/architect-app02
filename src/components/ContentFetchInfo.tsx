import React, { useEffect, useState, useRef } from 'react'
import { Card, Col, Row, Button, Modal, Tag } from 'antd'
import {
  EditOutlined,
  FundViewOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { Post, BodyPart } from '../types/posts'
import { useSelector } from 'react-redux'
import { RootStore } from '../store/modules/reducer'
import { setLabel } from '../helper/Utility'

import ContentForm from './ContentForm'

function ContentFetchInfo() {
  const post = useSelector((state: RootStore) => state.post.postItems)
  const [isModalVisible, isModalVisibleSet] = useState(false)
  const [postId, postIdSet] = useState(0)
  const [modalType, modalTypeSet] = useState('create')
  const form = useRef<HTMLDivElement>(null)

  const showModal = () => {
    isModalVisibleSet(true)
  }

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
      <Row gutter={16}>
        {post.map((item: Post) => {
          return (
            <Col span={8} key={item.id}>
              <Card
                title={item.goal}
                bordered={false}
                style={{ marginBottom: 16 }}
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
              >
                <p>{item.disc}</p>
                <p>{item.createAt}</p>
                <p>
                  <Tag color="#108ee9">{setLabel(item.category)}</Tag>
                </p>
              </Card>
            </Col>
          )
        })}
      </Row>
      <Modal
        title="Basic Modal"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <ContentForm
          ref={form}
          formType={modalType}
          dataId={postId}
          handleClose={() => isModalVisibleSet(false)}
        />
      </Modal>
    </section>
  )
}

export default ContentFetchInfo
