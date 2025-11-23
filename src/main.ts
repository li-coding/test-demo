import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
const app = createApp(App)

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import '@/style/main.css'

app.use(createPinia())
app.use(router)
app.use(Antd)
// app.use(ElementPlus)
app.mount('#app')
