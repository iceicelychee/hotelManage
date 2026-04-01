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
interface UserInfoRes {
  user: {
    id?: number
    username: string
    password: string
    // 其他字段...
    avatar?: string
    email?: string
  }
}
interface Role {
  id: number
  name: string
  description: string
}


export const loginApi = (data: LoginData) => {
  return request.post<LoginRes>('/login', data)
}

export const registerApi = (data: LoginData) => {
  return request.post('/register', data)
}
// 获取用户信息（不需要传参，token在请求头中）
export const getUserInfoApi = () => {
  return request.get<UserInfoRes>('/user/info')
}

// 获取用户角色
export const getRolesApi = () => {
  return request.get<Role[]>('/user/roles')
}
