export interface User {
  id?: number;
  password: string;
  email: string;
}

export interface GetUser {
  id: number;
  name: string;
  email: string;
}

export interface GetFetchUser {
  created_at: string;
  email: string;
  id: number;
  name: string;
  password_digest: string;
  updated_at: string;
}
