import { createStore } from 'vuex'
import User from '@models/User.js'

export default createStore({
  state: {
    user: new User()
  },
  mutations: {},
  actions: {},
  modules: {}
})
