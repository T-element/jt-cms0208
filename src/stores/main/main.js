import { getRoleMenuByRoleId } from '@/services'
import { defineStore } from 'pinia'

const useMainStore = defineStore('mainStore', {
  state() {
    return {
      roleMenu: [],
    }
  },
  actions: {
    async fetchRoleMenu(roleId) {
      const res = await getRoleMenuByRoleId(roleId)
      console.log('roleMenuSource', res.data.data)
      this.roleMenu = handleRoleMenuData(res.data.data)
    },
  },
})

function handleRoleMenuData(data) {
  if (data === null || data === undefined || !Array.isArray(data)) return data
  const targetKeys = ['name', 'icon', 'children']
  const res = data.map((item) => {
    return targetKeys.reduce((prev, key) => {
      if (item.hasOwnProperty(key)) {
        prev[key] = handleRoleMenuData(item[key])
      }
      return prev
    }, {})
  })
  return res
}

export default useMainStore
