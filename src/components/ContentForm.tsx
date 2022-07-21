import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react"
import { InputNumber, Input, Select, DatePicker, Button, Switch } from "antd"
import moment from "moment"
import bodyPart from "../info/BodyPart.json"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { RootStore } from "../store/modules/reducer"
import { AppDispatch } from "../store"
import { Post, BodyPart } from "../types/posts"
import { setDay } from "../helper/Utility"

const dateFormat = "YYYY/MM/DD"

type Props = {
  formType: string
  dataId?: number
  handleClose?: () => void
}

const ContentForm = forwardRef((props: Props, ref) => {
  const { formType, dataId, handleClose } = props
  const dispatch: AppDispatch = useDispatch()
  const post = useSelector((state: RootStore) => state.post.postItems)
  const { Option } = Select
  const { TextArea } = Input
  const [state, stateSet] = useState<Post>({
    category: "",
    useTime: "0",
    part: "",
    disc: "",
    goal: "",
    inspection: false,
    createAt: setDay(),
  })
  const [_posts, _postsSet] = useState<Post[]>([])

  const onInputChange = (value: string | boolean, type: string) => {
    console.log("Change:", value)
    stateSet({ ...state, [type]: value })
  }

  const sendAction = () => {
    const _postItem = {
      id: post.length + 1,
      category: state.category,
      useTime: state.useTime,
      part: state.part,
      disc: state.disc,
      goal: state.goal,
      inspection: state.inspection,
      createAt: state.createAt,
    }
    const postItems: Post[] = [..._posts, _postItem]
    dispatch({ type: "post/add", postItems })
    if (handleClose) handleClose()
  }

  const updateAction = () => {
    const postItem = {
      id: state.id,
      category: state.category,
      useTime: state.useTime,
      part: state.part,
      disc: state.disc,
      goal: state.goal,
      inspection: state.inspection,
      createAt: state.createAt,
    }
    dispatch({ type: "post/update", postItem })
    if (handleClose) handleClose()
  }

  const deleteAction = () => {
    dispatch({ type: "post/delete", dataId })
    if (handleClose) handleClose()
  }

  useImperativeHandle(ref, () => ({
    deleteAction: () => {},
  }))

  useEffect(() => {
    _postsSet(post)
  }, [_posts])

  useEffect(() => {
    const item = post.filter((item: Post) => item.id === dataId)
    if (formType === "create") {
      stateSet({
        category: "",
        useTime: "",
        part: "",
        disc: "",
        goal: "",
        inspection: false,
        createAt: "",
      })
    } else {
      stateSet({
        id: item[0].id,
        category: item[0].category,
        useTime: item[0].useTime,
        part: item[0].part,
        disc: item[0].disc,
        goal: item[0].goal,
        inspection: item[0].inspection,
        createAt: "",
      })
    }
  }, [formType, dataId])

  return (
    <div className="c-div p-2">
      {formType === "delete" ? (
        <div className="fields">
          <div className="field pb-2">
            <p>この操作は取り消せません。削除しますか。</p>
            <Button onClick={handleClose}>戻る</Button>
            <Button onClick={deleteAction} danger>
              削除
            </Button>
          </div>
        </div>
      ) : (
        <div className="fields">
          <div className="field pb-2">
            <p>意識部位カテゴリ</p>
            <Select
              style={{ width: 240 }}
              value={state.category}
              onChange={(value) => onInputChange(value, "category")}
            >
              {bodyPart.map((item: BodyPart) => (
                <Option key={item.id} value={item.value}>
                  {item.part}
                </Option>
              ))}
            </Select>
          </div>
          <div className="field pb-2">
            <InputNumber
              addonBefore="+"
              addonAfter="秒"
              value={state.useTime}
              onChange={(e) => {
                onInputChange(String(e), "useTime")
              }}
            />
          </div>
          <div className="field pb-2">
            <p>作成日</p>
            <DatePicker
              defaultValue={moment(state.createAt, dateFormat)}
              format={dateFormat}
              onChange={(e) => onInputChange(setDay(String(e)), "createAt")}
            />
          </div>
          <div className="field pb-2">
            <p>意識部位</p>
            <Input
              showCount
              maxLength={200}
              value={state.part}
              onChange={(e) => onInputChange(e.target.value, "part")}
            />
          </div>
          <div className="field pb-1">
            <p>詳細</p>
            <TextArea
              showCount
              maxLength={400}
              value={state.disc}
              onChange={(e) => onInputChange(e.target.value, "disc")}
            />
          </div>
          <div className="field pb-1">
            <p>目的</p>
            <TextArea
              showCount
              maxLength={400}
              value={state.goal}
              onChange={(e) => onInputChange(e.target.value, "goal")}
            />
          </div>
          <div className="field pb-1">
            <p>検証アクションの有無</p>
            <Switch
              checked={state.inspection}
              onChange={(e) => onInputChange(e, "inspection")}
            />
          </div>
          <div className="field pb-1">
            {formType === "create" ? (
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

export default ContentForm
