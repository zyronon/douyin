import { request } from '@/utils/request'

export function recommendedShop(params?: any) {
  return request({ url: '/shop/recommended', method: 'get', params })
}
