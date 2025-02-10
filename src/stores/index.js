import { createStore } from 'vuex'
import analysis from './main/analysis/analysis'

const vuexStore = createStore({
  state() {
    return {
      name: 'vuex store',
    }
  },
  modules: {
    analysis,
  },
})

export default vuexStore
