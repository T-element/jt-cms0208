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
      roleTotalCount: 0,
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
    changeRoleList(state, info) {
      state.roleList = info[0]
      state.roleTotalCount = info[1]
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
      if (res.status !== 200) {
        console.log('请求失败', res)
        return
      }
      commit('changeUserList', res.data.data)
    },

    async fetchRoleList({ commit }, config) {
      const res = await getRoleList(config)
      commit('changeRoleList', [res.data.data.list, res.data.data.totalCount])
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

function formatObjData(data) {
  if (data === null || data === undefined || !(data instanceof Object)) return
  const keys = Object.keys(data)
  keys.forEach((key) => {
    if (typeof data[key] === 'string') {
      data[key] = data[key].trim()
    }
  })
}

export default system
