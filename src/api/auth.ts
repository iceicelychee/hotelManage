import request from '../utils/request'

interface LoginData {
  username: string
  password: string
}

interface LoginRes {
  token: string
  user: {
    id: number
    username: string
  }
}

export const loginApi = (data: LoginData) => {
  return request.post<LoginRes>('/login', data)
}

export const registerApi = (data: LoginData) => {
  return request.post('/register', data)
}
