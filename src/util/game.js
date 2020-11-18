import WS from './ws.js'
import { getToken, removeToken } from './auth.js'
import { sleep } from './tools'
import router from '../router/index.js'

let ws

async function init() {
  console.log('初始化游戏实例')
  ws = new WS('ws://119.3.236.163:8081')
  bindEvent()
  await sleep(() => ws.isReady)
  console.log('握手成功，心跳正常')
  console.log('开始登录')
  const result = await ws.send('login.userLogin', { username: '封andy为土地公', token: getToken() })
  // 登录验证失败处理
  if (result.code === 500) {
    console.log('登录失败，跳转登录页面重登')
    removeToken()
    ws = null
    router.push({ name: 'Login' })
  } else {
    console.log('登录成功')
  }
}

function bindEvent() {
  console.log('绑定路由推送事件')
  ws.routePush = {
    'login.userLogin'(data) {
      console.log('login.userLogin', data)
    }
  }
}

const game = {
  async dosomething() {
    return 1
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
      return await func(...arguments)
    }
  }
})

export default game
