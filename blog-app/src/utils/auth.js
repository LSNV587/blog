import Cookies from 'js-cookie'

const AccessToken = 'Access-Token'
const RefreshToken = 'Refresh-Token'
const UserName = 'UserName'

export function getToken() {
  return Cookies.get(AccessToken)
}

export function setToken(token) {
  return Cookies.set(AccessToken, token)
}

export function removeToken() {
  return Cookies.remove(AccessToken)
}

export function getRefreshToken() {
  return Cookies.get(RefreshToken)
}

export function setRefreshToken(token) {
  return Cookies.set(RefreshToken, token)
}

export function removeRefreshToken() {
  return Cookies.remove(RefreshToken)
}

// 用户名的cookie操作
export function getUserName() {
  return Cookies.get(UserName)
}

export function setUserName(name) {
  Cookies.set(UserName, name)
  return Cookies.set(UserName, name)
}

export function removeUserName() {
  return Cookies.remove(UserName)
}


