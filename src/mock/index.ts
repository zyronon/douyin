import resource from '../assets/data/resource.js'
import posts6 from '@/assets/data/posts6.json'
import { _fetch, cloneDeep, random } from '@/utils'
import { BASE_URL, FILE_URL } from '@/config'
import { useBaseStore } from '@/store/pinia'
import { axiosInstance } from '@/utils/request'
import MockAdapter from 'axios-mock-adapter'

const mock = new MockAdapter(axiosInstance)

function getPage2(params: any): { limit: number; offset: number; pageNo: number } {
  const offset = params.pageNo * params.pageSize
  const limit = params.pageNo * params.pageSize + params.pageSize
  return { limit, offset, pageNo: params.pageNo }
}

let allRecommendPosts = []
let userVideos = []
let allRecommendVideos = posts6.map((v: any) => {
  v.type = 'recommend-video'
  return v
})

// console.log('allRecommendVideos', allRecommendVideos)
// eslint-disable-next-line
const t = [
  {
    type: 'imgs',
    src: `https://imgapi.cn/bing.php`,
    author: {
      unique_id: 1,
      avatar_168x168: {
        url_list: []
      },
      avatar_300x300: {
        url_list: []
      },
      cover_url: [
        {
          url_list: []
        }
      ],
      white_cover_url: [
        {
          url_list: []
        }
      ]
    }
  }
  // {
  //   type: 'user',
  //   src: `https://imgapi.cn/bing.php`,
  //   author: {
  //     unique_id: 2,
  //     avatar_168x168: {
  //       url_list: []
  //     },
  //     avatar_300x300: {
  //       url_list: []
  //     },
  //     cover_url: [
  //       {
  //         url_list: []
  //       }
  //     ],
  //     white_cover_url: [
  //       {
  //         url_list: []
  //       }
  //     ]
  //   }
  // },
  // {
  //   type: 'img',
  //   src: `https://imgapi.cn/bing.php`,
  //   author: {
  //     unique_id: 3,
  //     avatar_168x168: {
  //       url_list: []
  //     },
  //     avatar_300x300: {
  //       url_list: []
  //     },
  //     cover_url: [
  //       {
  //         url_list: []
  //       }
  //     ],
  //     white_cover_url: [
  //       {
  //         url_list: []
  //       }
  //     ]
  //   }
  // }
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

async function fetchData() {
  const baseStore = useBaseStore()
  _fetch(BASE_URL + '/data/videos.md').then((r) => {
    r.json().then(async (v) => {
      let userList = cloneDeep(baseStore.users)
      if (!userList.length) {
        await baseStore.init()
        userList = cloneDeep(baseStore.users)
      }
      v = v.map((w) => {
        w.type = 'recommend-video'
        const item: any = userList.find((a) => String(a.uid) === String(w.author_user_id))
        if (item) w.author = item
        return w
      })
      allRecommendVideos = allRecommendVideos.concat(v)
    })
  })
}

//TODO 有个bug，一开始只返回了6条数据，但第二次前端传过来的pageNo是2了，就是会从第10条数据开始返回，导致中间漏了4条
export async function startMock() {
  mock.onGet(/video\/recommended/).reply(async (config) => {
    const { start, pageSize } = config.params
    // console.log('allRecommendVideos', cloneDeep(allRecommendVideos.length), config.params)
    return [
      200,
      {
        data: {
          total: 844,
          list: allRecommendVideos.slice(start, start + pageSize) // list: allRecommendVideos.slice(0, 6),
        },
        code: 200,
        msg: ''
      }
    ]
  })
  mock.onGet(/video\/long\/recommended/).reply(async (config) => {
    const page = getPage2(config.params)
    return [
      200,
      {
        data: {
          total: 844,
          list: allRecommendVideos.slice(page.offset, page.limit)
        },
        code: 200,
        msg: ''
      }
    ]
  })

  mock.onGet(/video\/comments/).reply(async (config) => {
    const videoIds = [
      '7260749400622894336',
      '7128686458763889956',
      '7293100687989148943',
      '6923214072347512068',
      '7005490661592026405',
      '7161000281575148800',
      '7267478481213181238',
      '6686589698707590411',
      '7321200290739326262',
      '7194815099381484860',
      '6826943630775831812',
      '7110263965858549003',
      '7295697246132227343',
      '7270431418822446370',
      '6882368275695586568',
      '7000587983069957383'
    ]
    let id = config.params.id
    if (!videoIds.includes(String(id))) {
      id = videoIds[random(0, videoIds.length - 1)]
    }
    const r2 = await _fetch(`${FILE_URL}/comments/video_id_${id}.md`)
    const v = await r2.json()
    if (v) {
      return [200, { data: v, code: 200 }]
    }
    return [200, { code: 500 }]
  })

  mock.onGet(/video\/private/).reply(async (config) => {
    const page = getPage2(config.params)
    return [
      200,
      {
        data: {
          total: 10,
          list: allRecommendVideos.slice(100, 110).slice(page.offset, page.limit)
        },
        code: 200,
        msg: ''
      }
    ]
  })

  mock.onGet(/video\/like/).reply(async (config) => {
    const page = getPage2(config.params)
    return [
      200,
      {
        data: {
          total: 150,
          list: allRecommendVideos.slice(200, 350).slice(page.offset, page.limit)
        },
        code: 200,
        msg: ''
      }
    ]
  })

  mock.onGet(/video\/my/).reply(async (config) => {
    const page = getPage2(config.params)
    if (!userVideos.length) {
      // let r = await fetch(BASE_URL + '/data/user-71158770.json')
      // let r = await fetch(BASE_URL + '/data/user-8357999.json')
      const r = await _fetch(BASE_URL + '/data/user_video_list/user-12345xiaolaohu.md')
      const list = await r.json()
      const baseStore = useBaseStore()
      const userList = cloneDeep(baseStore.users)

      userVideos = list.map((w) => {
        if (userList.length) {
          const item = userList.find((a) => String(a.uid) === String(w.author_user_id))
          if (item) w.author = item
        }
        return w
      })
    }

    return [
      200,
      {
        data: {
          pageNo: page.pageNo,
          total: userVideos.length,
          list: userVideos.slice(page.offset, page.limit)
        },
        code: 200,
        msg: ''
      }
    ]
  })

  mock.onGet(/video\/history/).reply(async (config) => {
    const page = getPage2(config.params)
    return [
      200,
      {
        data: {
          total: 150,
          list: allRecommendVideos.slice(200, 350).slice(page.offset, page.limit)
        },
        code: 200,
        msg: ''
      }
    ]
  })

  mock.onGet(/user\/collect/).reply(async () => {
    return [
      200,
      {
        data: {
          video: {
            total: 50,
            list: allRecommendVideos.slice(350, 400)
          },
          music: {
            total: resource.music.length,
            list: resource.music
          }
        },
        code: 200,
        msg: ''
      }
    ]
  })

  mock.onGet(/user\/video_list/).reply(async (config) => {
    const id = config.params.id
    const r2 = await _fetch(`${FILE_URL}/user_video_list/user-${id}.md`)
    const v = await r2.json()
    if (v) {
      return [200, { data: v, code: 200 }]
    }
    return [200, { code: 500 }]
  })

  mock.onGet(/user\/panel/).reply(async () => {
    const r2 = await _fetch(BASE_URL + '/data/users.md')
    const v = await r2.json()
    // let item = v.find(a => a.uid === '68310389333')
    // let item = v.find(a => a.uid === '59054327754')
    const item = v.find((a) => a.uid === '2739632844317827')
    if (item) {
      return [200, { data: item, code: 200 }]
    }
    return [200, { code: 500 }]
  })

  mock.onGet(/user\/friends/).reply(async () => {
    const r2 = await _fetch(BASE_URL + '/data/users.md')
    const v = await r2.json()
    return [200, { data: v, code: 200 }]
  })

  mock.onGet(/historyOther/).reply(async (config) => {
    const page = getPage2(config.params)
    return [
      200,
      {
        data: {
          pageNo: page.pageNo,
          total: 0,
          list: []
        },
        code: 200,
        msg: ''
      }
    ]
  })

  mock.onGet(/post\/recommended/).reply(async (config) => {
    const page = getPage2(config.params)

    if (!allRecommendPosts.length) {
      const r = await _fetch(BASE_URL + '/data/posts.md')
      allRecommendPosts = await r.json()
    }
    return [
      200,
      {
        data: {
          pageNo: page.pageNo,
          total: allRecommendPosts.length,
          list: allRecommendPosts.slice(0, 1000).slice(page.offset, page.limit)
        },
        code: 200,
        msg: ''
      }
    ]
  })

  mock.onGet(/shop\/recommended/).reply(async (config) => {
    const page = getPage2(config.params)

    const r2 = await _fetch(BASE_URL + '/data/goods.md')
    const v = await r2.json()
    return [
      200,
      {
        data: {
          total: v.length,
          list: v.slice(page.offset, page.limit)
        },
        code: 200
      }
    ]
  })

  setTimeout(fetchData, 1000)
}
