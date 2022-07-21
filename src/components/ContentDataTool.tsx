import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import type { UploadProps } from 'antd';
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import { Space, Button, message, Upload, Typography } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../store/modules/reducer";
import { AppDispatch } from "../store";
import { Post, BodyPart } from '../types/posts';

const { Dragger } = Upload;

function  ContentDataTool(){
  const dispatch:AppDispatch = useDispatch()
  const post = useSelector((state:RootStore) => state.post.postItems)
  const observer = useSelector((state:RootStore) => state.observer.items)
  const { Title } = Typography;
  const [state,stateSet] = useState<Post>({
    category: '',
    useTime: '0',
    part: '',
    disc: '',
    goal: '',
    createAt: '',
  });
  const [_posts,_postsSet] = useState<Post[]>([])

  const exportData = () => {
    const a = document.createElement('a')
    const _ = JSON.stringify({post:post,observer:observer})
    const blob = new Blob([_],{ type: 'application/json' })
    a.href = URL.createObjectURL(blob)
    a.download = 'set.json'
    a.click()
  }

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: true,
    action: '',
    onChange(info) {
      const reader = new FileReader()
      const { status } = info.file;
      if (status !== 'uploading') {
        const file:any = info.file
        reader.onload = (e) => {
          const data = reader.result as string
          const encodedData = data.replace(/^data:\w+\/\w+;base64,/,'')
          const info = JSON.parse(encodedData)
          const postItems = info.post
          const items = info.observer
          dispatch({type:'post/set',postItems})
          dispatch({type:'observer/set',items})
          console.log(JSON.parse(encodedData))
        }
        reader.readAsText(file.originFileObj)
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      const file = e.dataTransfer.files[0]
      console.log(file)
      const reader = new FileReader()
      if (file) {
        reader.onload = (e) => {
          console.log(e.target?.result)
        }
        reader.readAsText(file)
      }
    },
  };

  return (
    <div className='c-div p-2'>
      <Title level={5}>タスク情報を変更する</Title>
      <Space>
        <Button icon={<DownloadOutlined />} onClick={exportData} >エクスポート データ</Button>
        <Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <UploadOutlined />
          </p>
          <p className="ant-upload-text p-1">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint p-1">
            クリックでファイルアップロードプロセスになります。
          </p>
        </Dragger>
      </Space>
    </div>
  )
}

export default ContentDataTool
