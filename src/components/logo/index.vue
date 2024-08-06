<template>
  <div class="logo" :class="{ collapse: isCollapse }">
    <img class="logo-img" src="~@/assets/logo.png" alt="" />
    <span class="title">xxxx</span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useGlobalStore } from '@/store/modules/global'
defineOptions({
  name: 'Logo'
})
const globalStore = useGlobalStore()
const isCollapse = computed(() => globalStore.isCollapse)
</script>
<style lang="scss" scoped>
.logo {
  height: $logo-header-height;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  .logo-img {
    width: 60px;
  }
  .title {
    color: #fff;
    margin: 0 10px;
  }
}
.logo.collapse {
  .title {
    display: none;
  }
}
</style>
