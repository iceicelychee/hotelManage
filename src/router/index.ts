import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      meta: { title: '登录' },
      component: () => import('../views/Login.vue')
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/register',
      meta: { title: '注册' },
      component: () => import('../views/Register.vue')
    },
    
    {
      path: '/index',
      meta: { title: '首页' },
      component: () => import('../views/Index.vue'),
      children: [
        {
          path: '/home',
          meta: { title: '首页' },
          component: () => import('../views/Home.vue')
        },
        {
          path: '/mail',
          meta: { title: '邮件' },
          component: () => import('../views/Mail.vue')
        },
        {
          path: '/message',
          meta: { title: '消息' },
          component: () => import('../views/Message.vue')
        },
        {
          path: '/Mine',
          meta: { title: '个人中心' },
          component: () => import('../views/user/Mine.vue')
        },
        {
          path: '/SetPwd',
          meta: { title: '修改密码' },
          component: () => import('../views/user/SetPwd.vue')
        },
        {
          path: '/Role',
          meta: { title: '角色管理' },
          component: () => import('../views/user/Role.vue')
        },
        {
          path: '/User',
          meta: { title: '用户管理' },
          component: () => import('../views/user/User.vue')
        },
        {
          path: '/RoomType',
          meta: { title: '房型管理' },
          component: () => import('../views/room/RoomType.vue')
        },
        {
          path: '/Room',
          meta: { title: '房间管理' },
          component: () => import('../views/room/Room.vue')
        },
        {
          path: '/LiveIn',
          meta: { title: '入住管理' },
          component: () => import('../views/custom/LiveIn.vue')
        },
        {
          path: '/Order',
          meta: { title: '订单管理' },
          component: () => import('../views/custom/Order.vue')
        },
        {
          path: '/Menu',
          meta: { title: '菜单管理' },
          component: () => import('../views/system/Menu.vue')
        },
        {
          path: '/Dictionary',
          meta: { title: '字典管理' },
          component: () => import('../views/system/Dictionary.vue')
        }
      ]
    }
  ],
})

export default router
