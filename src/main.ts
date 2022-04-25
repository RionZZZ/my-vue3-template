import { createApp } from 'vue'
import 'normalize.css'
import TDesign from 'tdesign-vue-next'
import 'tdesign-vue-next/es/style/index.css'
import './assets/styles/common.scss'
import App from './App.vue'
import router from './router'
import pinia from './store'

document.title = import.meta.env.VITE_APP_TITLE

const app = createApp(App).use(router).use(pinia).use(TDesign)

app.mount('#app')
