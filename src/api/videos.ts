import { request } from '@/utils/request'

export function historyOther(params?: any, data?: any) {
  return request({ url: '/video/historyOther', method: 'get', params, data })
}

export function historyVideo(params?: any, data?: any) {
  return request({ url: '/video/history', method: 'get', params, data })
}

export function recommendedVideo(params?: any, data?: any) {
  return request({ url: '/video/recommended', method: 'get', params, data })
}

export function recommendedLongVideo(params?: any, data?: any) {
  return request({ url: '/video/long/recommended/', method: 'get', params, data })
}

export function myVideo(params?: any, data?: any) {
  return request({ url: '/video/my', method: 'get', params, data })
}

export function privateVideo(params?: any, data?: any) {
  return request({ url: '/video/private', method: 'get', params, data })
}

export function likeVideo(params?: any, data?: any) {
  return request({ url: '/video/like', method: 'get', params, data })
}

export function videoComments(params?: any, data?: any) {
  return request({ url: '/video/comments', method: 'get', params, data })
}
