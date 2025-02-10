import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vuexStore from './stores'
import router from './router'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import 'normalize.css'
import './assets/css/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(vuexStore)
app.use(router)

//注册elementUI所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
