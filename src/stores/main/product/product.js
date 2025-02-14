import { getCategoryList, getGoodsList } from '@/services'

const product = {
  namespaced: true,
  state() {
    return {
      categoryList: [],
      categoryTotalCount: 0,
      goodsList: [],
      goodsTotalCount: 0,
    }
  },
  mutations: {
    changeCategoryInfo(state, info) {
      state.categoryList = info.list
      state.categoryTotalCount = info.totalCount
    },
    changeGoodsInfo(state, info) {
      state.goodsList = info.list
      state.goodsTotalCount = info.totalCount
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
    async fetchGoodsInfo({ commit }, config) {
      const mode = config.requestMode
      delete config.requestMode
      const res = await getGoodsList(config)
      commit('changeGoodsInfo', {
        list: res.data.data.list,
        totalCount:
          mode === 'query' ? res.data.data.list.length : res.data.data.totalCount,
      })
    },
  },
}

export default product
