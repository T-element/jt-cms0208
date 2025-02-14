import { getCategoryList } from '@/services'

const product = {
  namespaced: true,
  state() {
    return {
      categoryList: [],
      categoryTotalCount: 0,
    }
  },
  mutations: {
    changeCategoryInfo(state, info) {
      state.categoryList = info.list
      state.categoryTotalCount = info.totalCount
    },
  },
  actions: {
    async fetchCategoryInfo({ commit }, config) {
      const res = await getCategoryList(config)
      commit('changeCategoryInfo', {
        list: res.data.data.list,
        totalCount: res.data.data.totalCount,
      })
    },
  },
}

export default product
