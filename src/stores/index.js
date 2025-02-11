import { createStore } from 'vuex'
import analysis from './main/analysis/analysis'
import system from './main/system/system'

const vuexStore = createStore({
  state() {
    return {
      name: 'vuex store',
    }
  },
  modules: {
    analysis,
    system,
  },
})

export default vuexStore
