import React from 'react'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd';
import ContentFetchInfo from '../components/ContentFetchInfo'
import ContentForm from '../components/ContentForm'
import ContentObForm from '../components/ContentObForm'
import ContentCustom from '../components/ContentCustom'
import ContentObPlan from '../components/ContentObPlan'

const items: TabsProps['items'] = [
  {
    key: "1",
    label: "データボード",
    children: <ContentFetchInfo />,
  },
  {
    key: "2",
    label: "改善ポイント入力",
    children: <ContentForm formType="create" />,
  },
  {
    key: "3",
    label: "結果とフィードバック",
    children: <ContentObForm formType="create" />,
  },
  {
    key: "4",
    label: "結果とフィードバック",
    children: <ContentObPlan />,
  },
]

function Home() {
  const { TabPane } = Tabs
  const onChange = (key: string) => {
    console.log(key)
  }

  return (
    <div className="home p-2">
      <Tabs defaultActiveKey="1" onChange={onChange} items={items} ></Tabs>
    </div>
  )
}

export default Home
