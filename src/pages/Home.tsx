import React from 'react'
import { Tabs } from 'antd'
import ContentFetchInfo from '../components/ContentFetchInfo'
import ContentForm from '../components/ContentForm'
import ContentObForm from '../components/ContentObForm'
import ContentCustom from '../components/ContentCustom'
import ContentObPlan from '../components/ContentObPlan'

function Home() {
  const { TabPane } = Tabs
  const onChange = (key: string) => {
    console.log(key)
  }

  return (
    <div className="home p-2">
      <Tabs defaultActiveKey="1" onChange={onChange}>
        <TabPane tab="データボード" key="1">
          <ContentFetchInfo />
        </TabPane>
        <TabPane tab="改善ポイント入力" key="2">
          <ContentForm formType="create" />
        </TabPane>
        <TabPane tab="結果とフィードバック" key="3">
          <ContentObForm formType="create" />
        </TabPane>
        <TabPane tab="観察範囲" key="4">
          <ContentObPlan />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Home
