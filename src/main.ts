// import './assets/main.css'

import { createApp } from 'vue'
// 引入element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// 注入element plus
app.use(ElementPlus)

app.use(router)

app.mount('#app')
