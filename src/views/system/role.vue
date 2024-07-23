<template>
  <div>
    role
    <el-input v-model="val"></el-input>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

defineOptions({
  name: 'Role'
})

const val = ref('')
</script>
<style lang="less" scoped></style>
