import { createPinia } from 'pinia'
import UserStore from './modules/user'
import SystemStore from './modules/system'

export { UserStore, SystemStore }

export default createPinia()
