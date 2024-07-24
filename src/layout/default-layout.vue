<template>
  <el-container class="layout">
    <el-aside class="layout-sider">
      <Logo />
      <el-scrollbar class="menu-scroll">
        <Menu />
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header class="layout-header">
        <Tabs />
      </el-header>
      <el-main class="layout-main">
        <section class="app-main">
          <PageLayout />
        </section>
      </el-main>
      <el-footer v-if="showFooter">
        <Footer />
      </el-footer>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import Logo from '@/components/logo/index.vue'
import Footer from '@/components/footer/index.vue'
import Menu from '@/components/menu/index.vue'
import Tabs from '@/components/tabs/index.vue'
import PageLayout from './page-layout.vue'
import { ref } from 'vue'

const showFooter = ref(false)
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100vh;
  position: relative;
  .layout-sider {
    width: auto;
  }
  :deep(.menu-scroll) {
    height: calc(100vh - $logo-header);
    .el-scrollbar__view {
      height: 100%;
    }
  }
  .layout-header {
    padding: 0;
    height: auto;
  }
  .layout-main {
    background-color: #f3f4f5;
  }
}
</style>
