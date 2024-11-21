import { request } from '@/utils/request'

export function getAllMsg(params?: any, data?: any) {
  return request({ url: '/message/all-msg', method: 'get', params, data })
}
