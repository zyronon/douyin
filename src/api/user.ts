import { request } from '@/utils/request'

export function panel(params?: any) {
  return request({ url: '/user/panel', method: 'get', params })
}

export function historyOther(params?: any) {
  return request({ url: '/user/my-history-other', method: 'get', params })
}

export function friends(params?: any) {
  return request({ url: '/user/friends', method: 'get', params })
}

export function getFollow(params?: any) {
  return request({ url: '/user/follow', method: 'get', params })
}

export function getFans(params?: any) {
  return request({ url: '/user/fans', method: 'get', params })
}

export function userinfo(params?: any) {
  return request({ url: '/user/userinfo', method: 'get', params })
}

export function userAttention(params?: any, data?: any) {
  return request({ url: '/user/attention', method: 'post', params, data })
}

export function getAwemeStatus(params?: any, data?: any) {
  return request({ url: '/user/aweme-status', method: 'get', params, data })
}
