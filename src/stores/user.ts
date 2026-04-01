import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// 用户数据类型定义
interface User {
  id: number
  username: string
  // 其他字段...
  avatar?: string
  email?: string
}

export const useUserStore = defineStore('user', () => {
  // 用户信息
  const user = ref<User | null>(null)

  // 是否已登录
  const isLoggedIn = computed(() => !!user.value)

  function getUserInfo() {
    return user.value
  }

  // 设置用户信息
  function setUser(userInfo: User) {
    user.value = userInfo
  }

  // 清除用户信息（退出登录）
  function clearUser() {
    user.value = null
    localStorage.removeItem('token')
  }

  return { user, isLoggedIn, setUser, clearUser }
}, {
  persist: true
})
