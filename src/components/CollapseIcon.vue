<template>
  <div class="collapse">
    <el-icon class="collapse-icon" @click="toggleCollapse">
      <component :is="globalStore.isCollapse ? 'expand' : 'fold'"></component>
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/store/modules/global'
import { useDebounceFn } from '@vueuse/core'
import { onBeforeUnmount, ref } from 'vue'

const globalStore = useGlobalStore()
const toggleCollapse = () => globalStore.setGlobalState('isCollapse', !globalStore.isCollapse)

// 监听窗口大小变化，折叠侧边栏
const screenWidth = ref(0)
const listeningWindow = useDebounceFn(() => {
  screenWidth.value = document.body.clientWidth
  if (screenWidth.value < 1200) {
    globalStore.setGlobalState('isCollapse', true)
  }
  if (screenWidth.value > 1200) {
    globalStore.setGlobalState('isCollapse', false)
  }
}, 100)
window.addEventListener('resize', listeningWindow, false)
onBeforeUnmount(() => {
  window.removeEventListener('resize', listeningWindow)
})
</script>

<style scoped lang="scss">
.collapse {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 12px;
}
.collapse-icon {
  font-size: 38px;
  padding: 8px;
  cursor: pointer;
  color: #fff;
  border-radius: 4px;
  &:hover {
    color: var(--el-menu-active-color);
    background-color: #2b3d47;
  }
}
</style>
