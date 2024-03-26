import Mock from 'mockjs'
import globalMethods from '../utils'
import resource from "../assets/data/resource.js";
import posts6 from "@/assets/data/posts6.json";
import {cloneDeep, uniqueId} from "lodash-es";
import {BASE_URL} from "@/config";
import {useBaseStore} from "@/store/pinia";
import axiosInstance from "@/utils/request";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axiosInstance);

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

function getPage2(params) {
  let offset = params.pageNo * params.pageSize
  let limit = params.pageNo * params.pageSize + params.pageSize
  return {limit, offset, pageNo: params.pageNo}
}

let allRecommendVideos = posts6.map(v => {
  v.type = 'recommend-video'
  return v
})

// console.log('allRecommendVideos', allRecommendVideos)
let t = [{
  type: 'imgs', src: `https://imgapi.cn/bing.php`, author: {
    unique_id: uniqueId('list_')
  }
}, {
  type: 'user', src: `https://imgapi.cn/bing.php`, author: {
    unique_id: uniqueId('list_')
  }
}, {
  type: 'img', src: `https://imgapi.cn/bing.php`, author: {
    unique_id: uniqueId('list_')
  }
},]
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


async function fetchData() {
  const baseStore = useBaseStore()
  fetch(BASE_URL + '/data/posts.json').then(r => {
    r.json().then(v => {
      let userList = cloneDeep(baseStore.users)
      v = v.map(w => {
        w.type = 'recommend-video'
        if (userList.length) {
          let item = userList.find(a => String(a.uid) === String(w.author_user_id))
          if (item) w.author = item
        }
        return w
      })
      allRecommendVideos = allRecommendVideos.concat(v)
    })
  })
}

export async function startMock() {
  mock.onGet(/recommended/).reply(async (config) => {
    let page = getPage2(config.params)
    return [200, {
      data: {
        total: allRecommendVideos.length,
        list: allRecommendVideos.slice(page.offset, page.limit), // list: allRecommendVideos.slice(0, 6),
      }, code: 200, msg: '',
    }]
  })

  mock.onGet(/video\/private/).reply(async (config) => {
    let page = getPage2(config.params)
    return [200, {
      data: {
        total: 10,
        list: allRecommendVideos.slice(100, 110).slice(page.offset, page.limit)
      }, code: 200, msg: '',
    }]
  })

  mock.onGet(/video\/like/).reply(async (config) => {
    let page = getPage2(config.params)
    return [200, {
      data: {
        total: 150,
        list: allRecommendVideos.slice(200, 350).slice(page.offset, page.limit)
      }, code: 200, msg: '',
    }]
  })

  mock.onGet(/user\/collect/).reply(async (config) => {
    return [200, {
      data: {
        video: {
          total: 50, list: allRecommendVideos.slice(350, 400),
        }, music: {
          total: resource.music.length, list: resource.music,
        },
      }, code: 200, msg: '',
    }]
  })

  mock.onGet(/video\/my/).reply(async (config) => {
    let page = getPage2(config.params)
    // let r = await fetch(BASE_URL + '/data/user-71158770.json')
    // let r = await fetch(BASE_URL + '/data/user-8357999.json')
    let r = await fetch(BASE_URL + '/data/user-12345xiaolaohu.json')
    let list = await r.json()
    const baseStore = useBaseStore()
    let userList = cloneDeep(baseStore.users)

    list = list.map(w => {
      if (userList.length) {
        let item = userList.find(a => String(a.uid) === String(w.author_user_id))
        if (item) w.author = item
      }
      return w
    })

    return [200, {
      data: {
        pageNo: page.pageNo,
        total: list.length,
        list: list.slice(page.offset, page.limit),
      }, code: 200, msg: '',
    }]
  });

  mock.onGet(/user\/userinfo/).reply(async (config) => {
    let r2 = await fetch(BASE_URL + '/data/users.json')
    let v = await r2.json()
    // let item = v.find(a => a.uid === '68310389333')
    // let item = v.find(a => a.uid === '59054327754')
    let item = v.find(a => a.uid === '2739632844317827')
    if (item) {
      return [200, {data: item, code: 200}]
    }
    return [200, {code: 500}];
  })

  mock.onGet(/user\/friends/).reply(async (config) => {
    let r2 = await fetch(BASE_URL + '/data/users.json')
    let v = await r2.json()
    return [200, {data: v, code: 200}]
  })

  mock.onGet(/historyVideo/).reply(async (config) => {
    let page = getPage2(config.params)
    return [200, {
      data: {
        total: 150,
        list: allRecommendVideos.slice(200, 350).slice(page.offset, page.limit)
      }, code: 200, msg: '',
    }]
  })

  mock.onGet(/historyOther/).reply(async (config) => {
    let page = getPage2(config.params)
    return [200, {
      data: {
        pageNo: page.pageNo,
        total: 0,
        list: []
      }, code: 200, msg: '',
    }]
  })

  setTimeout(fetchData, 0)
}