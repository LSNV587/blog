import axios from 'axios'
import store from '@/store'
import { getToken, getRefreshToken } from '@/utils/auth'
import qs from 'qs'
import { checkStatus, checkCode } from '@/utils/checkRes'
let isRefreshing = false
let refreshSubscribers = []
const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 10000
})
service.interceptors.request.use(config => {
  if (store.getters.token && store.getters.refreshToken) {
    if (config.url.indexOf('oauth2/refresh_token') !== -1) {
      config.headers['refresh_token'] = getRefreshToken()
    }
    config.headers['access_token'] = getToken()
  }
  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use(response => {
  return new Promise((resolve) => {
    if (response.data.type) {
      const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' })
      // 读取异常状态提示
      var reader = new FileReader()
      reader.readAsText(blob)
      reader.onload = e => {
        if ((e.target.result.indexOf('message') !== -1) && JSON.parse(e.target.result).code !== 200) {
          response.data = JSON.parse(e.target.result)
        }
        resolve()
      }
    } else {
      resolve()
    }
  }).then(() => {
    const originalRequest = response.config
    const code = response.data.code ? response.data.code : ''
    if (code === 401101 || code === 401102 || code === 401103) {
      var subscribeTokenRefresh = function(cb) {
        refreshSubscribers.push(cb)
      }
      var onRrefreshen = function(token) {
        refreshSubscribers.map(cb => cb(token))
        refreshSubscribers = []
      }
      const retryOrigReq = new Promise((resolve, reject) => {
        subscribeTokenRefresh(token => {
          originalRequest.headers['access_token'] = token
          resolve(axios(originalRequest))
        })
      })
      if (!isRefreshing && (originalRequest.headers.access_token === store.getters.token)) {
        isRefreshing = true
        store.dispatch('RefreshAccessToken', store.getters.refreshToken).then(
          newToken => {
            isRefreshing = false
            onRrefreshen(newToken)
          }
        )
      } else if (!isRefreshing && (originalRequest.headers.access_token !== store.getters.token)) {
        onRrefreshen(store.getters.token)
      }
      return retryOrigReq
    }
    return response
  })
}, error => Promise.resolve(error.response))

export default {
  post(url, sourceData, contentType) {
    const type = contentType || 'application/x-www-form-urlencoded; charset=UTF-8'
    const data = contentType ? sourceData : qs.stringify(sourceData)
    return service({
      method: 'post',
      url,
      // data: qs.stringify(data),
      data,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': type
      }
    }).then(response => checkStatus(response)).then(response => checkCode(response))
  },
  put(url, sourceData, contentType) {
    const type = contentType || 'application/x-www-form-urlencoded; charset=UTF-8'
    const data = contentType ? sourceData : qs.stringify(sourceData)
    return service({
      method: 'put',
      url,
      data,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': type
      }
    }).then(response => checkStatus(response)).then(response => checkCode(response))
  },
  get(url, params, timeout) {
    return service({
      method: 'get',
      url,
      params,
      timeout,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(response => checkStatus(response)).then(response => checkCode(response))
  },
  downloadExcel(url, params) {
    return service({
      method: 'get',
      url,
      params,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(response => checkStatus(response))
  },
  delete(url, params, data, contentType) {
    const type = contentType || 'application/x-www-form-urlencoded; charset=UTF-8'
    return service({
      method: 'delete',
      url,
      params,
      data,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': type
      }
    }).then(response => checkStatus(response)).then(response => checkCode(response))
  },
  upload(url, dic) {
    return service({
      method: 'post',
      url,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'multipart/form-data; charset=UTF-8'
      },
      data: (function() {
        const formData = new FormData()
        const arr = Object.keys(dic)
        // ele 数组元素；self 数组本身；dic对象；arr是由dic的keys组成
        arr.forEach((ele, index, self) => {
          formData.append(ele, dic[ele])
        })
        return formData
      }())
    }).then(response => checkStatus(response)).then(response => checkCode(response))
  },
  download(url, data) {
    return service({
      method: 'post',
      url,
      data: qs.stringify(data),
      responseType: 'blob',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(response => checkStatus(response))
  },
  // 添加获取excel表的方法
  getExcel(url, params, timeout) {
    return service({
      method: 'get',
      url,
      params,
      timeout,
      responseType: 'blob',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(response => checkStatus(response))
  },
  getimg(url, params) {
    return service({
      method: 'get',
      url,
      params,
      responseType: 'blob',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(response => checkStatus(response))
  }
}