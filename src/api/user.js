import request from '../utils/request'

export function userinfo(params, data) {
  return request({ url: '/user/userinfo', method: 'get', params, data })
}

export function userVideoList(params, data) {
  return request({ url: '/user/video_list', method: 'get', params, data })
}

export function panel(params, data) {
  return request({ url: '/user/panel', method: 'get', params, data })
}

export function friends(params, data) {
  return request({ url: '/user/friends', method: 'get', params, data })
}

export function userCollect(params, data) {
  return request({ url: '/user/collect', method: 'get', params, data })
}

export function recommendedPost(params, data) {
  return request({ url: '/post/recommended', method: 'get', params, data })
}

export function recommendedShop(params, data) {
  return request({ url: '/shop/recommended', method: 'get', params, data })
}
