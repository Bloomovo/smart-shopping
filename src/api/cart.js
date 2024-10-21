import request from '@/utils/request'
export const setCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}
export const getCart = () => {
  return request.get('/cart/list')
}

export const delCart = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds
  })
}
