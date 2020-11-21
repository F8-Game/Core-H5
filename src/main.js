import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './Layout'

import { Button, Form, Input, Row, Col, Menu, Dropdown, Tabs, Select, Progress } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import 'normalize.css/normalize.css'
import './style/global.less'
import './permission'

const app = createApp(App)

app.use(store).use(router)
app.use(Button)
  .use(Form)
  .use(Input)
  .use(Row)
  .use(Col)
  .use(Menu)
  .use(Dropdown)
  .use(Tabs)
  .use(Select)
  .use(Progress)
app.mount('#app')
