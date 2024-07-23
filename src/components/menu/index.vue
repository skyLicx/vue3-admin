<template>
  <component :is="menu" />
</template>
<script lang="tsx" setup>
import { computed, ref, watch, type VNode } from 'vue'
import { useRouter, type RouteRecordRaw } from 'vue-router'
import { openWindow } from '@/utils'
import { useUserStore } from '@/store'

const router = useRouter()
const userStore = useUserStore()
// 选中项
const selectedKey = ref<string>('')
// 路由菜单
const menuTree = computed(() => userStore.menus)

const handleMenuItemClick = (item: RouteRecordRaw) => {
  const { isExt, extOpenMode } = item.meta || {}
  if (isExt && extOpenMode !== 2) {
    openWindow(item.path)
  } else {
    router.push({ name: item.name })
  }
}

watch(
  () => router.currentRoute.value,
  (route) => {
    selectedKey.value = route.name as string
  },
  {
    immediate: true
  }
)

const renderSubMenu = () => {
  function travel(routes: RouteRecordRaw[], nodes: VNode[] = []) {
    routes.forEach((route) => {
      let node: VNode
      if (route.children?.length) {
        node = (
          <el-sub-menu index={route.name}>
            {{
              title: () => route.meta?.title,
              default: () => travel(route.children as RouteRecordRaw[])
            }}
          </el-sub-menu>
        )
      } else {
        node = (
          <el-menu-item index={route.name} onClick={() => handleMenuItemClick(route)}>
            {{
              title: () => route.meta?.title
            }}
          </el-menu-item>
        )
      }
      nodes.push(node)
    })
    return nodes
  }
  return travel(menuTree.value)
}
const menu = () => (
  <el-menu
    class="sider-menu-wrapper"
    style="--el-menu-bg-color: #33363D;--el-menu-text-color: #C8C8C8;--el-menu-active-color: #fff;--el-menu-hover-bg-color: #3F4247;"
    default-active={selectedKey.value}
  >
    {renderSubMenu()}
  </el-menu>
)
</script>

<style lang="scss" scoped>
.sider-menu-wrapper {
  min-height: 100vh;
  background-color: #33363d;
  width: 200px;
}
:deep(.el-menu:not(.el-menu--collapse)) {
  .el-menu-item.is-active {
    background-color: #3f4247;
  }
}
</style>
