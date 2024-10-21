import request from '@/utils/request.js'
export const getAddressList = () => {
  return request.get('/address/list')
}
