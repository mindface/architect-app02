import React, { useState, ReactNode, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Input, Typography, List, Space, Modal } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../store'

function PhasedListInfo() {
  const dispatch: AppDispatch = useDispatch()
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true)
  const [selectView, selectViewSet] = useState<string>('')
  const [path, pathSet] = useState<string>('')
  const [label, labelSet] = useState<string>('')
  const [isModalVisible, isModalVisibleSet] = useState(false)
  const [isModalId, isModalIdSet] = useState(0)
  const [stateList, stateListSet] = useState([
    {
      id: 1,
      path: path,
      label: label,
    },
  ])

  const showModal = (id?: number) => {
    isModalVisibleSet(true)
    if (id) isModalIdSet(id)
  }

  const handleCancel = () => {
    isModalVisibleSet(false)
  }

  const setValue = (type: string, value: string) => {
    switch (type) {
      case 'path':
        pathSet(value)
        break
      case 'label':
        labelSet(value)
        break
    }
  }

  const addAction = () => {
    stateListSet([
      ...stateList,
      {
        id: stateList.length + 1,
        path: path,
        label: label,
      },
    ])
  }

  const editAction = () => {
    const list = stateList.map((item) => {
      if (item.id === isModalId)
        return { id: item.id, path: path, label: label }
      return item
    })
    console.log(list)
    stateListSet(list)
  }

  const deleteAction = (id: number) => {
    const list = stateList.filter((item) => item.id !== id)
    stateListSet(list)
  }

  return (
    <div>
      <Card style={{ maxWidth: 660 }}>
        <div className="input-box pb-2">
          <Space direction="vertical" size="middle">
            <Input onChange={(e) => setValue('path', e.target.value)} />
            <Input onChange={(e) => setValue('label', e.target.value)} />
            <Button type="primary" onClick={addAction}>
              追加
            </Button>
          </Space>
        </div>
        <div className="view-list">
          <List
            header={<div>追加されたサービス</div>}
            bordered
            dataSource={stateList}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button onClick={() => showModal(item.id)}>edit</Button>,
                  <Button danger onClick={() => deleteAction(item.id)}>
                    delete
                  </Button>,
                ]}
              >
                <Typography.Text mark>{item.id}</Typography.Text>
                <Typography.Text>
                  <a href={item.path} target={'_new'}>
                    {item.label}
                  </a>
                </Typography.Text>
              </List.Item>
            )}
          />
          <Modal
            title="edit"
            open={isModalVisible}
            onOk={() => editAction()}
            onCancel={handleCancel}
          >
            <Space direction="vertical" size="middle">
              <Input onChange={(e) => setValue('path', e.target.value)} />
              <Input onChange={(e) => setValue('label', e.target.value)} />
            </Space>
          </Modal>
        </div>
      </Card>
    </div>
  )
}

export default PhasedListInfo
