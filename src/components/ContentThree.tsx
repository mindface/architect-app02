import React, {
  useEffect,
  useState,
  useRef
} from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootStore } from "../store/modules/reducer"
import { AppDispatch } from "../store"
import ThreeModle from "../helper/three-modle";

interface RecordType {
  key: string
  title: string
  description: string
  chosen: boolean
}

function ContentThree() {
  const dispatch: AppDispatch = useDispatch()
  const item = useSelector((state: RootStore) => state.proportion.item)

  const [mockData, setMockData] = useState<RecordType[]>([])
  const [targetKeys, setTargetKeys] = useState<string[]>([])
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const three = new ThreeModle(canvas.current!)
    three.Init(item)
  },[])

  return (
    <div className="view">
      <canvas ref={canvas} ></canvas>
    </div>
  )
}

export default ContentThree
