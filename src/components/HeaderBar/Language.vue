<template>
  <div class="language-box">
    <el-tooltip :content="$t('language')" placement="left">
      <el-dropdown trigger="click" @command="changeLocale">
        <img class="icon-language" src="@/assets/svg/icon-language.svg" alt="" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="item in locales" :key="item.value" :command="item.value">
              {{ item.label }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-tooltip>
  </div>
</template>

<script lang="ts" setup>
import useLocale from '@/hooks/useLocale'
import { LOCALE_OPTIONS } from '@/locales'
const { changeLocale } = useLocale()

const locales = [...LOCALE_OPTIONS]
</script>
<style lang="scss" scoped>
.icon-language {
  width: 16px;
  cursor: pointer;
}
</style>
