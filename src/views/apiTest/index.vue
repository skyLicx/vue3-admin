<template>
  <div>
    <el-button type="primary" @click="sendRequest">发送请求</el-button>
  </div>
</template>

<script lang="ts" setup>
import Api from '@/api/'

const getPageList = async () => {
  try {
    await Api.test.pageList({
      pageNum: 1,
      pageSize: 10
    })
  } catch (error) {
    console.log(error)
  }
}
const getPageList2 = async () => {
  try {
    await Api.test.pageList2({
      pageNum: 1,
      pageSize: 10
    })
  } catch (error) {
    console.log(error)
  }
}
const sendRequest = () => {
  getPageList()
  getPageList2()
}
</script>
<style lang="scss" scoped></style>
