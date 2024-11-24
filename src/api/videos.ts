import { request } from '@/utils/request'

export function myVideo(params?: any) {
  return request({ url: '/user/my-video', method: 'get', params })
}

export function privateVideo(params?: any) {
  return request({ url: '/user/my-private', method: 'get', params })
}

export function likeVideo(params?: any) {
  return request({ url: '/user/my-like-video', method: 'get', params })
}

export function collectVideo(params?: any) {
  return request({ url: '/user/my-collect-video', method: 'get', params })
}

export function recommendedVideo(params?: any) {
  return request({ url: '/video/recommended', method: 'get', params })
}

export function recommendedLongVideo(params?: any) {
  return request({ url: '/video/long-recommended', method: 'get', params })
}

export function historyVideo(params?: any) {
  return request({ url: '/user/my-history-video', method: 'get', params })
}

export function videoComments(params?: any) {
  return request({ url: '/video/comments', method: 'get', params })
}

export function videoComment(params?: any, data?: any) {
  return request({ url: '/video/comment', method: 'post', params, data })
}

export function userVideoList(params?: any) {
  return request({ url: '/user/video-list', method: 'get', params })
}

export function videoDigg(params?: any, data?: any) {
  return request({ url: '/video/digg', method: 'post', params, data })
}

export function videoCollect(params?: any, data?: any) {
  return request({ url: '/video/collect', method: 'post', params, data })
}

export function videoShare(params?: any, data?: any) {
  return request({ url: '/video/share', method: 'post', params, data })
}
