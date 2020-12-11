import type { App } from 'vue'
import { createStore } from 'vuex'

const store = createStore({
  state: {
    defaultMenuId: 0
  },
  mutations: {
    SET_ACTIVE (state, payload) {
      state.defaultMenuId = payload
    }
  },
  actions: {
  },
  modules: {
  }
})

export function setupStore (app: App<Element>) {
  app.use(store)
}

export default store
