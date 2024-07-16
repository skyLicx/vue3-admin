/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')
const path = require('path')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    // 文件import校验
    'plugin:import/recommended',
    'plugin:import/typescript',
    // prettier校验
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    // 使用最新的 ECMAScript 版本
    ecmaVersion: 'latest'
  },
  settings: {
    // 处理别名导入找不到模块问题
    'import/resolver': {
      typescript: {
        project: path.resolve(__dirname, './tsconfig.app.json')
      }
    }
  },
  rules: {
    // 将 Prettier 相关的规则设为警告级别
    'prettier/prettier': 'warn',
    'vue/multi-word-component-names': 0
  }
}
