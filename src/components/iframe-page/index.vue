<template>
  <div class="iframe-box" v-loading="loading">
    <iframe class="iframe" v-bind="$attrs" :src="src" @load="onFrameLoad" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

defineOptions({
  name: 'IFramePage'
})

defineProps({
  src: {
    type: String,
    required: true
  }
})

const loading = ref(true)

const onFrameLoad = () => {
  loading.value = false
}
</script>
<style lang="scss" scoped>
.iframe-box {
  width: 100%;
  height: 100%;
}
.iframe {
  width: 100%;
  height: 100%;
}
</style>
