export interface Proportion {
  id?: number
  title: string
  level: number
  doing: number
  planing: number
  play: number
}

export interface SendProportion {
  title: string
  level: number
  doing: number
  planing: number
  play: number
}

export interface BodyProportion extends SendProportion {
  segment: {
    segmentId: number
    segmentBody: string
    segmentAttention: string
  }[]
}
