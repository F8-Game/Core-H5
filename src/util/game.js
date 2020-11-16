import WS from './ws.js'
import { getToken } from './auth.js'
import { sleep } from './tools'

export default class Game extends WS {
  constructor() {
    super('ws://119.3.236.163:8081')
    this.login()
  }
  async login() {
    await sleep(() => this.isReady)
    this.sendMessage({ username: '封andy为土地公', token: getToken() }, 'login.userLogin')
  }
}

