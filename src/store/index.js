import * as Vuex from "vuex";
import enums from '../utils/enums'
import api from '../api/index'
import CONST_VAR from "../utils/const_var";
import resource from "../assets/data/resource";

const store = Vuex.createStore({
  state: {
    bodyHeight: document.body.clientHeight,
    bodyWidth: document.body.clientWidth,
    maskDialog: false,
    maskDialogMode: 'dark',
    version: '17.1.0',
    userinfo: {
      school: {
        name: '中央戏剧学院',
        department: null,
        joinTime: null,
        education: null,
        displayType: enums.DISPLAY_TYPE.ALL,
      },
      "id": "93864497380",
      "unique_id_modify_time": "1630393144",
      "unique_id": "10040050",
      "favoriting_count": 143,
      "avatar": new URL('../assets/img/icon/avatar/2.png', import.meta.url).href,
      "city": "成都",
      "province": '四川',
      "country": "中国",
      "birthday": "2002-01-01",
      "cover": "https://p3.douyinpic.com/obj/c8510002be9a3a61aad2?from=116350172",
      "following_count": 66,
      "follower_count": 235000,
      "aweme_count": 1796000,
      "nickname": "我是小睿耶",
      "phone": "",
      "sex": "",
      "last_login_time": "1630423555",
      "create_time": "1630423555",
      "status": 1,
      "desc": `一个普普通通学表演的\n看到的人都能开开心心~~~~~~~~~~~~~`,
      "is_private": 1
    },
    friends: resource.users,
    excludeRoutes: [],
    judgeValue: 20,
    homeRefresh: 60,
    loading: false,
  },
  mutations: {
    setLoading(store, val) {
      store.loading = val
    },
    setUserinfo(store, val) {
      store.userinfo = val
    },
    setFriends(store, val) {
      store.friends = val
    },
    setMaskDialog(store, val) {
      store.maskDialog = val.state
      if (val.mode) {
        store.maskDialogMode = val.mode
      }
    },
    updateExcludeRoutes(store, val) {
      if (val.type === 'add') {
        if (!store.excludeRoutes.find(v => v === val.value)) {
          store.excludeRoutes.push(val.value)
        }
      } else {
        let resIndex = store.excludeRoutes.findIndex(v => v === val.value)
        if (resIndex !== -1) {
          store.excludeRoutes.splice(resIndex, 1)
        }
      }
      console.log('store.excludeRoutes', store.excludeRoutes)
    },
  },
  actions: {
    async getFriends(context) {
      let res = await api.user.friends()
      if (res.code === CONST_VAR.SUCCESS) {
        context.commit('setFriends', res.data)
      }
    }
  }
})

export default store