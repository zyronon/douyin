import { request } from '@/utils/request'

export function sendMsg(params?: any, data?: any) {
  return request({ url: '/message/send-msg', method: 'post', params, data })
}

export function getAllMsg(params?: any, data?: any) {
  return request({ url: '/message/all-msg', method: 'get', params, data })
}
