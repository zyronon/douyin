export default {
  baseUrl: 'https://dy.ttentau.top/imgs/',
  imgPath: '/imgs/',
  filePreview: 'http://192.168.0.103/static/uploads/'
}
const BASE_URL_MAP = {
  DEV: '',
  PROD: '',
  // GP_PAGES: '/dist',
  GP_PAGES: '/douyin',
  GITEE_PAGES: '/gitee-dy',
  UNI: 'https://dy.ttentau.top'
}

export const IS_SUB_DOMAIN = ['GITEE_PAGES', 'GP_PAGES'].includes(import.meta.env.VITE_ENV)
export const BASE_URL = BASE_URL_MAP[import.meta.env.VITE_ENV]
export const IMG_URL = BASE_URL + '/images/'
export const FILE_URL = BASE_URL + '/data/'
