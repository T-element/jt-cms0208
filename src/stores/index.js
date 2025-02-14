import { createStore } from 'vuex'
import analysis from './main/analysis/analysis'
import system from './main/system/system'
import product from './main/product/product'

const vuexStore = createStore({
  state() {
    return {
      name: 'vuex store',
    }
  },
  modules: {
    analysis,
    system,
    product,
  },
})

export default vuexStore
