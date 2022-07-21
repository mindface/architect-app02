export interface Posts {
  id: number;
  category: string;
  useTime: string;
  part: string;
  disc: string;
  goal: string
  createAt: string;
}

export interface Post {
  id?: number;
  category: string;
  useTime: string;
  part: string;
  disc: string;
  goal: string;
  createAt: string;
}

export interface SendPosts {
  title: string;
  body: string;
  sub: string;
  accout?: string;
}

export interface ItemPost {
  title: string;
  body: string;
  sub: string;
  accout?: string;
}

export interface BodyPart {
  id: number
  part: string
  value: string
  segment: {
    segmentId: number
    segmentBody: string
    segmentAttention: string
  }[]
} 
