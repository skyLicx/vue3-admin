<template>
  <div class="login-form-wrapper">
    <el-form ref="formRef" class="login-form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="login"> login </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store'
import useLoading from '@/hooks/loading'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { loading, setLoading } = useLoading()

const formRef = ref<FormInstance>()
const form = ref<API.LoginDto>({
  userName: 'admin',
  password: '123456'
})

const rules = ref<FormRules<typeof form>>({
  userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

const login = async () => {
  await formRef.value?.validate(async (valid) => {
    if (valid) {
      setLoading(true)
      try {
        await userStore.login(form.value)
        setTimeout(() => router.replace((route.query.redirect as string) || '/'))
        ElMessage({
          message: '登录成功',
          type: 'success'
        })
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.login-form-wrapper {
  padding: 40px;
  background-color: rgba($color: #fff, $alpha: 0.3);
}
</style>
