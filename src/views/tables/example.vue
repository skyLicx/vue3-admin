<template>
  <div>
    <el-table :data="tableData" v-table-adaptive style="width: 100%">
      <el-table-column prop="id" label="Id" width="180" />
      <el-table-column prop="title" label="Title" width="180" />
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="score" label="Score" />
      <el-table-column prop="stars" label="Stars" />
      <el-table-column prop="url" label="Url" />
      <el-table-column prop="city" label="City" />
      <el-table-column prop="date" label="Date" />
    </el-table>
    <el-pagination
      class="pagination-box"
      v-model:current-page="pagination.pageNum"
      v-model:page-size="pagination.pageSize"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts" setup>
import Api from '@/api'
import type { Tables } from '@/api/interface'
import { ref } from 'vue'

const tableData = ref<Tables.PageItem[]>([])
const pagination = ref({
  pageNum: 1,
  pageSize: 10,
  total: 0
})
const getPageList = async (params = {}) => {
  const queryData = {
    pageNum: pagination.value.pageNum,
    pageSize: pagination.value.pageSize,
    ...params
  }
  const data = await Api.tables.pageList(queryData)
  tableData.value = data.list
  pagination.value.total = data.total
}

const handleSizeChange = () => {
  pagination.value.pageNum = 1
  getPageList()
}

const handleCurrentChange = () => {
  getPageList()
}
getPageList()
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
