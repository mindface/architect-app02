import React, { useEffect, useState } from 'react'
import { Transfer } from 'antd'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootStore } from '../store/modules/reducer'
import { AppDispatch } from '../store'
import { setLabel } from '../helper/Utility'

interface RecordType {
  key: string
  title: string
  description: string
  chosen: boolean
}

function ContentRecord() {
  const dispatch: AppDispatch = useDispatch()
  const posts = useSelector((state: RootStore) => state.post.postItems)

  const [mockData, setMockData] = useState<RecordType[]>([])
  const [targetKeys, setTargetKeys] = useState<string[]>([])

  const getMock = () => {
    const tempTargetKeys = []
    const tempMockData = []
    for (let i = 0; i < posts.length; i++) {
      const data = {
        key: i.toString(),
        title: `${setLabel(posts[i].category)} | ${i + 1}`,
        description: `${posts[i].disc}${i + 1}`,
        chosen: posts[i].inspection,
      }
      if (data.chosen) {
        tempTargetKeys.push(data.key)
      }
      tempMockData.push(data)
    }
    setMockData(tempMockData)
    setTargetKeys(tempTargetKeys)
  }

  useEffect(() => {
    getMock()
  }, [])

  const handleChange = (newTargetKeys: string[]) => {
    setTargetKeys(newTargetKeys)
  }

  return (
    <Transfer
      dataSource={mockData}
      showSearch
      locale={{ itemsUnit: '未検証' }}
      listStyle={{
        width: '50%',
        height: 500,
      }}
      operations={['to right →', '← to left']}
      targetKeys={targetKeys}
      onChange={handleChange}
      render={(item) => (
        <div>
          <p>{item.title}-</p>
          <p>{item.description}</p>
        </div>
      )}
    />
  )
}

export default ContentRecord
