import request from "../utils/request";

export default {
  friends(params, data) {
    return request({url: '/user/friends', method: 'get', params, data})
  },
}