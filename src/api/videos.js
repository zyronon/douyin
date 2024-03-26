import request from "../utils/request";

export default {
  recommended(params, data) {
    return request({url: '/video/recommended', method: 'get', params, data})
  },
  historyVideo(params, data) {
    return request({url: '/video/historyVideo', method: 'get', params, data})
  },
  historyOther(params, data) {
    return request({url: '/video/historyOther', method: 'get', params, data})
  },
}

export function myVideo(params, data) {
  return request({url: '/video/my', method: 'get', params, data})
}

export function privateVideo(params, data) {
  return request({url: '/video/private', method: 'get', params, data})
}

export function likeVideo(params, data) {
  return request({url: '/video/like', method: 'get', params, data})
}