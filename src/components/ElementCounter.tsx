import React, { useEffect, useState } from 'react'
import { Card, Row, Col } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../store'
import { RootStore } from '../store/modules/reducer'

function ElementCounter() {
  const item = useSelector((state: RootStore) => state.proportion.item)
  const dispatch: AppDispatch = useDispatch()
  const [doing, doingSet] = useState(0)
  const [level, levelSet] = useState(0)
  const [planing, planingSet] = useState(0)
  const [play, playSet] = useState(0)

  // アルゴリズム
  useEffect(() => {
    console.log(item.doing)
    doingSet(item.level)
    levelSet(item.doing)
    planingSet(item.planing)
    playSet(item.play)
  }, [item.doing, item.level, item.doing, item.planing, item.play])

  return (
    <div className="pl-1 pr-1 ">
      <Row className="pb-2">
        <Col span={6}>
          <Card title={`doing ${doing}`} bordered={false} style={{}}>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card title={`doing ${level}`} bordered={false} style={{}}>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card title={`doing ${planing}`} bordered={false} style={{}}>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card title={`doing ${play}`} bordered={false} style={{}}>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ElementCounter
