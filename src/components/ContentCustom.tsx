import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Button, Transfer } from 'antd';
import type { TransferDirection, TransferListProps } from 'antd/es/transfer';
import bodyPart from "../info/BodyPart.json";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootStore } from "../store/modules/reducer";
import { AddPostData, UpdatePostData } from "../store/modules/data_action/post";
import { AppDispatch } from "../store";
import { setLabel } from '../helper/Utility';

interface RecordType {
  key: string;
  title: string;
  description: string;
  chosen: boolean;
}

function ContentRecord(){
  const dispatch:AppDispatch = useDispatch()
  const post = useSelector((state:RootStore) => state.post.postItems)

  const [mockData, setMockData] = useState<RecordType[]>([]);
  const [targetKeys, setTargetKeys] = useState<string[]>([]);

  const getMock = () => {
    const tempTargetKeys = [];
    const tempMockData = [];
    for (let i = 0; i < post.length; i++) {
      const data = {
        key: i.toString(),
        title: `${setLabel(post[i].category)} | ${i + 1}`,
        description: `${post[i].disc}${i + 1}`,
        chosen: Math.random() * 2 > 1,
      };
      if (data.chosen) {
        tempTargetKeys.push(data.key);
      }
      tempMockData.push(data);
    }
    setMockData(tempMockData);
    setTargetKeys(tempTargetKeys);
  };

  useEffect(() => {
    getMock();
  }, []);

  const handleChange = (newTargetKeys: string[]) => {
    setTargetKeys(newTargetKeys);
  };

  return (
    <Transfer
      dataSource={mockData}
      showSearch
      locale={{itemsUnit:'@@@@'}}
      listStyle={{
        width: '50%',
        height: 500,
      }}
      operations={['to right →', '← to left']}
      targetKeys={targetKeys}
      onChange={handleChange}
      render={item => `${item.title}-${item.description}`}
    />
  )
}

export default ContentRecord
