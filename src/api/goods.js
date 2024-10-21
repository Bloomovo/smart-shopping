import request from '@/utils/request'
// 商品详情主要内容渲染
export const getGoods = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}
// 商品详情评论渲染
export const getComment = (goodsId, limit) => {
  return request.get('/comment/listRows', {
    params: {
      goodsId,
      limit
    }
  })
}
