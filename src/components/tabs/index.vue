<template>
  <div class="tabs-box">
    <el-tabs
      v-model="activeName"
      type="card"
      class="tabs"
      @tab-remove="removeTab"
      @tab-click="clickTab"
    >
      <el-tab-pane
        v-for="tabItem in tabsList"
        :key="tabItem.fullPath || tabItem.path"
        :label="tabItem.meta.title"
        :name="tabItem.fullPath || tabItem.path"
        :closable="!tabItem.meta.affix"
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { useTabsViewStore } from '@/store/modules/tabs'
import { useRouter } from 'vue-router'
import { computed, onMounted } from 'vue'
import { ElMessage, type TabsPaneContext } from 'element-plus'

defineOptions({
  name: 'Tabs'
})

const router = useRouter()
const tabsViewStore = useTabsViewStore()
const tabsList = computed(() => {
  return tabsViewStore.getTabsList
})

const activeName = computed({
  get: () => {
    return tabsViewStore.getCurrentTab?.fullPath || tabsViewStore.getCurrentTab?.path || ''
  },
  set: () => {}
})

const clickTab = (tab: TabsPaneContext) => {
  router.push(tab.paneName as string)
}

// 移除标签
const removeTab = (fullPath: string) => {
  if (tabsList.value.length === 1) {
    return ElMessage.warning('这已经是最后一页，不能再关闭了！')
  }
  const removeRoute = tabsList.value.find((item) => item.fullPath === fullPath)
  tabsViewStore.closeCurrentTab(removeRoute!)
}

onMounted(() => {
  tabsViewStore.addAffixTabs()
})
</script>

<style lang="scss">
.tabs-box {
  .tabs {
    .el-tabs__header {
      box-sizing: border-box;
      height: 40px;
      padding: 0 10px;
      margin: 0;
      .el-tabs__nav {
        border: none;
      }
      .el-tabs__item {
        border: none;
        &.is-active {
          color: var(--el-color-primary);
          &::before {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 0;
            content: '';
            border-bottom: 2px solid var(--el-color-primary);
          }
        }
      }
    }
  }
}
</style>
