import request from "../utils/request";

export default {
  friends(params, data) {
    return request({url: '/user/friends', method: 'get', params, data})
  },
  author(params, data) {
    return request({url: '/user/author', method: 'get', params, data})
  },
}

export function userinfo(params, data) {
  return request({url: '/user/userinfo', method: 'get', params, data})
}

export function friends(params, data) {
  return request({url: '/user/friends', method: 'get', params, data})
}

export function userCollect(params, data) {
  return request({url: '/user/collect', method: 'get', params, data})
}