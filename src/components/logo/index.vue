<template>
  <div class="logo">
    <img class="logo-img" src="~@/assets/logo.png" alt="" />
    <p class="title">Xuan-Admin</p>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Logo'
})
</script>
<style lang="scss" scoped>
.logo {
  height: $logo-header;
  background-color: #1f2c33;
  display: flex;
  flex-direction: column;
  align-items: center;
  .logo-img {
    height: 80px;
  }
  .title {
    color: #fff;
  }
}
</style>
