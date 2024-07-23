type ImportVueFileType = typeof import('*.vue')
type ImportVueFileFnType = () => Promise<ImportVueFileType>

// auto load
const modulesFiles = import.meta.glob<ImportVueFileType>('../../views/**/*.vue')

// generate components map
export const asyncRoutes = Object.entries(modulesFiles).reduce((routes, [url, importFn]) => {
  if (!/\/(views\/login|components)\//.test(url)) {
    const path = url.replace('../../views/', '').replace('.vue', '')
    routes[path] = importFn
  }
  return routes
}, {} as Recordable<ImportVueFileFnType>)
