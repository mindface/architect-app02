import React from "react"
import { Typography, Tabs } from "antd"
import ContentPattern from "../components/ContentPattern"
import ContentPatternView from "../components/ContentPatternView"
import ContentTrigger from "../components/ContentTrigger"
import ContentThree from "../components/ContentThree"
import { useDispatch, useSelector } from "react-redux"
import { RootStore } from "../store/modules/reducer"
import { AppDispatch } from "../store"
const { Title } = Typography
const { TabPane } = Tabs;

function PatternTrigger() {
  const item = useSelector((state:RootStore) => state.proportion.item)
  
  return (
    <div className="PatternTrigger p-2">
      <Title level={4}>時間と記録情報の評価</Title>
      <Tabs defaultActiveKey="1" >
        <TabPane tab="行動パターン" key="1">
          <ContentPattern item={item} />
        </TabPane>
        <TabPane tab="トリガーと行動変更率" key="2">
          <ContentPatternView item={item} />
        </TabPane>
        <TabPane tab="目的と問題の調整" key="3">
          <ContentTrigger />
        </TabPane>
        <TabPane tab="ビジュアル化" key="4">
          <ContentThree />
        </TabPane>
      </Tabs> 
    </div>
  )
}

export default PatternTrigger
