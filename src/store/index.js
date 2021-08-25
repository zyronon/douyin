import * as Vuex from "vuex";
import enums from '../utils/enums'

const store = Vuex.createStore({
  state: {
    bodyHeight: document.body.clientHeight,
    bodyWidth: document.body.clientWidth,
    maskDialog: false,
    maskDialogMode: 'dark',
    version: '17.1.0',
    userinfo: {
      id: 1,
      name: '',
      account: '',
      desc: '',
      sex: '男',
      birthday: '1992-03-09',
      location: "中国-四川-成都",
      school: {
        name: '西南交通大学',
        department: null,
        joinTime: null,
        education: null,
        displayType: enums.DISPLAY_TYPE.ALL,
      }
    },
    friends: [
      {
        avatar: require('../assets/img/icon/avatar/1.png'),
        name: '倒影着稚嫩的少年',
        lastLoginTime: '2021-08-25 12:12:12',
        select:false
      },
      {
        avatar: require('../assets/img/icon/avatar/2.png'),
        name: '冒安志',
        lastLoginTime: '2021-08-25 12:12:12',
        select:false
      },
      {
        avatar: require('../assets/img/icon/avatar/3.png'),
        name: '凌依晨',
        lastLoginTime: '2021-08-25 12:12:12',
        select:false
      },
      {
        avatar: require('../assets/img/icon/avatar/4.png'),
        name: '蔡傲安',
        lastLoginTime: '2021-08-25 12:12:12',
        select:false
      },
      {
        avatar: require('../assets/img/icon/avatar/5.png'),
        name: '甫韦茹',
        lastLoginTime: '2021-08-25 12:12:12',
        select:false
      },
      {
        avatar: require('../assets/img/icon/avatar/6.png'),
        name: '马佳婉清',
        lastLoginTime: '2021-08-25 12:12:12',
        select:false
      },
      {
        avatar: require('../assets/img/icon/avatar/7.png'),
        name: '富察昕昕',
        lastLoginTime: '2021-08-25 12:12:12',
        select:false
      },
      {
        avatar: require('../assets/img/icon/avatar/8.png'),
        name: '章昊苍',
        lastLoginTime: '2021-08-25 12:12:12',
        select:false
      },
      {
        avatar: require('../assets/img/icon/avatar/9.png'),
        name: '买易槐',
        lastLoginTime: '2021-08-25 12:12:12',
        select:false
      },
      {
        avatar: require('../assets/img/icon/avatar/10.png'),
        name: '阎韶丽',
        lastLoginTime: '2021-08-25 12:12:12',
        select:false
      },
      {
        avatar: require('../assets/img/icon/avatar/11.png'),
        name: '倒影着稚嫩的少年',
        lastLoginTime: '2021-08-25 12:12:12',
        select:false
      },
      {
        avatar: require('../assets/img/icon/avatar/12.png'),
        name: '思念一直在',
        lastLoginTime: '2021-08-25 12:12:12',
        select:false
      },
      {
        avatar: require('../assets/img/icon/avatar/13.png'),
        name: '幸福泡泡',
        lastLoginTime: '2021-08-25 12:12:12',
        select:false
      },
      {
        avatar: require('../assets/img/icon/avatar/14.png'),
        name: '原味青春',
        lastLoginTime: '2021-08-25 12:12:12',
        select:false
      },
      {
        avatar: require('../assets/img/icon/avatar/15.png'),
        name: '℉阳光下的小情绪',
        lastLoginTime: '2021-08-25 12:12:12',
        select:false
      },
      {
        avatar: require('../assets/img/icon/avatar/16.png'),
        name: '看，熟悉旳风景',
        lastLoginTime: '2021-08-25 12:12:12',
        select:false
      },
      {
        avatar: require('../assets/img/icon/avatar/17.png'),
        name: '心若向阳无谓伤悲',
        lastLoginTime: '2021-08-25 12:12:12',
        select:false
      },
      {
        avatar: require('../assets/img/icon/avatar/18.png'),
        name: '蓝天下的迷彩?',
        lastLoginTime: '2021-08-25 12:12:12',
        select:false
      },
      {
        avatar: require('../assets/img/icon/avatar/19.png'),
        name: '◇、_保持微笑ゞ',
        lastLoginTime: '2021-08-25 12:12:12',
        select:false
      },
      {
        avatar: require('../assets/img/icon/avatar/20.png'),
        name: '浅唱↘我们的歌',
        lastLoginTime: '2021-08-25 12:12:12',
        select:false
      },
      {
        avatar: require('../assets/img/icon/avatar/21.png'),
        name: 'dear°学会微笑',
        lastLoginTime: '2021-08-25 12:12:12',
        select:false
      },
      {
        avatar: require('../assets/img/icon/avatar/22.png'),
        name: '〤伱的微笑',
        lastLoginTime: '2021-08-25 12:12:12',
        select:false
      },
      {
        avatar: require('../assets/img/icon/avatar/23.png'),
        name: '一只喵的旅行。',
        lastLoginTime: '2021-08-25 12:12:12',
        select:false
      },
      {
        avatar: require('../assets/img/icon/avatar/24.png'),
        name: '为你锁住心',
        lastLoginTime: '2021-08-25 12:12:12',
        select:false
      },
      {
        avatar: require('../assets/img/icon/avatar/25.png'),
        name: '一起走过的日子°',
        lastLoginTime: '2021-08-25 12:12:12',
        select:false
      },
      {
        avatar: require('../assets/img/icon/avatar/26.png'),
        name: '‘心’之天空',
        lastLoginTime: '2021-08-25 12:12:12',
        select:false
      },
      {
        avatar: require('../assets/img/icon/avatar/27.png'),
        name: '好◇°我会Yi直在●',
        lastLoginTime: '2021-08-25 12:12:12',
        select:false
      },

    ]
  },
  mutations: {
    setUserinfo(store, val) {
      store.userinfo = val
    },
    setMaskDialog(store, val) {
      store.maskDialog = val.state
      if (val.mode) {
        store.maskDialogMode = val.mode
      }
    }
  }
})

export default store