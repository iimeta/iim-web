import axios from 'axios'
import { delAccessToken, getAccessToken } from '@/utils/auth'

const getBaseURL = () => {

  let baseURL = import.meta.env.VITE_BASE_API

  if (baseURL == "") {
    const url = new URL(window.location.href);
    baseURL = `${url.protocol}//${url.hostname}:${url.port || (url.protocol == 'https:' ? 443 : 80)}`;
  }

  console.log(baseURL)

  return baseURL
}


// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: getBaseURL(),

  // 请求超时时间
  timeout: 180000,
})

let once = false

/**
 * 异常拦截处理器
 *
 * @param {*} error
 */
const errorHandler = error => {
  // 判断是否是响应错误信息
  if (error.response) {
    if (error.response.status == 401) {
      delAccessToken()

      if (!once) {
        once = true
        window['$dialog'].info({
          title: '温馨提示',
          content: '当前登录状态已失效，请重新登录',
          positiveText: '重新登录',
          maskClosable: false,
          onPositiveClick: () => {
            location.reload()
          },
        })
      }
    }
  }

  return Promise.reject(error)
}

// 请求拦截器
request.interceptors.request.use(config => {
  const token = getAccessToken()

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
}, errorHandler)

// 响应拦截器
request.interceptors.response.use(response => response.data, errorHandler)

/**
 * GET 请求
 *
 * @param {String} url
 * @param {Object} data
 * @param {Object} options
 * @returns {Promise<any>}
 */
export const get = (url, data = {}, options = {}) => {
  return request({
    url,
    params: data,
    method: 'get',
    ...options,
  })
}

/**
 * POST 请求
 *
 * @param {String} url
 * @param {Object} data
 * @param {Object} options
 * @returns {Promise<any>}
 */
export const post = (url, data = {}, options = {}) => {
  return request({
    url,
    method: 'post',
    data: data,
    ...options,
  })
}

/**
 * 上传文件 POST 请求
 *
 * @param {String} url
 * @param {Object} data
 * @param {Object} options
 * @returns {Promise<any>}
 */
export const upload = (url, data = {}, options = {}) => {
  return request({
    url,
    method: 'post',
    data: data,
    ...options,
  })
}
