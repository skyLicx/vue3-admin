<template>
  <div @click="test">workbench</div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store'
const userStore = useUserStore()
const test = () => {
  console.log(userStore.token)
}
</script>
<style lang="less" scoped></style>
