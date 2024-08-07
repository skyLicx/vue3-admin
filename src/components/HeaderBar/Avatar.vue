<template>
  <div class="avatar-box">
    <span class="name">{{ userName }}</span>
    <el-dropdown trigger="click">
      <el-avatar :size="40" :src="userAvatar" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <el-icon><Edit /></el-icon>
            修改密码
          </el-dropdown-item>
          <el-dropdown-item @click="logout">
            <el-icon><SwitchButton /></el-icon>
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import defaultAvatar from '@/assets/images/default-avatar.png'
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
const userName = userStore.userInfo.userName
const userAvatar = userStore.userInfo.avatar || defaultAvatar
const logout = () => {
  userStore.logout()
}
</script>
<style lang="scss" scoped>
.avatar-box {
  display: flex;
  align-items: center;
  .name {
    padding: 0 10px;
  }
  .el-avatar {
    cursor: pointer;
  }
}
</style>
