import resource from "../assets/data/resource.js";
import posts6 from "@/assets/data/posts6.json";
import {_copy, cloneDeep} from '@/utils'
import {BASE_URL} from "@/config";
import {useBaseStore} from "@/store/pinia";
import axiosInstance from "@/utils/request";
import MockAdapter from "axios-mock-adapter";
import Mock from "mockjs";

const mock = new MockAdapter(axiosInstance, {delayResponse: 300});

function getPage2(params) {
  let offset = params.pageNo * params.pageSize
  let limit = params.pageNo * params.pageSize + params.pageSize
  return {limit, offset, pageNo: params.pageNo}
}

let allRecommendPosts = []
let userVideos = []
let allRecommendVideos = posts6.map(v => {
  v.type = 'recommend-video'
  return v
})

// console.log('allRecommendVideos', allRecommendVideos)
let t = [{
  type: 'imgs', src: `https://imgapi.cn/bing.php`, author: {
    unique_id: 1
  }
}, {
  type: 'user', src: `https://imgapi.cn/bing.php`, author: {
    unique_id: 2
  }
}, {
  type: 'img', src: `https://imgapi.cn/bing.php`, author: {
    unique_id: 3
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
  fetch(BASE_URL + '/data/videos.json').then(r => {
    r.json().then(async v => {
      let userList = cloneDeep(baseStore.users)
      if (!userList.length) {
        await baseStore.init()
        userList = cloneDeep(baseStore.users)
      }
      v = v.map(w => {
        w.type = 'recommend-video'
        let item = userList.find(a => String(a.uid) === String(w.author_user_id))
        if (item) w.author = item
        return w
      })

      allRecommendVideos = allRecommendVideos.concat(v)
    })
  })
}

export async function startMock() {
  mock.onGet(/video\/recommended/).reply(async (config) => {
    // console.log('allRecommendVideos', cloneDeep(allRecommendVideos))
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

  mock.onGet(/video\/my/).reply(async (config) => {
    let page = getPage2(config.params)
    if (!userVideos.length) {
      // let r = await fetch(BASE_URL + '/data/user-71158770.json')
      // let r = await fetch(BASE_URL + '/data/user-8357999.json')
      let r = await fetch(BASE_URL + '/data/user-12345xiaolaohu.json')
      let list = await r.json()
      const baseStore = useBaseStore()
      let userList = cloneDeep(baseStore.users)

      userVideos = list.map(w => {
        if (userList.length) {
          let item = userList.find(a => String(a.uid) === String(w.author_user_id))
          if (item) w.author = item
        }
        return w
      })
    }

    return [200, {
      data: {
        pageNo: page.pageNo,
        total: userVideos.length,
        list: userVideos.slice(page.offset, page.limit),
      }, code: 200, msg: '',
    }]
  });

  mock.onGet(/video\/history/).reply(async (config) => {
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

  mock.onGet(/post\/recommended/).reply(async (config) => {
    let page = getPage2(config.params)

    if (!allRecommendPosts.length) {
      let r = await fetch(BASE_URL + '/data/posts.json')
      allRecommendPosts = await r.json()
    }
    return [200, {
      data: {
        pageNo: page.pageNo,
        total: allRecommendPosts.length,
        list: allRecommendPosts.slice(0, 1000).slice(page.offset, page.limit),
      }, code: 200, msg: '',
    }]
  })

  mock.onGet(/video\/comments/).reply(async (config) => {
    return new Promise(function (resolve, reject) {
     setTimeout(()=>{
       requestIdleCallback(() => {
         let data = Mock.mock({
           'list|5-50': [{
             name: '@cname',
             text: '@cparagraph(3)',
             createTime: '@date("T")',
             collect_count: '@int(3,1000)'
           }]
         })

         data.list.map(v => [
           v.children = Mock.mock({
             'list|0-5': [{
               name: '@cname',
               text: '@cparagraph(3)',
               createTime: '@date("T")',
               collect_count: '@int(3,1000)'
             }]
           })
         ])

         resolve([200, {
           data: {
             total: data.list.length,
             list: data.list,
           }, code: 200, msg: '',
         }])
       })
     })
    });
  })

  setTimeout(fetchData, 1000)
}