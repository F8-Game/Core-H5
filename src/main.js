import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './Layout'

import { Button, Form, Input } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import 'normalize.css/normalize.css'

const app = createApp(App)

app.use(store).use(router)
app.use(Button).use(Form).use(Input)
app.mount('#app')
