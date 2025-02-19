import { getRoleMenuByRoleId, queryRoleById } from '@/services'
import { defineStore } from 'pinia'

const useMainStore = defineStore('mainStore', {
  state() {
    return {
      roleMenu: [],
      freeRouteKey: [],
      firstView: true,
    }
  },
  actions: {
    async fetchRoleMenu(roleId) {
      const res1 = await queryRoleById(roleId)
      const res2 = await getRoleMenuByRoleId(res1.data.data.role.id)
      this.roleMenu = handleRoleMenuData(res2.data.data, this)
      return [...this.freeRouteKey]
    },
  },
})

function handleRoleMenuData(data, target) {
  if (data === null || data === undefined || !Array.isArray(data)) return data
  const targetKeys = ['name', 'icon', 'children', 'url']
  const res = data.map((item) => {
    return targetKeys.reduce((prev, key) => {
      if (item.hasOwnProperty(key)) {
        if (key === 'url' && !!item[key]) {
          target.freeRouteKey.push(item[key].split('/').pop())
        }
        prev[key] = handleRoleMenuData(item[key], target)
      }
      return prev
    }, {})
  })
  return res
}

export default useMainStore
