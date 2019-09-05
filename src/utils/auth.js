import Cookies from 'js-cookie'

/**
 * 获得的token本地缓存到cookies里面
 * @type {string}
 */

const TokenKey = 'token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
