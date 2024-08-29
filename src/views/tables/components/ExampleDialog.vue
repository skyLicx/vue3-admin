<template>
  <el-dialog
    v-model="dialogVisible"
    :title="props.title"
    :close-on-click-modal="false"
    width="500"
    draggable
  >
    <div>
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="auto"
        :disabled="props.isView"
      >
        <el-form-item label="Name" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="City" prop="city">
          <el-select v-model="form.city" placeholder="Select" clearable>
            <el-option
              v-for="item in cityOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Stars" prop="stars">
          <el-input-number v-model="form.stars" :min="0" :max="10" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onConfirm">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { Tables } from '@/api/interface'
import type { FormInstance, FormRules } from 'element-plus'
import Api from '@/api'

interface Props {
  row: Partial<Tables.UserItem>
  title?: string
  isView: boolean
}
const props = ref<Props>({
  title: '查看',
  isView: false,
  row: {}
})

const emit = defineEmits({
  reload: null
})

const dialogVisible = ref(false)

const cityOptions = ref()
const getCityList = async () => {
  const data = await Api.tables.cityList()
  cityOptions.value = data
}

const formRef = ref<FormInstance>()
const form = ref<Tables.UserForm>({
  name: '',
  city: '',
  stars: undefined
})
const rules = reactive<FormRules<typeof form>>({
  name: [{ required: true, trigger: 'blur' }],
  city: [{ required: true, trigger: 'blur' }]
})

const getDetailInfo = async (id: string) => {
  const data = await Api.tables.userInfo({ id })
  for (let key in form.value) {
    form.value[key] = data[key]
  }
}

const userEdit = async (params: Tables.UserForm) => {
  await Api.tables.userEdit({
    id: props.value.row.id,
    ...params
  })
}

const userAdd = async (params: Tables.UserForm) => {
  await Api.tables.userAdd({
    ...params
  })
}

const open = (params: Props) => {
  dialogVisible.value = true
  formRef.value?.resetFields()
  props.value = { ...props.value, ...params }
  getCityList()
  if (props.value.row.id) {
    getDetailInfo(props.value.row.id)
  }
}

const onConfirm = () => {
  formRef.value?.validate(async (valid) => {
    if (valid) {
      if (props.value.row.id) {
        await userEdit(form.value)
      } else {
        await userAdd(form.value)
      }
      dialogVisible.value = false
      emit('reload')
    } else {
      console.log('error submit!')
    }
  })
}

const onCancel = () => {
  dialogVisible.value = false
}

defineExpose({
  open
})
</script>
<style lang="less" scoped></style>
