<template>
  <div class="collapse">
    <el-icon class="collapse-icon" @click="toggleCollapse">
      <component :is="globalStore.isCollapse ? 'expand' : 'fold'"></component>
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/store/modules/global'

const globalStore = useGlobalStore()
const toggleCollapse = () => globalStore.setGlobalState('isCollapse', !globalStore.isCollapse)
</script>

<style scoped lang="scss">
.collapse {
  padding: 12px;
  width: 100%;
  text-align: center;
  height: 48px;
}
.collapse-icon {
  font-size: 22px;
  color: var(--el-header-text-color);
  cursor: pointer;
  color: #fff;
}
</style>
