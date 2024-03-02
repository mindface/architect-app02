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
  Tag,
  AutoComplete,
} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { RootStore } from '../store/modules/reducer'
import { AppDispatch } from '../store'
import { Schema, ReSchema, moveObject, moveObjectItem } from '../types/schema'
import {
  FileSearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  PartitionOutlined,
} from '@ant-design/icons'
import ElementSchemaVisual from './ElementSchemaVisual'
import ElementSliderNumber from './ElementSliderNumber'
import { getRandom } from "../helper/Utility";

const { Title } = Typography
const { Option } = Select
const { TextArea } = Input

function ContentSchema() {
  const dispatch: AppDispatch = useDispatch()
  const schemaItems = useSelector(
    (state: RootStore) => state.schema.schemaItems
  )
  const [modalView, modalPostViewSet] = useState(false)
  const [modaSwitchlView, modaSwitchlViewhSet] = useState('create')
  const [minValue, minValueSet] = useState(0)
  const [maxValue, maxValueSet] = useState(1)
  const [loopValue, loopValueSet] = useState(0)
  const [addObjectKey, addObjectKeySet] = useState('')
  const [addObjectValue, addObjectValueSet] = useState<string>('')
  const [conectPicup, conectPicupSet] = useState('')
  const [addObject, addObjectSet] = useState<moveObject>({ id: 0 })
  const [state, stateSet] = useState<Schema>({
    id: -1,
    itemId: `level${schemaItems.length + 1}`,
    category: '',
    useTime: '',
    disc: '',
    parentId: '',
    createAt: '',
  })
  const [stateData, stateDataSet] = useState<
    { listName: string; list: moveObject[] }[]
  >([{ listName: 'none', list: [] }])

  const AutoCompleteList = (): { value: string }[] =>
    schemaItems.map((item) => {
      return { value: item.itemId }
    })
  const setData = (name: string) => {
    const list = []
    for (let index = 0; index < loopValue; index++) {
      let setObject = {
        ...addObject,
      }
      for (const key in addObject) {
        setObject = {
          ...setObject,
          id: index + 1,
          [key]:
            addObject[key] === 'number'
              ? getRandom(minValue, maxValue)
              : addObject[key],
        }
      }
      list.push(setObject)
    }
    stateDataSet([...stateData, { listName: name, list: list }])
    stateSet({ ...state, disc: String(JSON.stringify(addObject)) })
  }
  
  const setAddObjectSet = () => {
    addObjectSet({ ...addObject, [addObjectKey]: addObjectValue })
  }

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

  const chnageSchemaList = () => {
    const list: Array<{x:number,y:number}> = []
    stateData.forEach((item:moveObjectItem) => {
      item.list.forEach((obj) => {
        const _obj = { x: 0, y: 0 }
        for (const key in obj) {
          if ( key === 'x' ||  key === 'y' && Object.prototype.hasOwnProperty.call(obj, key) && typeof obj[key] === 'number' ) {
            _obj[key] = obj[key] as number
          }
        }
        list.push(_obj)
      });
    });
    console.log(stateData)
    return list
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
  const setStateDataLength = (id: string) => {
    let number = 0
    stateData.forEach((item) => {
      if (item.listName === id) {
        number = item.list.length
        return
      }
    })
    return number
  }

  const setClass = (item: Schema, selectId: string) => {
    if (item.itemId === selectId) return 'baseActive'
    if (item.parentId === selectId) return 'itemActive'
  }

  return (
    <div className="c-div p-2">
      <Space direction="vertical">
        <Title level={4}>
          データ構造と関連性{' '}
        </Title>
        <Button.Group>
          <Button onClick={() => handleOpen('input_create')}>追加</Button>
          <Button onClick={() => conectPicupSet('none')}>
            remove<PartitionOutlined />
          </Button>
          <ElementSchemaVisual schemaItems={stateData} dates={chnageSchemaList()} />
        </Button.Group>
      </Space>
      <Row gutter={16}>
        {schemaItems.map((item) => (
          <Col key={item.id} span={8} className="pt-4 pb-2">
            <Card
              className={setClass(item, conectPicup)}
              title={item.category}
              extra={
                <Button onClick={() => conectPicupSet(item.itemId)}>
                  <PartitionOutlined />
                </Button>
              }
              actions={[
                <Button onClick={() => handleOpen('view')}>
                  <FileSearchOutlined key="setting" />
                </Button>,
                <Button onClick={() => handleOpen('input_edit', item.id)}>
                  <EditOutlined key="edit" />
                </Button>,
                <Button danger onClick={() => handleOpen('delete', item.id)}>
                  <DeleteOutlined key="ellipsis" />
                </Button>,
              ]}
              bordered={false}
            >
              <p>カラム情報</p>
              {item.disc}
              <p>データ構造数｜ {setStateDataLength(item.itemId)}</p>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal
        title="時間で検証方法の確認"
        open={modalView}
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
            : disc [object](データ構造部分での追加が反映されます。)
            <TextArea rows={3} disabled value={state.disc ? state.disc : ''} />:
            parentId
            <Select
              value={state.parentId ? state.parentId : 'originId'}
              style={{ width: 120 }}
              onChange={(value: string) => handleSetState('parentId', value)}
            >
              <Option value="originId">top level</Option>
              {schemaItems.map((item) => (
                <Option key={item.itemId} value={item.itemId}>{item.itemId}</Option>
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
              <Select
                value={addObjectValue}
                onChange={(value: string) => addObjectValueSet(value)}
                style={{ minWidth: '120px' }}
              >
                <Option value="number">数値</Option>
                <Option value="string">文字列</Option>
              </Select>
              <Button onClick={setAddObjectSet}>
                <PlusCircleOutlined />
              </Button>
            </Input.Group>
            <div className="view-object">
              {setInfo(addObject).map((item) => (
                <p key={item.keyValue}>
                  <Tag color="#2db7f5">key</Tag>:{item.keyValue}{' '}
                  <Tag color="#108ee9">value</Tag>:{item.value}{' '}
                </p>
              ))}
            </div>
            <Input.Group compact>
              紐づくId（カードのエディット部分で確認が可能です。）
              <AutoComplete
                style={{ width: '70%' }}
                placeholder="itemId"
                options={AutoCompleteList()}
              />
            </Input.Group>
            <ElementSliderNumber
              label="最低値"
              value={minValue}
              valueChange={minValueSet}
            />{' '}
            <ElementSliderNumber
              label="最高値"
              value={maxValue}
              valueChange={maxValueSet}
            />
            <ElementSliderNumber
              label="ループ回数"
              value={loopValue}
              step={1}
              max={2000}
              valueChange={loopValueSet}
            />
            <Button
              onClick={() =>
                setData(
                  state.itemId !== ''
                    ? state.itemId
                    : `level${schemaItems.length + 1}`
                )
              }
            >
              データを追加
            </Button>
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
