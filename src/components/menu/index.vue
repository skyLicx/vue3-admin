<template>
  <component :is="menu" />
</template>
<script lang="tsx" setup>
import { computed, h, ref, resolveComponent, watch, type VNode } from 'vue'
import { useRouter, type RouteMeta, type RouteRecordRaw } from 'vue-router'
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

const renderMenuTitle = (meta: RouteMeta) => {
  const { title, icon } = meta

  return icon ? (
    <>
      <el-icon>{h(resolveComponent(icon))}</el-icon>
      <span>{title}</span>
    </>
  ) : (
    <span>{title}</span>
  )
}

const renderSubMenu = () => {
  function travel(routes: RouteRecordRaw[], nodes: VNode[] = []) {
    routes.forEach((route) => {
      let node: VNode
      if (route.children?.length) {
        node = (
          <el-sub-menu index={route.name}>
            {{
              title: () => renderMenuTitle(route.meta!),
              default: () => travel(route.children as RouteRecordRaw[])
            }}
          </el-sub-menu>
        )
      } else {
        node = (
          <el-menu-item index={route.name} onClick={() => handleMenuItemClick(route)}>
            {{
              title: () => renderMenuTitle(route.meta!)
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
    background-color="#1F2C33"
    text-color="#C8C8C8"
    active-text-color="#0081E4"
    default-active={selectedKey.value}
  >
    {renderSubMenu()}
  </el-menu>
)
</script>

<style lang="scss" scoped>
.sider-menu-wrapper {
  min-height: 100%;
  width: 200px;
  border-right: none;
}
:deep(.el-sub-menu__title) {
  margin: 0 14px;
}
:deep(.el-menu-item) {
  margin: 0 14px;
  border-radius: 4px;
  // padding-left: 40px;
}
:deep(.el-menu:not(.el-menu--collapse)) {
  .el-menu-item.is-active {
    background-color: #2b3d47;
  }
}
</style>
