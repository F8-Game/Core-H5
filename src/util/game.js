import WS from './ws.js'
import { getToken, removeToken } from './auth.js'
import { sleep } from './tools'
import router from '../router/index.js'

const ws = new WS('ws://119.3.236.163:8081')

const game = {
  async login() {
    const result = await ws.send('login.userLogin', { username: '封andy为土地公', token: getToken() })
    console.log('async result: ', result)
    // 验证失败处理
    if (result.code === 500) {
      removeToken()
      router.push({ name: 'Login' })
    }
  }
}

Object.keys(game).map(funcName => {
  const func = game[funcName]
  game[funcName] = async function() {
    // 复写方法，统一处理状态判断
    await sleep(() => ws.isReady)
    return await func(...arguments)
  }
})

// 连上了必须先登录，不然会被踢下来
game.login()

export default game

