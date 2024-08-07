<template>
  <div class="header-bar-container">
    <div class="tools">
      <el-space>
        <Language />
      </el-space>
    </div>
    <Avatar />
  </div>
</template>

<script lang="ts" setup>
import Avatar from './Avatar.vue'
import Language from './Language.vue'
defineOptions({
  name: 'HeaderBar'
})
</script>
<style lang="scss" scoped>
.header-bar-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  border-bottom: 1px solid #eee;
}
</style>
