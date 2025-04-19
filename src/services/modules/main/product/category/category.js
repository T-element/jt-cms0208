import jtRequest from '@/services/modules'

export function getCategoryList(config) {
  return jtRequest.post({
    // url: '/category/list',
    url: '/goodsCategory/list',
    data: {
      ...config,
    },
  })
}

export function deleteCategoryById(id) {
  return jtRequest.delete({
    // url: `/category/${id}`,
    url: `/goodsCategory/${id}`,
  })
}

export function createCategory(config) {
  return jtRequest.post({
    // url: '/category',
    url: '/goodsCategory',
    data: {
      ...config,
    },
  })
}

export function editCategory(config) {
  const { id, name } = config
  return jtRequest.patch({
    // url: `/category/${id}`,
    url: `/goodsCategory/${id}`,
    data: {
      name,
    },
  })
}
