import { createStore } from 'vuex'
import User from '@models/User.js'

export default createStore({
  state: {
    game_addr: localStorage.getItem('wsaddr'),
    user: new User()
  },
  mutations: {
    setGameAddr(state, addr) {
      localStorage.setItem('wsaddr', addr)
      state.game_addr = addr
    }
  },
  actions: {},
  modules: {}
})
