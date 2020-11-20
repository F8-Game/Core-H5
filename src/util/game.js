import WS from './ws.js'
import { toLogin } from './auth.js'
import { sleep } from './tools'
import store from '../store/index.js'
import routeHooks from '../api/gameRouteHooks.js'

let ws = null
let initing = false

async function init() {
  if (initing) return
  if (!store.state.game_addr) {
    toLogin()
    ws = null
    throw new Error('ws地址丢失')
  }
  initing = true
  console.log('初始化ws实例')
  ws = new WS(store.state.game_addr)
  await sleep(() => ws.isReady, 2000)
  console.log('绑定路由推送')
  ws.routePush = routeHooks
  initing = false
}

export default {
  async send() {
    try {
      if (!ws) {
        init()
      }
      // 判断登录状态，防止并发
      await sleep(() => ws.isReady, 3000)
      return await ws.send(...arguments)
    } catch (e) {
      console.error(e)
      initing = false
    }
  }
}
