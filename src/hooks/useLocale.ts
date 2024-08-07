import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

export default function useLocale() {
  const i18 = useI18n()
  const currentLocale = computed(() => {
    return i18.locale.value
  })
  const changeLocale = (value: string) => {
    i18.locale.value = value
    localStorage.setItem('locale', value)
    ElMessage.success(i18.t('headerBar.action.locale'))
  }
  const transformI18n = (value: any) => {
    return i18.t(value)
  }
  return {
    currentLocale,
    changeLocale,
    transformI18n
  }
}
