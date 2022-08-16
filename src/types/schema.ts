export interface Schema {
  id?: number
  itemId: string
  category: string
  useTime: string
  disc: string
  parentId?: string
  useId?: boolean
  createAt: string
}

export interface SendSchema {
  title: string
  body: string
  sub: string
  accout?: string
}

export interface ItemSchema {
  title: string
  body: string
  sub: string
  accout?: string
}

export interface ReSchema extends Schema {
  children: Schema[]
}

export interface moveObjectItem {
  listName: string;
  list: moveObject[]
}
export interface moveObject {
  [key: string]: string | number
}