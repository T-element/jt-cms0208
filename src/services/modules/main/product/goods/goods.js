import jtRequest from '@/services/modules'

export function getGoodsList(config) {
  return jtRequest.post({
    url: '/goods/list',
    data: {
      ...config,
    },
  })
}

export function deleteGoodsById(id) {
  return jtRequest.delete({
    url: `/goods/${id}`,
  })
}

export function createGoods(config) {
  return jtRequest.post({
    url: '/goods',
    data: {
      ...config,
    },
  })
}

export function editGoods(config) {
  const { id } = config
  console.log(config)
  return jtRequest.patch({
    url: `/goods/${id}`,
    data: {
      ...config,
    },
  })
}
