import axios from 'axios'

const service = axios.create({
    //baseURL: import.meta.env.VITE_APP_BASE_API,
    baseURL: 'http://localhost:3002/api',
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' }
})

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        // 从 localStorage 获取 token
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    (response) => {
        const { code, message, data } = response.data
        // 根据后端返回的 code 判断
        if (code === 200) {
            return data
        } else {
            return Promise.reject(new Error(message || '请求失败'))
        }
    },
    (error) => {
        const message = error.response?.data?.message || error.message || '网络错误'
        return Promise.reject(new Error(message))
    }
)

const request = {
    get: <T = any>(url: string, config?: any): Promise<T> => service.get(url, config),
    post: <T = any>(url: string, data?: any, config?: any): Promise<T> => service.post(url, data, config),
}
export default request
