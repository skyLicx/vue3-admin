<template>
  <div class="login-container">
    <LoginForm />
  </div>
</template>

<script lang="ts" setup>
import LoginForm from './components/login-form.vue'
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100vh;
  background-image: url('@/assets/images/login-bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
