import { createI18n } from 'vue-i18n'
import en from './en-US'
import cn from './zh-CN'

export const LOCALE_OPTIONS = [
  { label: '中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' }
]

// 默认读取本地存储语言设置
const defaultLocale = localStorage.getItem('locale') || 'zh-CN'
const i18n = createI18n({
  legacy: false,
  locale: defaultLocale, // 默认语言
  fallbackLocale: 'zh-CN', // 不存在默认则为英文
  messages: {
    'en-US': en, // 标识:配置对象
    'zh-CN': cn
  }
})

export default i18n
