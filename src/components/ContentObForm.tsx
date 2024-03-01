import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react'
import { InputNumber, Input, Select, Slider, Button, Space } from 'antd'
import bodyPart from '../info/BodyPart.json'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootStore } from '../store/modules/reducer'
import { AppDispatch } from '../store'
import { Observer } from '../types/observer'
import { Post, BodyPart } from '../types/posts'

type Props = {
  formType: string
  dataId?: number
  handleClose?: () => void
}

const ContentObForm = forwardRef((props: Props, ref) => {
  const { formType, dataId, handleClose } = props
  const dispatch: AppDispatch = useDispatch()
  const observer = useSelector((state: RootStore) => state.observer.items)
  const posts = useSelector((state: RootStore) => state.post.postItems)
  const { Option } = Select
  const { TextArea } = Input
  const [state, stateSet] = useState<Observer>({
    title: '方法利用後の結果',
    href: 'http://',
    disc: 'サーブの向上',
    differenceInfo: '',
    result: '',
    methodId: '',
    goalRate: '',
    goalScore: 0,
    playScore: 0,
  })
  const [_posts, _postsSet] = useState<Observer[]>([])
  const formatter = (value: number) => `${value}%`

  const onInputChange = (value: string, type: string) => {
    stateSet({ ...state, [type]: value })
  }

  const setData = (type: string): Observer => {
    let number = state.id
    if (type === 'create') number = observer.length + 1
    return {
      id: number,
      title: state.title,
      href: state.href,
      disc: state.disc,
      differenceInfo: state.differenceInfo,
      result: state.result,
      methodId: state.methodId,
      goalRate: state.goalRate,
      goalScore: state.goalScore,
      playScore: state.playScore,
    }
  }

  const sendAction = () => {
    const item: Observer[] = [..._posts, setData('create')]
    dispatch({ type: 'observer/add', item })
    if (handleClose) handleClose()
  }

  const updateAction = () => {
    const item = setData('edit')
    dispatch({ type: 'observer/update', item })
    if (handleClose) handleClose()
  }

  const deleteAction = () => {
    dispatch({ type: 'observer/delete', dataId })
    if (handleClose) handleClose()
  }

  useImperativeHandle(ref, () => ({
    deleteAction: () => {},
  }))

  useEffect(() => {
    _postsSet(observer)
  }, [_posts])

  useEffect(() => {
    const item = observer.filter((item: Observer) => item.id === dataId)
    if (formType === 'create') {
      stateSet({
        id: 0,
        title: '',
        href: '',
        disc: '',
        differenceInfo: '',
        result: '',
        methodId: '',
        goalRate: '',
        goalScore: 0,
        playScore: 0,
      })
    } else {
      stateSet({
        id: item[0].id,
        title: item[0].title,
        href: item[0].href,
        disc: item[0].disc,
        differenceInfo: item[0].differenceInfo,
        result: item[0].result,
        methodId: item[0].methodId,
        goalRate: item[0].goalRate,
        goalScore: item[0].goalScore,
        playScore: item[0].playScore,
      })
    }
  }, [formType, dataId])

  return (
    <div className="c-div p-2">
      {formType === 'delete' ? (
        <div className="fields">
          <div className="field pb-2">
            <p>この操作は取り消せません。削除しますか。</p>
            <Space>
              <Button onClick={handleClose}>戻る</Button>
              <Button onClick={deleteAction} danger>
                削除
              </Button>
            </Space>
          </div>
        </div>
      ) : (
        <div className="fields">
          <div className="field pb-2">
            <p>意識部位カテゴリ</p>
            <Select
              style={{ width: 240 }}
              onChange={(value) => onInputChange(value, 'category')}
            >
              {bodyPart.map((item: BodyPart) => (
                <Option key={item.id} value={item.value}>
                  {item.part}
                </Option>
              ))}
            </Select>
          </div>
          <div className="field pb-2">
            <p>認識したカテゴリ</p>
            <Select
              style={{ width: 240 }}
              onChange={(value) => onInputChange(value, 'methodId')}
            >
              {posts.map((item: Post) => (
                <Option key={item.id} value={item.id}>
                  {item.goal}
                </Option>
              ))}
            </Select>
          </div>
          <div className="field pb-2">
            <p>タイトル</p>
            <Input
              showCount
              maxLength={200}
              value={state.title}
              onChange={(e) => onInputChange(e.target.value, 'title')}
            />
          </div>
          <div className="field pb-2">
            <p>リンク</p>
            <Input addonBefore="http://" value={state.href} />
          </div>
          <div className="field pb-1">
            <p>実行した結果と変更を意識した詳細</p>
            <TextArea
              showCount
              maxLength={400}
              value={state.disc}
              onChange={(e) => onInputChange(e.target.value, 'disc')}
            />
          </div>
          <div className="field pb-1">
            <p>結果</p>
            <TextArea
              showCount
              maxLength={400}
              value={state.result}
              onChange={(e) => onInputChange(e.target.value, 'result')}
            />
          </div>
          <div className="field pb-1">
            <p>目的結果と事象の確認</p>
            <TextArea
              showCount
              maxLength={400}
              value={state.differenceInfo}
              onChange={(e) => onInputChange(e.target.value, 'differenceInfo')}
            />
          </div>
          <div className="field pb-1">
            <p>達成率</p>
            <Slider
              defaultValue={30}
              value={Number(state.goalRate)}
              onChange={(e) => onInputChange(String(e), 'goalRate')}
            />
          </div>
          <div className="field pb-1">
            <p>目的達成数</p>
            <InputNumber
              addonBefore="+"
              addonAfter="個"
              value={state.goalScore}
              onChange={(e) => {
                onInputChange(String(e), 'goalScore')
              }}
            />
          </div>
          <div className="field pb-1">
            <p>実行数</p>
            <InputNumber
              addonBefore="+"
              addonAfter="個"
              value={state.playScore}
              onChange={(e) => {
                onInputChange(String(e), 'playScore')
              }}
            />
          </div>
          <div className="field pb-1">
            {formType === 'create' ? (
              <Button onClick={sendAction}>追加</Button>
            ) : (
              <Button onClick={updateAction}>更新</Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
})

export default ContentObForm
