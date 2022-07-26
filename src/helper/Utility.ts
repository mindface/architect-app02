import bodyPart from '../info/BodyPart.json'
import { BodyPart } from '../types/posts'
import type { Moment } from 'moment'

export const setLabel = (label: string) => {
  let text = ''
  bodyPart.forEach((item: BodyPart) => {
    if (item.value === label) {
      text = item.part
      return
    }
  })
  return text
}

export const setDay = (day?: string) => {
  let d = new Date()
  if (day) d = new Date(day)
  return d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate()
}
