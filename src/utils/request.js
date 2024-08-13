import axios from 'axios'
import { Toast } from 'vant'
import { getToken, removeToken } from './storage'
// 引入router
import router from '@/router'

const instance = axios.create({
  baseURL: 'http://interview-api-t.itheima.net/h5',
  timeout: 5000
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么

  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么  脱皮
  return response.data
}, function (error) {
  // 对响应错误做点什么
  // token过期
  if (error.response.status === 401) {
    removeToken()
    Toast.fail('Token过期,请重新登录')
    return router.push('/login')
  }
  if (error.response) {
    Toast(error.response.data.message)
  }
  return Promise.reject(error)
})

export default instance
