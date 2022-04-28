import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import UserStore from './modules/user'
import SystemStore from './modules/system'

export { UserStore, SystemStore }

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia
