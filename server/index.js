import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 3002

// 中间件
app.use(cors())
app.use(express.json())

// 模拟用户数据
const users = [
  { id: 1, username: 'admin', password: '123456' },
  { id: 2, username: '徐如生', password: '123456' },
]

// 模拟角色
const roles = [
  { id: 1, name: 'admin', description: '管理员' },
  { id: 2, name: 'user', description: '普通用户' },
]

// 登录接口
app.post('/api/login', (req, res) => {
  const { username, password } = req.body

  const user = users.find(u => u.username === username && u.password === password)

  if (user) {
    res.json({
      code: 200,
      message: '登录成功',
      data: {
        token: 'mock-token-' + Date.now(),
        user: { id: user.id, username: user.username }
      }
    })
  } else {
    res.status(401).json({
      code: 401,
      message: '用户名或密码错误',
      data: null
    })
  }
})

// 注册接口
app.post('/api/register', (req, res) => {
  const { username, password } = req.body

  const existingUser = users.find(u => u.username === username)
  if (existingUser) {
    return res.status(400).json({
      code: 400,
      message: '用户名已存在',
      data: null
    })
  }

  const newUser = {
    id: users.length + 1,
    username,
    password
  }
  users.push(newUser)

  res.json({
    code: 200,
    message: '注册成功',
    data: { id: newUser.id, username: newUser.username }
  })
})

// 获取角色列表（需要token）
app.get('/api/user/roles', (req, res) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({
      code: 401,
      message: '未登录',
      data: null
    })
  }

  res.json({
    code: 200,
    message: 'success',
    data: roles  // 返回完整角色列表
  })
})

// 

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
