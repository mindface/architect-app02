import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react"
import { Button, Tooltip, List, Input, Row, Col, Typography } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { RootStore } from "../store/modules/reducer"
import { ShareAltOutlined, FormOutlined, PlusCircleOutlined, DeleteOutlined, CopyOutlined } from '@ant-design/icons';
import { AppDispatch } from "../store"

interface RecordType {
  key: string
  title: string
  description: string
  chosen: boolean
}

function ContentPattern() {
  const dispatch: AppDispatch = useDispatch()
  const item = useSelector((state: RootStore) => state.proportion.item)
  const [issues,issuesSet] = useState([
    {id:1,text:"",itemId:-1,view: true}
  ])
  const [goal,goalSet] = useState([
    {id:1,goal:"",itemId:-1,view: true}
  ])

  const AddItem = (type:string) => {
    if(type === 'issue') {
      issuesSet([...issues,{id:issues.length+1,text:"",itemId:-1,view: true}])
    }else {
      goalSet([...goal,{id:goal.length+1,goal:"",itemId:-1,view: true}])
    }
  }

  const deleteItem = (type:string,id:number) => {
    if(type === 'issue') {
      const list = issues.map((item) =>{
        if(item.id === id) item.view = false; return item
      })
      issuesSet(list)
    }else {
      const list = goal.map((item) =>{
        if(item.id === id) item.view = false; return item
      })
      goalSet(list)
    }
  }

  return (
    <div className="pattern bg-w-c p-2">
      <Row className="pb-2">
        <Col span={12}>
          <Typography>問題の細分化</Typography>
          <Input value={item.title} placeholder="問題を入力してください。" prefix={<ShareAltOutlined />} />
          <List
            header={<div>問題を分けてください。</div>}
            footer={<div>
              <Tooltip title="追加">
                <Button shape="circle" onClick={() => AddItem('issue')} icon={<PlusCircleOutlined />} />
              </Tooltip>
            </div>}
            bordered
            dataSource={issues}
            renderItem={item => item.view && (
              <List.Item key={item.id}>
                <Typography.Text mark>{item.text}</Typography.Text>
                <Input
                  placeholder="問題を入力してください。"
                  addonAfter={<Button shape="circle" danger onClick={() => deleteItem('issue',item.id)} icon={<DeleteOutlined />} />}
                  prefix={<FormOutlined />}
                />
              </List.Item>
            )}
          />
        </Col>
        <Col span={12}>
         <Typography>目的の細分化 | <Input  placeholder="目的を入力してください。" prefix={<ShareAltOutlined />} /></Typography>
         <List
            header={<div>問題を分けてください。</div>}
            footer={<div>
              <Tooltip title="追加">
                <Button shape="circle" onClick={() => AddItem('goal')} icon={<PlusCircleOutlined />} />
              </Tooltip>
            </div>}
            bordered
            dataSource={goal}
            renderItem={item => item.view && (
              <List.Item key={item.id}>
                <Typography.Text mark>{item.goal}</Typography.Text>
                <Input
                  placeholder="問題を入力してください。"
                  addonAfter={<Button shape="circle" danger onClick={() => deleteItem('gola',item.id)} icon={<DeleteOutlined />} />}
                  prefix={<FormOutlined />}
                />
              </List.Item>
            )}
          />
        </Col>
        <Col span={24}>
          <Tooltip title="テキストをコピー">
           <Button shape="circle" icon={<CopyOutlined />} />
          </Tooltip>
        </Col>
      </Row>
    </div>
  )
}

export default ContentPattern
