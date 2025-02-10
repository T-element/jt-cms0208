import jtRequest from '../..'

export function getGoodsAmountList() {
  return jtRequest.get({
    url: '/goods/amount/list',
  })
}

export function getGoodsCategoryCount() {
  return jtRequest.get({
    url: '/goods/category/count',
  })
}

export function getGoodsCategorySale() {
  return jtRequest.get({
    url: '/goods/category/sale',
  })
}

export function getGoodsCategoryFavor() {
  return jtRequest.get({
    url: '/goods/category/favor',
  })
}

export function getGoodsAddressSale() {
  return jtRequest.get({
    url: '/goods/address/sale',
  })
}
