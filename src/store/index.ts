import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import useUserStore from './modules/user'

const pinia = createPinia()
pinia.use(
  createPersistedState({
    key: (id) => `${id}`,
    auto: false
  })
)
export { useUserStore }
export default pinia
