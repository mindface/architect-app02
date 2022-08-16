import React, { useEffect, useState, useRef } from 'react'
import { Button, Modal, Space, Typography, Input, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../store'
import { RootStore } from '../store/modules/reducer'
import { moveObject, moveObjectItem } from '../types/schema'

import { getRandom } from "../helper/Utility";
import { Scatter } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);
export const options = {
  responsive: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

import { Schema } from '../types/schema'
const { Title } = Typography
import ElementSliderNumber from './ElementSliderNumber'

type Props = {
  schemaItems:Array<moveObjectItem>;
  dates: Array<{
    x: number;
    y: number;
  }>
}
const { Option } = Select

function ElementSchemaVisual(props: Props) {
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [minValue, minValueSet] = useState(0)
  const [maxValue, maxValueSet] = useState(0)
  const [loopValue, loopValueSet] = useState(0)
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState<{x:Array<string|number>,y:Array<string|number>}>(
     {
      x: [],
      y: [],
    }
  );
  const [data, dataSet] = useState({
    datasets: [
      {
        label: 'A dataset',
        data: Array.from({ length: 100 }, () => ({
          x: getRandom(0,1),
          y: getRandom(0,1),
        })),
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  })
  useEffect(() => {
    dataSet({
      datasets: [
        {
          label: 'A dataset',
          data:props.dates,
          backgroundColor: 'rgba(255, 99, 132, 1)',
        },
      ],
    })
  },[props.dates])

  
  const [state, stateSet] = useState<Schema>({
    id: -1,
    itemId: `level`,
    category: '',
    useTime: '',
    disc: '',
    parentId: '',
    createAt: '',
  })

  const showModal = () => {
    setVisible(true)
  }

  const handleOk = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setVisible(false)
    }, 3000)
  }
  const handleSetState = (type: string, value: string) => {
    stateSet({ ...state, [type]: value })
  }
  const handleCancel = () => {
    setVisible(false)
  }
  
  return (
    <div className="pl-1 pr-1 ">
      <Button type="primary" onClick={showModal}>
        データビジュアル
      </Button>
      <Modal
        visible={visible}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            閉じる
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            実行
          </Button>,
          <Button
            key="link"
            href="https://google.com"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Search on Google
          </Button>,
        ]}
        style={{minWidth: 640}}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Title level={4}>データ構造と関連性</Title>
          ランダム数値範囲
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
            value={loopValue}
            step={1}
            max={2000}
            valueChange={loopValueSet}
          />
          : parentId
          <Select
            value={state.parentId ? state.parentId : 'originId'}
            style={{ width: 120 }}
            onChange={(value: string) => handleSetState('parentId', value)}
          >
            <Option value="originId">top level</Option>
            {props.schemaItems.map((item, i) => (
              <Option key={i} value={item.listName}>
                {item.listName}
              </Option>
            ))}
          </Select>
        </Space>
        <div className="data-box">
          <Scatter
            height={300}
            width={500}
            style={{position:'relative'}}
            options={options}
            data={data}
          />
        </div>
      </Modal>
    </div>
  )
}

export default ElementSchemaVisual
