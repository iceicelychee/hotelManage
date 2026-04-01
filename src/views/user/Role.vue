<template>
  <div class="role">
    <div>
      <el-button type="primary" @click="dialog = true" style="margin: 10px;">新增角色</el-button>
    </div>
    <el-table :data="roles" style="width: 100% background-color: #333">
    <el-table-column prop="id" label="ID" width="auto" />
    <el-table-column prop="name" label="名称" width="auto" />
    <el-table-column prop="description" label="描述" width="auto" />
     <el-table-column fixed="right" label="操作" width="auto">
      <template #default="{ row }">
        <el-button link type="primary" size="small" @click="handleEdit(row)">
          编辑
        </el-button>
        <el-button link type="danger" size="small" @click="handleDelete(row)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>

   <el-drawer
    v-model="dialog"
    title="新增角色"
    direction="rtl"
  >
    <div class="demo-drawer__content">
      <el-form :model="formRole">
        <el-form-item label="名称" label-width="auto">
           <el-input v-model="formRole.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="权限" label-width="auto">
          <el-select
            v-model="formRole.region"
            placeholder="请选择权限"
          >
            <el-option label="管理员" value="shanghai" />
            <el-option label="普通用户" value="beijing" />
          </el-select>
        </el-form-item>
      </el-form>
      <div class="demo-drawer__footer">
        <el-button @click="cancelForm">取消</el-button>
        <el-button type="primary" :loading="loading" @click="onClick">
          {{ loading ? '提交中 ...' : '提交' }}
        </el-button>
      </div>
    </div>
  </el-drawer>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { getUserInfoApi, getRolesApi } from '@/api/auth'

const userInfo = ref<any>({})
const roles = ref<any>([])

const dialog = ref(false)
const loading = ref(false)
const formRole = reactive({
  name: '',
  region: ''
})

const onClick = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    dialog.value = false
  }, 1000)
}

const cancelForm = () => {
  dialog.value = false
}

const loadUserInfo = async () => {
  const res = await getUserInfoApi()
  console.log('getUserInfoApi', res)
  userInfo.value = res.user
}

const loadRoles = async () => {
  const res = await getRolesApi()
  console.log('getRolesApi', res)
  roles.value = res
}

const handleEdit = (row: any) => {
  console.log('编辑', row)
}
const handleDelete = (row: any) => {
  console.log('删除', row)
}


onMounted(async () => {
  ///loadUserInfo()
  loadRoles()
})

</script>
