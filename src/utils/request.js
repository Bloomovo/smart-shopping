// 导入 axios
import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store/index'
// 配置基地址
const instance = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  timeout: 5000
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
    loadingType: 'spinner'
  })

  const token = store.getters['user/getToken']
  if (token) {
    config.headers['Access-Token'] = token
    config.headers.platform = 'H5'
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (response.data.status !== 200) {
    Toast(response.data.message)
    return Promise.reject(response.data.message)
  } else {
    Toast.clear()
  }
  return response.data
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 导出 axios 实例
export default instance
