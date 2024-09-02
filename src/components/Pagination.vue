<template>
  <div class="pagination-container" :style="{ display: isShow ? 'block' : 'none' }">
    <el-pagination
      class="pagination-box"
      :current-page="props.currentPage"
      :page-size="props.pageSize"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="props.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  isShow?: boolean
  currentPage: number
  pageSize: number
  total: number
}

const props = withDefaults(defineProps<Props>(), {
  isShow: true,
  currentPage: 1,
  pageSize: 10,
  total: 0
})

const emit = defineEmits({
  'update:current-page': null,
  'update:page-size': null,
  change: null
})

const handleSizeChange = (value: number) => {
  emit('update:current-page', 1)
  emit('update:page-size', value)
  emit('change')
}

const handleCurrentChange = (value: number) => {
  emit('update:current-page', value)
  emit('change')
}
</script>
<style lang="scss" scoped>
.pagination-box {
  margin-top: 20px;
  justify-content: flex-end;
  :deep(.el-pagination__classifier) {
    margin-left: 0;
  }
}
</style>
