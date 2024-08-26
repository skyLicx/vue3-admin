<template>
  <el-dialog v-model="dialogVisible" :title="props.title" width="500" draggable>
    <div>
      <el-input v-model="props.detailInfo.name" />
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="onCancel">Cancel</el-button>
        <el-button type="primary" @click="onConfirm"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { Tables } from '@/api/interface'

interface Props {
  detailInfo: Partial<Tables.PageItem>
  title?: string
  isView: boolean
}
const props = ref<Props>({
  title: '查看',
  isView: false,
  detailInfo: {}
})
const dialogVisible = ref(false)

const open = (params: Props) => {
  props.value = { ...props.value, ...params }
}

const onCancel = () => {
  dialogVisible.value = false
}

const onConfirm = () => {
  dialogVisible.value = false
}
defineExpose({
  open
})
</script>
<style lang="less" scoped></style>
