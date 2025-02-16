import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vuexStore from './stores'
import router from './router'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import 'normalize.css'
import './assets/css/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(vuexStore)
app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
})

//注册elementUI所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

//生产环境消除console.log的打印
if (import.meta.env.MODE === 'production') {
  console.log = (prop) => {}
}

app.mount('#app')
