import WS from './ws.js'
import { removeToken } from './auth.js'
import { sleep } from './tools'
import router from '../router/index.js'
import store from '../store/index.js'

let ws = null
let initing = false

async function init() {
  if (initing) return
  if (!store.state.game_addr) {
    toLogin()
    throw new Error('ws地址丢失')
  }
  initing = true
  console.log('初始化ws实例')
  ws = new WS(store.state.game_addr)
  await sleep(() => ws.isReady)
  bindEvent()
  initing = false
}

function toLogin() {
  removeToken()
  ws = null
  initing = false
  router.push({ name: 'Login' })
}

function bindEvent() {
  console.log('绑定路由推送事件')
  ws.routePush = {
    'login.userinfo'(data) {
      console.log('login.userinfo', data)
    }
  }
}

const game = {
  async getUserInfo() {
    const result = await ws.send('user.userinfo')
    console.log(result)
  }
}

Object.keys(game).map(funcName => {
  const func = game[funcName]
  if (typeof func === 'function') {
    // 复写方法，统一处理状态判断
    game[funcName] = async function() {
      if (!ws) {
        await init()
      }
      // 判断登录状态，防止并发
      await sleep(() => ws.isReady)
      return await func(...arguments)
    }
  }
})

export default game
