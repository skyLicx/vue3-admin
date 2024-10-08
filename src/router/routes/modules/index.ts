import type { RouteRecordRaw } from 'vue-router'

const modules = import.meta.glob('../modules/*.ts', { eager: true })
function formatModules(_modules: any, result: RouteRecordRaw[]) {
  Object.keys(_modules).forEach((key) => {
    const defaultModule = _modules[key].default
    if (!defaultModule) return
    const moduleList = Array.isArray(defaultModule) ? [...defaultModule] : [defaultModule]
    result.push(...moduleList)
  })
  return result
}
const routeModules: RouteRecordRaw[] = formatModules(modules, [])

export default routeModules
