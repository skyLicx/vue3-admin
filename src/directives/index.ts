import tableAdaptive from './modules/tableAdaptive'
import type { App } from 'vue'

const directivesList: any = {
  'table-adaptive': tableAdaptive
}

const directives = {
  install(app: App<Element>) {
    Object.keys(directivesList).forEach((key) => {
      // 注册自定义指令
      app.directive(key, directivesList[key])
    })
  }
}

export default directives
