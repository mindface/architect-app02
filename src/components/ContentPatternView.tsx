import React, {
  useState,
  useEffect
} from "react"
import { Progress, Col, Row, Typography } from "antd"
import { useSelector, useDispatch } from "react-redux"
import { AppDispatch } from "../store"
import { Proportion } from "../types/proportion";
import { RootStore } from "../store/modules/reducer"

type Props = {
  item: Proportion
}
const { Title } = Typography

function ContentPatternView(props:Props) {
  const itemData = {
    id: 0,
    title: '',
    level: 0,
    doing: 0,
    planing: 0,
    play: 0
  }
  const item = useSelector((state:RootStore) => state.proportion.item)
  const [inputValue, inputValueSet] = useState(itemData);

  useEffect(() => {
    inputValueSet({
      id: item.id!,
      title: item.title!,
      level: item.level,
      doing: item.doing,
      planing: item.planing,
      play: item.play
    })
  },[item])

  return (
    <div className="pattern bg-w-c p-2">
      <Row className="pb-2">
        <Col span={16}>
          <Title level={5}>{inputValue.title}</Title>
          <Typography>対象の問題解決のリソースがベースに全体を100%としています。</Typography>
          <div className="p-2">
            <Typography>問題解決に必要な計画立案</Typography>
            <Progress percent={inputValue.level*100} />
            <Typography>問題解決までのタスク数</Typography>
            <Progress percent={inputValue.doing*100} status="active" />
            <Typography>実行回数頻度とフィードバックする頻度の比率</Typography>
            <Progress percent={inputValue.planing*100} />
            <Typography>実行での検証データを評価の妥当性を検討</Typography>
            <Progress percent={inputValue.play*100} />
          </div>
        </Col>
        <Col span={8}>
          <div className="p-2">
            <Progress type="circle" width={240} percent={(inputValue.level + inputValue.doing + inputValue.planing + inputValue.play)*100} />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ContentPatternView
