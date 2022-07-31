import React, { useState, ReactNode, useEffect } from 'react'
import {
  Button,
  Card,
  Modal,
  Select,
  Empty,
  Input,
  Form,
  Radio,
  DatePicker,
} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../store'

const { RangePicker } = DatePicker
const { TextArea } = Input

type Props = {
  inputOn: boolean
}

function PhasedWriteService(props: Props) {
  const dispatch: AppDispatch = useDispatch()
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true)
  const [selectView, selectViewSet] = useState<string>('')
  const [state, stateSet] = useState({
    goal: '',
    lang: '',
    day: '',
    period: '',
  })
  const onFormLayoutChange = ({ disabled }: { disabled: boolean }) => {
    setComponentDisabled(disabled)
  }

  const selectViewAction = (e: string) => {}

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={{ disabled: componentDisabled }}
      onValuesChange={onFormLayoutChange}
      disabled={props.inputOn}
    ></Form>
  )
}

export default PhasedWriteService
