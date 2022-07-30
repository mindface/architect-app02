import React from 'react'
import { Typography } from 'antd'
import ContentPhased from '../components/ContentPhased'
const { Title } = Typography

function PhasedLevel() {
  return (
    <div className="record p-2">
      <Title level={4}>既存アプリのツール単位の最適化</Title>
      <ContentPhased />
    </div>
  )
}

export default PhasedLevel
