import request from '@/utils/request'

export const getSearchList = ({ categoryId, goodsName, page }) => {
  return request.get('/goods/list', {
    params: {
      categoryId,
      goodsName,
      page
    }
  })
}
