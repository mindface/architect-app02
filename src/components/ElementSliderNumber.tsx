import React, { useEffect, useState } from 'react'
import { Typography, Col, InputNumber, Row, Slider } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../store'
import { RootStore } from '../store/modules/reducer'
const { Title } = Typography

type Props = {
  label?: string
  value?: number
  valueChange: (value: number) => void
}

function ElementSchemaControl(props: Props) {
  const [inputValue, setInputValue] = useState(0)

  const onChange = (value: number) => {
    if (isNaN(value)) {
      return
    }
    setInputValue(value)
    props.valueChange(value)
  }

  useEffect(() => {
    setInputValue(props.value!)
  }, [])

  return (
    <div className="pl-1 pr-1 ">
      <Row>
        <Col span={18}>{props.label}</Col>
        <Col span={12}>
          <Slider
            min={0}
            max={1}
            onChange={onChange}
            value={typeof inputValue === 'number' ? inputValue : 0}
            step={0.01}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={0}
            max={1}
            style={{ margin: '0 16px' }}
            step={0.01}
            value={inputValue}
            onChange={onChange}
          />
        </Col>
      </Row>
    </div>
  )
}

export default ElementSchemaControl
