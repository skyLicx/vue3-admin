<script lang="tsx">
import { defineComponent, ref, watch } from 'vue'
import { useRouter, type RouteRecordRaw } from 'vue-router'
import { openWindow, regexUrl } from '@/utils'
import useMenuTree from './useMenuTree'

export default defineComponent({
  setup() {
    // const appStore = useAppStore()
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
        selectedKey.value = route.name
      },
      {
        immediate: true
      }
    )

    // 侧边栏render
    const renderSubMenu = () => {
      function travel(_route: RouteRecordRaw[], nodes = []) {
        if (_route) {
          _route.forEach((element) => {
            // 有children渲染一级菜单 没有就渲染子菜单
            const node =
              element?.children && element?.children.length !== 0 ? (
                <el-sub-menu index={element?.meta.title}>
                  {{
                    title: () => element?.meta.title,
                    default: () => travel(element?.children)
                  }}
                </el-sub-menu>
              ) : (
                <el-menu-item index={element?.meta.title} onClick={() => goto(element)}>
                  {{
                    title: () => {
                      return element?.meta.title
                    }
                  }}
                </el-menu-item>
              )
            nodes.push(node as never)
          })
        }
        return nodes
      }
      return travel(menuTree.value)
    }
    return () => (
      <el-menu
        style="--el-menu-bg-color: #33363D;--el-menu-text-color: #C8C8C8;--el-menu-active-color: #fff;--el-menu-hover-bg-color: #3F4247;"
        default-active={selectedKey.value}
      >
        {renderSubMenu()}
      </el-menu>
    )
  }
})
</script>
<!-- <template>
  <el-menu
    style="
      --el-menu-bg-color: #33363d;
      --el-menu-text-color: #c8c8c8;
      --el-menu-active-color: #fff;
      --el-menu-hover-bg-color: #3f4247;
    "
    default-active="{selectedKey.value}"
  >
  </el-menu>
</template>

<script lang="ts" setup>
import { useRouter, type RouteRecordRaw } from 'vue-router'
</script> -->

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
