import { createStore } from 'vuex'
import User from '@models/User.js'

export default createStore({
  state: {
    game_addr: null,
    user: new User()
  },
  mutations: {
    setGameAddr(state, addr) {
      state.game_addr = addr
    }
  },
  actions: {},
  modules: {}
})
