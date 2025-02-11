import { getDepartmentList, getRoleList, getUsersList } from '@/services'

const system = {
  namespaced: true,
  state() {
    return {
      userList: {
        list: [],
        totalCount: 0,
      },
      roleList: [],
      departmentList: [],
    }
  },
  mutations: {
    changeUserList(state, data) {
      state.userList.list = data.list
      state.userList.totalCount = data.totalCount
    },
    changeRoleList(state, list) {
      state.roleList = list
    },
    changeDepartmentList(state, list) {
      state.departmentList = list
    },
  },
  actions: {
    async fetchUserList({ commit }, config = { offset: 0, size: 10 }) {
      const res = await getUsersList(config)
      commit('changeUserList', res.data.data)
    },

    async fetchRoleList({ commit }, config) {
      const res = await getRoleList(config)
      commit('changeRoleList', res.data.data.list)
    },

    async fetchDepartmentList({ commit }, config) {
      const res = await getDepartmentList(config)
      commit('changeDepartmentList', res.data.data.list)
    },
  },
}

export default system
