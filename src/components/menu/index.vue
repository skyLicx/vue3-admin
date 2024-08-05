<template>
  <component :is="menu" />
</template>
<script lang="tsx" setup>
defineOptions({
  name: 'SideMenu'
})

import { computed, h, ref, resolveComponent, watch, type VNode } from 'vue'
import { useRouter, type RouteMeta, type RouteRecordRaw } from 'vue-router'
import { openWindow } from '@/utils'
import { useUserStore } from '@/store'
import { useGlobalStore } from '@/store/modules/global'

const router = useRouter()
const userStore = useUserStore()
const globalStore = useGlobalStore()
const isCollapse = computed(() => globalStore.isCollapse)
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
              default: () => renderMenuTitle(route.meta!)
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
    popper-class={'sider-menu-popper'}
    default-active={selectedKey.value}
    collapse={isCollapse.value}
  >
    {renderSubMenu()}
  </el-menu>
)
</script>

<style lang="scss">
.sider-menu-wrapper {
  border-right: none;
  &:not(.el-menu--collapse) {
    width: 200px;
    .el-menu {
      .el-menu-item {
        margin: 0 14px;
        border-radius: 4px;
      }
    }
  }
  &.el-menu--collapse {
    .el-sub-menu.is-active {
      background-color: #2b3d47;
    }
  }
  .el-sub-menu.is-active {
    .el-sub-menu__title {
      color: var(--el-menu-active-color);
    }
  }
  .el-menu-item.is-active {
    background-color: #2b3d47;
  }
}
</style>
