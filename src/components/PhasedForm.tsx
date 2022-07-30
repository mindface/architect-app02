import React, { useState, ReactNode, useEffect } from 'react'
import { Button, Card, Modal, Select, Empty, Input,
  Form,
  Radio,
  DatePicker,
} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../store'

const { RangePicker } = DatePicker;
const { TextArea } = Input;

type Props = {
  inputOn: boolean
}

function PhasedForm(props:Props) {
  const dispatch: AppDispatch = useDispatch()
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const [selectView, selectViewSet] = useState<string>("")
  const [state, stateSet] = useState({
    goal: "",
    lang: "",
    day: "",
    period: "",
    disc: "",
    service: ""
  })
  const onFormLayoutChange = ({ disabled }: { disabled: boolean }) => {
    setComponentDisabled(disabled);
  };

  const selectViewAction = (e:string) => {}

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={{ disabled: componentDisabled }}
      onValuesChange={onFormLayoutChange}
      disabled={props.inputOn}
    >
      <Form.Item label="判断カテゴリ">
        {selectView}
        <Radio.Group>
          <Radio value="apple" onChange={(e) => selectViewSet(e.target.value)}>運動神経</Radio>
          <Radio value="pear" onChange={(e) => selectViewSet(e.target.value)}>学習|記憶べーす</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="構成した目的 ">
        <Input />
      </Form.Item>
      <Form.Item label="結果への言語化 ">
        <Select>
          <Select.Option value="demo">Demo</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="日付">
        <DatePicker />
      </Form.Item>
      <Form.Item label="実行時間">
        <RangePicker />
      </Form.Item>
      <Form.Item label="動作の言語化">
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item label="使っているサービス">
        <TextArea rows={4}  />
        <p>saasサービスなどアプリを含める</p>
      </Form.Item>
      <Form.Item label=" ">
        <Button>copy</Button>
      </Form.Item>
    </Form>
  )
}

export default PhasedForm
