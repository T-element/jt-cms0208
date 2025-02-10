import {
  getGoodsAddressSale,
  getGoodsAmountList,
  getGoodsCategoryCount,
  getGoodsCategoryFavor,
  getGoodsCategorySale,
} from '@/services'

const analysis = {
  namespaced: true,
  state() {
    return {
      statisticsData: [],
      goodsCountList: [],
      goodsSaleData: {},
      goodsFavorData: {},
      goodsAddressData: [],
    }
  },
  mutations: {
    changeStatisticsData(state, list) {
      state.statisticsData = list
    },

    changeGoodsCountList(state, list) {
      state.goodsCountList = list.map((item) => {
        if (item.name === 'Polo') item.goodsCount = 20
        return { value: item.goodsCount, name: item.name }
      })
    },

    changeGoodsSaleList(state, list) {
      state.goodsSaleData = list.reduce(
        (prev, item) => {
          prev.xAxisData.push(item.name)
          prev.values.push(item.goodsCount)
          return prev
        },
        { xAxisData: [], values: [] },
      )
    },

    changeGoodsFavorData(state, list) {
      state.goodsFavorData = list.reduce(
        (prev, item) => {
          prev.xAxisData.push(item.name)
          prev.values.push(item.goodsFavor)
          return prev
        },
        { xAxisData: [], values: [] },
      )
    },

    changeGoodsAddressData(state, list) {
      state.goodsAddressData = list.map((item) => {
        return { name: item.address, value: item.count }
      })
    },
  },
  actions: {
    async getAnalysisDataAction({ commit }) {
      const resStatisticsData = await getGoodsAmountList()
      commit('changeStatisticsData', resStatisticsData.data.data)

      const resGoodsCountList = await getGoodsCategoryCount()
      commit('changeGoodsCountList', resGoodsCountList.data.data)

      const resGoodsSaleList = await getGoodsCategorySale()
      commit('changeGoodsSaleList', resGoodsSaleList.data.data)

      const resGoodsFavorData = await getGoodsCategoryFavor()
      commit('changeGoodsFavorData', resGoodsFavorData.data.data)

      const resGoodsAddressData = await getGoodsAddressSale()
      commit('changeGoodsAddressData', resGoodsAddressData.data.data)
    },
  },
}

export default analysis
