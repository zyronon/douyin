import request from "../utils/request";

export default {
  me(params, data) {
    return request({url: '/me', method: 'get', params, data})
  },
  my(params, data) {
    // console.log('api - params',params)
    return request({url: '/me/my', method: 'get', params, data})
  },
  private(params, data) {
    return request({url: '/me/private1', method: 'get', params, data})
  },
  like(params, data) {
    return request({url: '/me/like', method: 'get', params, data})
  },
  collect(params, data) {
    return request({url: '/me/collect', method: 'get', params, data})
  },
  recommended(params, data) {
    return request({url: '/video/recommended', method: 'get', params, data})
  },
}