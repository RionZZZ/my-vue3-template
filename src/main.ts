import { createApp } from 'vue'
import 'normalize.css'
import TDesign from 'tdesign-vue-next'
import 'tdesign-vue-next/es/style/index.css'
import './assets/styles/common.scss'
import App from './App.vue'
import router from './router'
import pinia from './store'
import DebounceButton from '@component/button.vue'
import TablePagination from '@component/pagination.vue'

document.title = import.meta.env.VITE_TITLE

const app = createApp(App).use(router).use(pinia).use(TDesign)

// 公共组件引入
app.component('DebounceButton', DebounceButton)
app.component('TablePagination', TablePagination)

app.mount('#app')
