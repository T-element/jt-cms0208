import jtRequest from '@/services/modules'

export function getMenuList() {
  return jtRequest.post({
    url: '/menu/list',
  })
}
