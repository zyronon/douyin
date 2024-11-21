import { request } from '@/utils/request'

export function recommendedPost(params?: any) {
  return request({ url: '/post/recommended', method: 'get', params })
}
