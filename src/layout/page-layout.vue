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
import { useKeepAliveStore } from '@/store/modules/keepAlive'
import { computed } from 'vue'

const keepAliveStore = useKeepAliveStore()
// 缓存路由列表
const cacheList = computed(() => {
  return keepAliveStore.list
})
</script>
