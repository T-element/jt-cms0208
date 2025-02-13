import jtRequest from '@/services/modules'

export function getMenuList() {
  return jtRequest.post({
    url: '/menu/list',
  })
}

export function getRoleMenuIds(id) {
  return jtRequest.get({
    url: `/role/${id}/menuIds`,
  })
}

export function patchRole(data) {
  const { id, name, intro, menuList } = data
  return jtRequest.patch({
    url: `/role/${id}`,
    data: {
      name,
      intro,
      menuList,
    },
  })
}
