<script setup lang="ts">
import {
  Avatar,
  OfficeBuilding,
  Menu as IconMenu,
  PhoneFilled,
  House,
  ChatLineSquare,
  Message,
  UserFilled,
  Location,
  Setting,
} from '@element-plus/icons-vue'

</script>
<template>
  <div class="home">
    <aside>
      <h2>酒店管理系统</h2>
      <nav class="menu">
       <el-menu
          :router="true"
          active-text-color="#ffd04b"
          background-color="#70a1d7"
          class="el-menu-vertical-demo"
          default-active="2"
          text-color="#fff"
       >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><Avatar /></el-icon>
            <span>账号管理</span>
          </template>
          <el-menu-item index="/role">角色管理</el-menu-item>
          <el-menu-item index="/user">用户管理</el-menu-item>
        </el-sub-menu>
      
        <el-sub-menu index="2">
          <template #title>
            <el-icon><OfficeBuilding /></el-icon>
            <span>客房管理</span>
          </template>
          <el-menu-item index="/roomtype">房型管理</el-menu-item>
          <el-menu-item index="/room">房间管理</el-menu-item>
        </el-sub-menu>

         <el-sub-menu index="3">
          <template #title>
            <el-icon><PhoneFilled /></el-icon>
            <span>客户管理</span>
          </template>
          <el-menu-item index="/livein">入住管理</el-menu-item>
          <el-menu-item index="/order">退房管理</el-menu-item>
        </el-sub-menu>
         <el-sub-menu index="4">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item index="/menu">菜单管理</el-menu-item>
          <el-menu-item index="/dictionary">字典管理</el-menu-item>
        </el-sub-menu>
      </el-menu>
   
      </nav>
    </aside>
    <main>
      <header style="background-color: #f7f48b;">
        <nav>
          <el-menu
          router
          :ellipsis="false"
          class="el-menu-demo"
          background-color="#f7f48b" 
          text-color="#333"
          mode="horizontal"
        >
        <el-menu-item index="/home"><el-icon><House /></el-icon>首页</el-menu-item>
        <el-menu-item index="/mail"><el-icon><Message /></el-icon>邮件</el-menu-item>
        <el-menu-item index="/message"><el-icon><ChatLineSquare /></el-icon>消息</el-menu-item>
        <el-sub-menu index="/user">
            <template #title><el-icon><UserFilled /></el-icon>个人中心</template>
            <el-menu-item index="/mine">个人中心</el-menu-item>
            <el-menu-item index="/setpwd">修改密码</el-menu-item>
            <el-menu-item >退出登录</el-menu-item>
          </el-sub-menu>
          </el-menu>
        </nav>
      </header>
      <div id="content">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
.home{
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  background-color: #bfc;
    aside{
      width: 270px;
      height: 100%;
      background-color: #70a1d7;
        h2{
          margin-bottom: 30px;
          padding: 15px 10px 10px 10px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          color: #e8e8e8;
          font-family: '宋体', sans-serif;
        }
    }
    main{
      display: flex;
      flex-direction: column;
      width: 100%;
      background-color: #a1de93;
       header{
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
         #content{
          padding: 5px;
          flex: 1;
         }
       }
    }
}
</style>
