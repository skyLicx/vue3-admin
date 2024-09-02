<template>
  <div>
    <el-form class="search-form" ref="searchFormRef" :model="searchForm" label-width="auto">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="Title" prop="title">
            <el-input v-model="searchForm.title" placeholder="Title" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="City" prop="city">
            <el-select v-model="searchForm.city" placeholder="Select" clearable>
              <el-option
                v-for="item in cityOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Date" prop="dateRange">
            <el-date-picker
              v-model="searchForm.dateRange"
              type="daterange"
              start-placeholder="Start date"
              end-placeholder="End date"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <div class="operation">
            <el-button type="primary" @click="onSearch"> 搜索 </el-button>
            <el-button @click="onReset"> 重置 </el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div class="tools-box">
      <el-button type="primary" @click="openExampleDialog('新增')">新增</el-button>
    </div>
    <el-table :data="tableData" v-table-adaptive style="width: 100%">
      <el-table-column prop="id" label="Id" width="180" />
      <el-table-column prop="title" label="Title" width="180" />
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="score" label="Score" />
      <el-table-column prop="stars" label="Stars" />
      <el-table-column prop="url" label="Url" />
      <el-table-column prop="city" label="City" />
      <el-table-column prop="date" label="Date" />
      <el-table-column fixed="right" label="Operations" min-width="160">
        <template #default="scope">
          <el-button type="primary" @click="openExampleDialog('查看', scope.row)">View</el-button>
          <el-button type="primary" @click="openExampleDialog('编辑', scope.row)">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      v-model:current-page="pagination.pageNum"
      v-model:page-size="pagination.pageSize"
      :total="pagination.total"
      @change="getPageList"
    />
    <ExampleDialog ref="exampleDialog" @reload="getPageList" />
  </div>
</template>

<script lang="ts" setup>
import Api from '@/api'
import type { Tables } from '@/api/interface'
import { onMounted, ref, watch } from 'vue'
import ExampleDialog from './components/ExampleDialog.vue'
import Pagination from '@/components/Pagination.vue'
import type { FormInstance } from 'element-plus'

const cityOptions = ref()
const getCityList = async () => {
  const data = await Api.tables.cityList()
  cityOptions.value = data
}

const tableData = ref<Tables.UserItem[]>([])
const pagination = ref({
  pageNum: 1,
  pageSize: 10,
  total: 0
})

const searchFormRef = ref<FormInstance>()
const searchForm = ref<Tables.UserListSearchForm>({
  title: '',
  city: '',
  startDate: '',
  endDate: '',
  dateRange: null
})

watch(
  () => searchForm.value.dateRange,
  (val: string[] | null) => {
    if (val) {
      searchForm.value.startDate = val[0]
      searchForm.value.endDate = val[1]
    } else {
      searchForm.value.startDate = ''
      searchForm.value.endDate = ''
    }
  }
)
const getPageList = async () => {
  const queryData: Tables.UserListReq = {
    pageNum: pagination.value.pageNum,
    pageSize: pagination.value.pageSize,
    ...searchForm.value
  }
  delete queryData.dateRange
  console.log('222')
  const data = await Api.tables.userList(queryData)
  tableData.value = data.list
  pagination.value.total = data.total
}

const onSearch = () => {
  pagination.value.pageNum = 1
  getPageList()
}

const onReset = () => {
  searchFormRef.value?.resetFields()
  // 防止日期未重置完就请求接口
  setTimeout(() => {
    onSearch()
  })
}

const exampleDialog = ref<InstanceType<typeof ExampleDialog> | null>(null)
const openExampleDialog = (title: string, row: Partial<Tables.UserItem> = {}) => {
  exampleDialog.value?.open({
    title,
    isView: title === '查看',
    row: row
  })
}

onMounted(() => {
  getCityList()
  getPageList()
})
</script>
<style lang="scss" scoped>
.search-form {
  background-color: #fff;
  padding: 20px 20px 0;
  .operation {
    display: flex;
    align-items: center;
  }
}

.tools-box {
  background-color: #fff;
  padding: 20px;
}
</style>
