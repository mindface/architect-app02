import React from 'react'
import { Typography, Tabs } from 'antd'
import type { TabsProps } from 'antd'
import ContentPattern from '../components/ContentPattern'
import ContentPatternView from '../components/ContentPatternView'
import ContentTrigger from '../components/ContentTrigger'
import ContentThree from '../components/ContentThree'
import { useDispatch, useSelector } from 'react-redux'
import { RootStore } from '../store/modules/reducer'
import { AppDispatch } from '../store'
import ElementCounter from '../components/ElementCounter'
import ElementGraph from '../components/ElementGraph'
const { Title } = Typography
const { TabPane } = Tabs

function PatternTrigger() {
  const dispatch: AppDispatch = useDispatch()
  const item = useSelector((state: RootStore) => state.proportion.item)

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "行動パターン",
      children: <ContentPattern item={item} />,
    },
    {
      key: "2",
      label: "トリガーと行動変更率",
      children: <ContentPatternView item={item} />,
    },
    {
      key: "3",
      label: "目的と問題の調整",
      children: <ContentTrigger />,
    },
    {
      key: "4",
      label: "ビジュアル化",
      children: <ContentThree />,
    },
  ]

  return (
    <div className="PatternTrigger p-2">
      <div className="pb-2">
        <Title level={4}>時間と記録情報の評価</Title>
        <Tabs defaultActiveKey="1" items={items}></Tabs>
      </div>
      <ElementCounter />
      <ElementGraph />
    </div>
  )
}

export default PatternTrigger
