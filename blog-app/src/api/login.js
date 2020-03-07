// import request from '@/request'
import request from '@/utils/request'

export var loginByUserName = loginData => request.post('/login', loginData)
// export function login(account, password) {
//   const data = {
//     account,
//     password
//   }
//   return request({
//     url: '/login',
//     method: 'post',
//     data
//   })
// }

export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}

export function getUserInfo() {
  return request({
    url: '/users/currentUser',
    method: 'get'
  })
}

export function register(account, nickname, password) {
  const data = {
    account,
    nickname,
    password
  }
  return request({
    url: '/register',
    method: 'post',
    data
  })
}
