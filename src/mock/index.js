import Mock from 'mockjs'
import globalMethods from '../utils'
import resource from "../assets/data/resource.js";
import posts6 from "@/assets/data/posts6.json";
import {uniqueId} from "lodash-es";

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
  // timeout: '5000'
})
// console.log('posts20',posts20)
let allRecommendVideos = posts6.map(v => {
  v.type = 'recommend-video'
  return v
})

// console.log('allRecommendVideos', allRecommendVideos)
let t = [
  {
    type: 'imgs',
    src: `https://imgapi.cn/bing.php`,
    author: {
      unique_id: uniqueId('list_')
    }
  },
  {
    type: 'user',
    src: `https://imgapi.cn/bing.php`,
    author: {
      unique_id: uniqueId('list_')
    }
  },
  {
    type: 'img',
    src: `https://imgapi.cn/bing.php`,
    author: {
      unique_id: uniqueId('list_')
    }
  },
]
// allRecommendVideos.unshift(...t)
// {
//   type: 'user-imgs',
//   src: `http://douyin.ttentau.top/0.mp4?vframe/jpg/offset/0/w/${document.body.clientWidth}`,
//   author: {
//     unique_id: uniqueId('list_')
//   }
// },
// {
//   type: 'user',
//   src: `http://douyin.ttentau.top/0.mp4?vframe/jpg/offset/0/w/${document.body.clientWidth}`,
//   author: {
//     unique_id: uniqueId('list_')
//   }
// },

function initData() {
  fetch('/data/posts.json').then(r => {
    r.json().then(v => {
      allRecommendVideos = allRecommendVideos.concat(v)
      allRecommendVideos = allRecommendVideos.map(w => {
        w.type = 'recommend-video'
        return w
      })
      resource.like = allRecommendVideos.slice(0, 15)
      resource.videos = allRecommendVideos.slice(0, 15)
    })
  })

  fetch('/data/user-71158770.json').then(r => {
    r.json().then(v => {
      resource.my = v
    })
  })
}

setTimeout(initData, 3000)

Mock.mock(/recommended/, options => {
  // console.log('recommended', allRecommendVideos.length)
  let page = getPage(options)
  return Mock.mock({
    data: {
      total: allRecommendVideos.length,
      list: allRecommendVideos.slice(page.offset, page.limit),
      // list: allRecommendVideos.slice(0, 6),
    }, code: 200, msg: '',
  })
})

Mock.mock(/my/, options => {
  let page = getPage(options)
  // console.log('mock', page)
  return Mock.mock({
    data: {
      pageNo: page.pageNo, total: resource.my.length, list: resource.my.slice(page.offset, page.limit),
    }, code: 200, msg: '',
  })
})

Mock.mock(/like/, options => {
  let page = getPage(options)
  return Mock.mock({
    data: {
      pageNo: page.pageNo, total: resource.like.length, list: resource.like.slice(page.offset, page.limit),
    }, code: 200, msg: '',
  })
})

Mock.mock(/private1/, options => {
  let page = getPage(options)
  return Mock.mock({
    data: {
      pageNo: page.pageNo, total: resource.private1.length, list: resource.private1.slice(page.offset, page.limit),
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
      pageNo: page.pageNo, // total: resource.my.length,
      total: 50, list: resource.my.slice(page.offset, page.limit),
    }, code: 200, msg: '',
  })
})

Mock.mock(/historyOther/, options => {
  let page = getPage(options)
  return Mock.mock({
    data: {
      pageNo: page.pageNo, total: 0, list: [],
    }, code: 200, msg: '',
  })
})

Mock.mock(/user\/friends/, options => {
  return Mock.mock({
    data: resource.users, code: 200, msg: '',
  })
})