import React, { useEffect, useState, useRef } from 'react'
import {
  Typography,
  Card,
  Col,
  Row,
  Space,
  Modal,
  Button,
  Input,
  Select,
} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootStore } from '../store/modules/reducer'
import { AppDispatch } from '../store'
import { getRandom } from '../helper/Utility'
import { Schema } from '../types/schema'
import {
  FileSearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons'
import ElementSchemaControl from './ElementSchemaControl'
import ElementSliderNumber from './ElementSliderNumber'

interface ReSchema extends Schema {
  children: Schema[]
}
const { Title } = Typography
const { Option } = Select

function ContentSchema() {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const schemaItems = useSelector(
    (state: RootStore) => state.schema.schemaItems
  )
  const [modalView, modalPostViewSet] = useState(false)
  const [modaSwitchlView, modaSwitchlViewhSet] = useState('create')
  const [minValue, minValueSet] = useState(0)
  const [maxValue, maxValueSet] = useState(0)
  const [inputValue, inputValueSet] = useState(0)
  const [addObjectKey, addObjectKeySet] = useState('')
  const [addObjectValue, addObjectValueSet] = useState('')
  const [addObject, addObjectSet] = useState({ id: 'number' })

  const [stateData, stateDataSet] = useState([
    {
      listName: '',
      list: [],
    },
  ])

  const setData = (name: string) => {
    const list = []
    for (let index = 0; index < inputValue; index++) {
      list.push({})
    }
    // stateDataSet([...stateData,{listName:name,list:list}])
  }

  const setAddObjectSet = () => {
    addObjectSet({ ...addObject, [addObjectKey]: addObjectValue })
  }

  const [state, stateSet] = useState<Schema>({
    id: -1,
    itemId: `level${schemaItems.length + 1}`,
    category: '',
    useTime: '',
    disc: '',
    parentId: '',
    createAt: '',
  })

  const resetState = () => {
    stateSet({
      id: -1,
      itemId: '',
      category: '',
      useTime: '',
      disc: '',
      parentId: '',
      createAt: '',
    })
  }

  const handleSetState = (type: string, value: string) => {
    stateSet({ ...state, [type]: value })
  }
  const handleSave = (type: string) => {
    const schemaItem = { ...state }
    if (type === 'create') {
      schemaItem.id = schemaItems.length + 1
      dispatch({ type: 'schema/create', schemaItem })
    } else {
      dispatch({ type: 'schema/update', schemaItem })
    }
    modalPostViewSet(false)
  }
  const handleDelete = () => {
    const dataId = state.id
    dispatch({ type: 'schema/delete', dataId })
    modalPostViewSet(false)
  }
  const handleOpen = (type: string, id?: number) => {
    modaSwitchlViewhSet(type)
    if (type === 'input_create') resetState()
    schemaItems.forEach((item) => {
      if (item.id === id) {
        stateSet(item)
      }
    })
    modalPostViewSet(true)
  }

  const handleOk = () => {
    modalPostViewSet(false)
  }

  const handleCancel = () => {
    modalPostViewSet(false)
  }

  const setItems = (id: string) => {
    const list = []
    schemaItems.forEach((a) => {
      if (a.parentId === id) {
        const _a: ReSchema = { ...a, children: [] }
        schemaItems.forEach((b) => {
          if (_a.id === b.parentId) {
            const _b: ReSchema = { ...b, children: [] }
            _a.children.push(_b)
          }
        })
        _a.children.map((b) => {
          let _b: ReSchema = { ...b, children: [] }
          schemaItems.forEach((c) => {
            if (b.id === c.parentId) {
              _b.children.push(c)
            }
          })
          return _b
        })
        list.push(a)
      }
    })
  }

  const setInfo = (objectInfo: any) => {
    const list: { keyValue: string; value: string }[] = []
    for (const key in objectInfo) {
      if (Object.prototype.hasOwnProperty.call(objectInfo, key)) {
        list.push({ keyValue: key, value: objectInfo[key] })
      }
    }
    return list
  }

  useEffect(() => {
    console.log('schemaItems')
    console.log(schemaItems)
  }, [schemaItems])

  return (
    <div className="c-div p-2">
      <Space direction="vertical">
        <Title level={4}>
          データ構造と関連性
          <Button onClick={() => handleOpen('input_create')}>add</Button>
        </Title>
        <ElementSchemaControl schemaItems={schemaItems} />
      </Space>
      <Row gutter={16}>
        {schemaItems.map((item) => (
          <Col key={item.id} span={8}>
            <Card
              title={item.category}
              actions={[
                <Button onClick={() => handleOpen('view')}>
                  <FileSearchOutlined key="setting" />
                </Button>,
                <Button onClick={() => handleOpen('input_edit', item.id)}>
                  <EditOutlined key="edit" />
                </Button>,
                <Button onClick={() => handleOpen('delete', item.id)}>
                  <DeleteOutlined key="ellipsis" />
                </Button>,
              ]}
              bordered={false}
            >
              <p>カラム情報</p>
              {item.disc}
            </Card>
          </Col>
        ))}
      </Row>
      <Modal
        title="時間で検証方法の確認"
        visible={modalView}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {modaSwitchlView.indexOf('input') !== -1 && (
          <Space direction="vertical" style={{ width: '100%' }}>
            : category
            <Input
              value={state.category ? state.category : ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleSetState('category', e.target.value)
              }}
            />
            : useTime
            <Input
              value={state.useTime ? state.useTime : ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleSetState('useTime', e.target.value)
              }}
            />
            : disc [object]
            <Input
              value={state.disc ? state.disc : ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleSetState('disc', e.target.value)
              }}
            />
            : parentId
            <Select
              value={state.parentId ? state.parentId : 'originId'}
              style={{ width: 120 }}
              onChange={(value: string) => handleSetState('parentId', value)}
            >
              <Option value="originId">top level</Option>
              {schemaItems.map((item) => (
                <Option value={item.itemId}>{item.itemId}</Option>
              ))}
            </Select>
            <Button.Group>
              <Button onClick={handleCancel}>cancel</Button>
              <Button onClick={() => handleSave('edit')}>edit</Button>
              <Button onClick={() => handleSave('create')}>save</Button>
            </Button.Group>
            <Title level={4}>データ構造と関連性</Title>
            ランダム数値範囲
            <Input.Group compact>
              <Input
                style={{ width: '30%' }}
                value={addObjectKey}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  addObjectKeySet(e.target.value)
                }
                placeholder="key"
              />
              <Input
                style={{ width: '30%' }}
                value={addObjectValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  addObjectValueSet(e.target.value)
                }
                placeholder="value type (数値か文字列)"
              />
              <Button onClick={setAddObjectSet}>
                <PlusCircleOutlined />
              </Button>
            </Input.Group>
            <div className="view-object">
              {setInfo(addObject).map((item) => (
                <>
                  key:{item.keyValue} | value:{item.value}{' '}
                </>
              ))}
            </div>
            <ElementSliderNumber
              label="最低値"
              value={minValue}
              valueChange={minValueSet}
            />{' '}
            ~
            <ElementSliderNumber
              label="最高値"
              value={maxValue}
              valueChange={maxValueSet}
            />
            <ElementSliderNumber
              label="ループ回数"
              value={inputValue}
              valueChange={inputValueSet}
            />
            <Button onClick={handleCancel}>データを追加</Button>
          </Space>
        )}
        {modaSwitchlView === 'view' && (
          <Space direction="vertical">
            : category : useTime : disc : parentId : useId
            <Button onClick={handleCancel}>cancel</Button>
          </Space>
        )}
        {modaSwitchlView === 'delete' && (
          <Space direction="vertical">
            この操作は取り消せません。削除しますか
            <Button danger onClick={handleDelete}>
              delete
            </Button>
          </Space>
        )}
      </Modal>
    </div>
  )
}

export default ContentSchema
