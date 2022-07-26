import React from 'react'
import { Typography } from 'antd'
import ContentRecord from '../components/ContentRecord'
const { Title } = Typography

function Record() {
  return (
    <div className="record p-2">
      <Title level={4}>時間と記録情報の評価</Title>
      <ContentRecord />
    </div>
  )
}

export default Record
