import React, { useEffect, useState } from 'react'
import { Typography, Col, InputNumber, Row, Slider } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../store'
import { RootStore } from '../store/modules/reducer'
const { Title } = Typography

type Props = {
  label?: string
  value?: number
  step?: number
  min?: number
  max?: number
  valueChange: (value: number) => void
}

function ElementSchemaControl(props: Props) {
  const [inputValue, setInputValue] = useState(0)

  const onChange = (value: number | null) => {
    if (value || isNaN(value ?? 0)) {
      return
    }
    setInputValue(value ?? 0)
    props.valueChange(value ?? 0)
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
            min={props.min ? props.min : 0}
            max={props.max ? props.max : 1}
            onChange={onChange}
            value={typeof inputValue === 'number' ? inputValue : 0}
            step={props.step ? props.step : 0.01}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={props.min ? props.min : 0}
            max={props.max ? props.max : 1}
            style={{ margin: '0 16px' }}
            step={props.step ? props.step : 0.01}
            value={inputValue}
            onChange={onChange}
          />
        </Col>
      </Row>
    </div>
  )
}

export default ElementSchemaControl
