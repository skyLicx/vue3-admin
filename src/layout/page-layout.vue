<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade" mode="out-in" appear>
      <keep-alive :include="cacheList">
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
const cacheList = []
// import { computed } from 'vue'
// import { useTabBarStore } from '@/store'
// import useAppStore from '@/store/modules/app'

// const appStore = useAppStore()

// const tabBarStore = useTabBarStore()
// // 缓存路由列表
// const cacheList = computed(() => {
//   return tabBarStore.getCacheList
// })

// const isRouterAlive = computed(() => {
//   return appStore.getRouterAlive
// })
</script>
