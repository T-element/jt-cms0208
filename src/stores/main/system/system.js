import { getDepartmentList, getMenuList, getRoleList, getUsersList } from '@/services'

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
      departmentTotalCount: 0,
      menuList: [],
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
    changeDepartmentInfo(state, info) {
      state.departmentList = info[0]
      state.departmentTotalCount = info[1]
    },
    changeMenuList(state, list) {
      state.menuList = list
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
      commit('changeDepartmentInfo', [res.data.data.list, res.data.data.totalCount])
    },

    async fetchMenuList({ commit }) {
      const res = await getMenuList()
      commit('changeMenuList', res.data.data.list)
    },
  },
}

export default system
