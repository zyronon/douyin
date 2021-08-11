import request from "../utils/request";

export default {
  me(params, data) {
    return request({url: '/me', method: 'post', params, data})
  },
  my(params, data) {
    return request({url: '/my', method: 'post', params, data})
  },
  private(params, data) {
    return request({url: '/private', method: 'post', params, data})
  },
  like(params, data) {
    return request({url: '/like', method: 'post', params, data})
  },
  collect(params, data) {
    return request({url: '/collect', method: 'post', params, data})
  },
}