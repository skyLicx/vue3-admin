<template>
  <div>
    <el-tabs
      v-model="activeName"
      type="card"
      class="tabs"
      closable
      @tab-remove="removeTab"
      @tab-click="clickTab"
    >
      <el-tab-pane
        v-for="tabItem in tabsList"
        :key="tabItem.fullPath"
        :label="tabItem.meta.title"
        :name="tabItem.fullPath"
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { useTabsViewStore } from '@/store/modules/useTabsViewStore'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { ElMessage, type TabsPaneContext } from 'element-plus'

const router = useRouter()
const tabsViewStore = useTabsViewStore()
const tabsList = computed(() => {
  return tabsViewStore.getTabsList
})

const activeName = computed({
  get: () => {
    return tabsViewStore.getCurrentTab?.fullPath
  },
  set: () => {}
})

const clickTab = (tab: TabsPaneContext) => {
  router.push(tab.paneName as string)
}

// 移除标签
const removeTab = (key: string) => {
  if (tabsList.value.length === 1) {
    return ElMessage.warning('这已经是最后一页，不能再关闭了！')
  }
  const removeRoute = tabsList.value.find((item) => item.fullPath === key)
  tabsViewStore.closeCurrentTab(removeRoute!)
}
</script>

<style lang="scss">
.tabs {
  .el-tabs__header {
    margin: 0;
  }
}
</style>
