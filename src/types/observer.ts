export interface Observer {
  id?: number;
  title: string,
  href: string,
  disc: string,
  differenceInfo: string,
  result: string,
  methodId: string,
  goalRate: string,
  goalScore: number,
  playScore: number,
}

export interface SendObserver {
  title: string;
  body: string;
  sub: string;
  accout?: string;
}

export interface BodyObserver {
  id: number
  part: string
  value: string
  segment: {
    segmentId: number
    segmentBody: string
    segmentAttention: string
  }[]
} 
