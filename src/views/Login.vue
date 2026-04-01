<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage,ElNotification } from 'element-plus'
import type { FormInstance, FormRules, FormItemRule } from 'element-plus'
import { loginApi, registerApi, getUserInfoApi } from '../api/auth'
import { useUserStore } from '../stores/user'


const router = useRouter()
const userStore = useUserStore()

// 表单组件实例引用（用于调用 validate 等方法）
const loginFormRef = ref<FormInstance>()

// 登录按钮加载状态
const loading = ref(false)

// 表单数据
const loginForm = reactive({
  username: '',
  password: ''
})

// 表单验证规则
const loginRules: FormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur', min: 6, max: 18 }]
}

const validatePass: FormItemRule['validator'] = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (loginRules.password !== undefined) {
      if (!loginFormRef.value) return
      loginFormRef.value.validateField('password')
    }
    callback()
  }
}

const login = async () => {
  if (!loginFormRef.value) return

  // 表单验证
  const valid = await loginFormRef.value.validate().catch(() => false)
  if (!valid) return

  // 开始登录
  loading.value = true
  try {
    const res = await loginApi({
      username: loginForm.username,
      password: loginForm.password
    })

    // 保存 token
    localStorage.setItem('token', res.token)

    // 保存用户信息到 Pinia
    userStore.setUser(res.user)

    ElMessage.success('登录成功')

    // 跳转到首页
    router.push('/index/home')
  } catch (error: any) {
    // 显示错误信息
    ElMessage.error(error.message || '登录失败')
  } finally {
    loading.value = false
  }
}
const register = async () => {
  

}
const resetForm = (formEl: FormInstance | undefined) => {
  formEl?.resetFields()
}
</script>

<template>
  <main>
     <div class="login-container">
      <div class="login-title">
        <h2>登录</h2>
      </div>
      <el-form class="login-form" 
       label-width="auto"
       :model="loginForm"
       ref="loginFormRef"
       :rules="loginRules"
       style="width: 400px;"
       >
        <el-form-item label="用户名" prop="username">
         <el-input v-model="loginForm.username" placeholder="用户名" />
        </el-form-item>
       <el-form-item label="密码" prop="password">
         <el-input v-model="loginForm.password" placeholder="密码" type="password" />
       </el-form-item>
       <el-form-item class="login-form-button">
          <el-button type="primary" :loading="loading" @click="login">登录</el-button>
          <el-button @click="router.push('/register')">注册</el-button>
          <el-button @click="resetForm(loginFormRef)">重置</el-button>
       </el-form-item>
      </el-form>
    </div>
  </main>
</template>
<style scoped lang="scss">
main{
  background: linear-gradient(to bottom, #d6d2c4);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
    .login-container{
      width: 400px;
      height: 240px;
      padding: 20px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .login-title{
        margin-top: 20px;
      }
      .login-form{
        padding: 20px;
        margin-bottom: 20px;
      }
      .login-form-button :deep(.el-form-item__content) {
        justify-content: flex-end;
      }
    }

}
</style>
