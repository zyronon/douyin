import Mock from 'mockjs'
import globalMethods from '../utils/global-methods'
import resource from "../assets/data/resource.js";

function getParams(options) {
  let params = globalMethods.$parseURL(options.url).params
  params.pageNo = ~~params.pageNo
  params.pageSize = ~~params.pageSize
  return params
}

function getPage(options) {
  let params = getParams(options)
  let offset = params.pageNo * params.pageSize
  let limit = params.pageNo * params.pageSize + params.pageSize
  return {limit, offset, pageNo: params.pageNo}
}

Mock.setup({
  timeout: '500-1000'
})
let allRecommendVideos = []

for (let i = 0; i < 10; i++) {
  allRecommendVideos = allRecommendVideos.concat(resource.videos)
}
Mock.mock(/recommended/, options => {
    let page = getPage(options)
    return Mock.mock({
      data: {
        total: allRecommendVideos.length,
        list: allRecommendVideos.slice(page.offset, page.limit),
      }, code: 200, msg: '',
    })
  }
)

// Mock.Random.extend({
//   imgs: function (date) {
//     return this.pick([
//       require('../assets/img/poster/1.jpg'),
//       require('../assets/img/poster/2.jpg'),
//       require('../assets/img/poster/3.jpg'),
//       require('../assets/img/poster/4.jpg'),
//       require('../assets/img/poster/5.jpg'),
//       require('../assets/img/poster/6.jpg'),
//       require('../assets/img/poster/7.jpg'),
//       require('../assets/img/poster/8.jpg'),
//       require('../assets/img/poster/9.jpg'),
//       require('../assets/img/poster/10.jpg'),
//       require('../assets/img/poster/11.jpg'),
//     ])
//   }
// })
// !(function me() {
//   let my = {total: Mock.Random.natural(1, 20)}
//   my[`list|${my.total > 10 ? 10 : my.total}`] = [{'like|10000-990000': 1000000, src: '@imgs'}]
//
//   let private1 = {total: Mock.Random.natural(1, 20)}
//   private1[`list|${private1.total > 10 ? 10 : private1.total}`] = [{'like|10000-990000': 1000000, src: '@imgs'}]
//
//   let like = {total: Mock.Random.natural(1, 20)}
//   like[`list|${like.total > 10 ? 10 : like.total}`] = [{'like|10000-990000': 1000000, src: '@imgs'}]
//
//   let collect = {total: Mock.Random.natural(1, 20)}
//   collect[`list|${collect.total > 10 ? 10 : collect.total}`] = [{'like|10000-990000': 1000000, src: '@imgs'}]
//
//   const data = Mock.mock({
//     'data': {
//       my,
//       private: private1,
//       like,
//       collect
//     },
//     code: 200,
//     msg: '',
//   })
//   Mock.mock('me', data)
// }())


Mock.mock(/my/, options => {
  let page = getPage(options)
  console.log('mock', page)
  return Mock.mock({
    data: {
      pageNo: page.pageNo,
      total: resource.my.length,
      list: resource.my.slice(page.offset, page.limit),
    }, code: 200, msg: '',
  })
})
Mock.mock(/like/, options => {
  let page = getPage(options)
  return Mock.mock({
    data: {
      pageNo: page.pageNo,
      total: resource.like.length,
      list: resource.like.slice(page.offset, page.limit),
    }, code: 200, msg: '',
  })
})
Mock.mock(/private1/, options => {
  let page = getPage(options)
  return Mock.mock({
    data: {
      pageNo: page.pageNo,
      total: resource.private1.length,
      list: resource.private1.slice(page.offset, page.limit),
    }, code: 200, msg: '',
  })
})
Mock.mock(/collect/, options => {
  return Mock.mock({
    data: {
      video: {
        total: resource.videos.length,
        list: resource.videos,
      },
      music: {
        total: resource.music.length,
        list: resource.music,
      }
    }, code: 200, msg: '',
  })
})
Mock.mock(/historyVideo/, options => {
  let page = getPage(options)
  return Mock.mock({
    data: {
      pageNo: page.pageNo,
      // total: resource.my.length,
      total: 50,
      list: resource.my.slice(page.offset, page.limit),
    }, code: 200, msg: '',
  })
})
Mock.mock(/historyOther/, options => {
  let page = getPage(options)
  return Mock.mock({
    data: {
      pageNo: page.pageNo,
      total: 0,
      list: [],
    }, code: 200, msg: '',
  })
})
Mock.mock(/user\/friends/, options => {
  return Mock.mock({
    data: resource.users, code: 200, msg: '',
  })
})