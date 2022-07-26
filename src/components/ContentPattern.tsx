import React, { useEffect, useState } from 'react'
import {
  Button,
  Modal,
  Col,
  Input,
  InputNumber,
  Row,
  Slider,
  Typography,
} from 'antd'
import { useDispatch } from 'react-redux'
import { RootStore } from '../store/modules/reducer'
import { AppDispatch } from '../store'
import { Proportion } from '../types/proportion'
const { Title } = Typography

type Props = {
  item: Proportion
}

function ContentPattern(props: Props) {
  const dispatch: AppDispatch = useDispatch()
  const item = props.item
  const itemData = {
    id: 0,
    title: '',
    level: 0,
    doing: 0,
    planing: 0,
    play: 0,
  }
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [inputValue, inputValueSet] = useState(itemData)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const setPropsItem = () => {
    return new Promise((resolve, reject): void => {
      if (item.title) {
        inputValueSet({
          id: item.id!,
          title: item.title,
          level: item.level,
          doing: item.doing,
          planing: item.planing,
          play: item.play,
        })
        resolve(undefined)
      }
    })
  }
  const onChange = (value: number, type: string) => {
    if (isNaN(value)) {
      return
    }
    inputValueSet({ ...inputValue, [type]: value })
  }

  const setAction = () => {
    const item = inputValue
    const counter =
      inputValue.level + inputValue.doing + inputValue.planing + inputValue.play
    if (counter > 1.0) {
      setIsModalVisible(true)
      return
    }
    dispatch({ type: 'proportion/set', item })
    inputValueSet(itemData)
  }

  useEffect(() => {
    setPropsItem()
  }, [])

  return (
    <div className="pattern bg-w-c p-2">
      <Typography>
        対象の問題解決のリソースがベースに全体を100%としてください。
      </Typography>
      <Row className="pb-2">
        <Col span={12}>
          <Title level={5}>目的達成のための主要問題</Title>
          <Input
            value={inputValue.title}
            onChange={(e) =>
              inputValueSet({ ...inputValue, title: e.currentTarget.value })
            }
          />
        </Col>
      </Row>
      <Row className="pb-2">
        <Col span={12}>
          <Title level={5}>問題解決に必要な計画立案</Title>
          <Slider
            min={0}
            max={1}
            onChange={(e) => onChange(e, 'level')}
            value={typeof inputValue.level === 'number' ? inputValue.level : 0}
            step={0.01}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={0}
            max={1}
            style={{ margin: '0 16px' }}
            step={0.01}
            value={inputValue.level}
          />
        </Col>
      </Row>
      <Row className="pb-2">
        <Col span={12}>
          <Title level={5}>問題解決までのタスク数</Title>
          <Slider
            min={0}
            max={1}
            onChange={(e) => onChange(e, 'doing')}
            value={typeof inputValue.doing === 'number' ? inputValue.doing : 0}
            step={0.01}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={0}
            max={1}
            style={{ margin: '0 16px' }}
            step={0.01}
            value={inputValue.doing}
          />
        </Col>
      </Row>
      <Row className="pb-2">
        <Col span={12}>
          <Title level={5}>実行回数頻度とフィードバックする頻度の比率</Title>
          <Slider
            min={0}
            max={1}
            onChange={(e) => onChange(e, 'planing')}
            value={
              typeof inputValue.planing === 'number' ? inputValue.planing : 0
            }
            step={0.01}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={0}
            max={1}
            style={{ margin: '0 16px' }}
            step={0.01}
            value={inputValue.planing}
          />
        </Col>
      </Row>
      <Row className="pb-2">
        <Col span={12}>
          <Title level={5}>実行での検証データを評価の妥当性を検討</Title>
          <Slider
            min={0}
            max={1}
            onChange={(e) => onChange(e, 'play')}
            value={typeof inputValue.play === 'number' ? inputValue.play : 0}
            step={0.01}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={0}
            max={1}
            style={{ margin: '0 16px' }}
            step={0.01}
            value={inputValue.play}
          />
        </Col>
      </Row>
      <Row className="pb-2">
        <Col span={4}>
          <Typography>
            現在の合計　|{' '}
            {inputValue.level +
              inputValue.doing +
              inputValue.planing +
              inputValue.play}{' '}
            <br />
            合計は1未満にしてください。
          </Typography>
          <Button onClick={() => setAction()}>データセット</Button>
        </Col>
      </Row>
      <Modal
        title="入力値に問題があります。"
        visible={isModalVisible}
        footer={null}
      >
        <Typography className="pb-2">
          合計が1.0以下にしてください。
          <br />
        </Typography>
        <Button onClick={handleCancel}>閉じる</Button>
      </Modal>
    </div>
  )
}

export default ContentPattern
