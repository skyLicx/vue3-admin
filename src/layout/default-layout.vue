<template>
  <el-container class="layout">
    <el-aside class="layout-sider">
      <Logo />
      <el-scrollbar class="menu-scroll">
        <Menu />
      </el-scrollbar>
      <CollapseIcon />
    </el-aside>
    <el-container>
      <el-header class="layout-header">
        <Tabs />
      </el-header>
      <el-main class="layout-main">
        <PageLayout />
      </el-main>
      <el-footer v-if="showFooter" class="layout-footer">
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
import CollapseIcon from '@/components/CollapseIcon.vue'
import PageLayout from './page-layout.vue'
import { computed } from 'vue'
import { useGlobalStore } from '@/store/modules/global'
const globalStore = useGlobalStore()
const showFooter = computed(() => globalStore.showFooter)
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100vh;
  position: relative;
  .layout-sider {
    width: auto;
    background-color: $side-bg-color;
    display: flex;
    flex-direction: column;
  }
  .menu-scroll {
    margin-top: 20px;
  }
  .layout-header {
    padding: 0;
    height: auto;
  }
  .layout-main {
    background-color: #f3f4f5;
  }
  .layout-footer {
    height: $footer-height;
  }
}
</style>
