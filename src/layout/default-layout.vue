<template>
  <el-container class="layout">
    <el-aside class="layout-sider">
      <el-scrollbar>
        <Menu />
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header class="layout-header"> </el-header>
      <el-main class="layout-main">
        <el-scrollbar>
          <section class="app-main">
            <PageLayout />
          </section>
        </el-scrollbar>
      </el-main>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import Menu from '@/components/menu/index.vue'
import PageLayout from './page-layout.vue'
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100vh;
  position: relative;
  .layout-sider {
    width: auto;
    background-color: #33363d;
  }
  .el-menu {
    border-right: none;
  }
  .layout-header {
    padding: 0;
    height: auto;
  }
  .layout-main {
    padding: 0;
    background-color: #fff;
  }
  :deep(.el-scrollbar__view) {
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }
  .app-main {
    flex: 1;
  }
}
</style>
