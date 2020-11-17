import WS from './ws.js'
import { getToken } from './auth.js'
import { sleep } from './tools'

const ws = new WS('ws://119.3.236.163:8081')

const game = {
  async login() {
    const result = await ws.send('login.userLogin', { username: '封andy为土地公', token: getToken() })
    console.log('async result: ', result)
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

