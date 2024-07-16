<template>
  <component :is="menu" />
</template>
<script lang="tsx" setup>
import { ref, watch, type VNode } from 'vue'
import { useRouter, type RouteRecordRaw } from 'vue-router'
import { openWindow, regexUrl } from '@/utils'
import useMenuTree from './useMenuTree'

const router = useRouter()
// 选中项
const selectedKey = ref<string>('')
// 路由菜单
const { menuTree } = useMenuTree()
// 路由跳转
const goto = (item: RouteRecordRaw) => {
  // Open external link
  if (regexUrl.test(item.path)) {
    openWindow(item.path)
    selectedKey.value = item.name as string
    return
  }
  router.push({
    name: item.name
  })
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
          <el-menu-item index={route.name} onClick={() => goto(route)}>
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
    style="--el-menu-bg-color: #33363D;--el-menu-text-color: #C8C8C8;--el-menu-active-color: #fff;--el-menu-hover-bg-color: #3F4247;"
    default-active={selectedKey.value}
  >
    {renderSubMenu()}
  </el-menu>
)
</script>

<style lang="scss" scoped>
.el-menu:not(.el-menu--collapse) {
  width: 200px;
}
.el-menu:not(.el-menu--popup) {
  .el-menu-item.is-active {
    background-color: #3f4247;
  }
}
</style>
