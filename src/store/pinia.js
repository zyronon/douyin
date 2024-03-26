import {defineStore} from "pinia";
import {friends, userinfo} from "@/api/user.js";
import enums from "@/utils/enums";

export const useBaseStore = defineStore('base', {
  state: () => {
    return {
      routeData: null,
      users: [],
      userinfo: {
        school: {
          name: '中央戏剧学院',
          department: null,
          joinTime: null,
          education: null,
          displayType: enums.DISPLAY_TYPE.ALL,
        },
        "avatar_168x168": {
          "url_list": [],
        },
        "avatar_300x300": {
          "url_list": [],
        },
        "cover_url": [{
          "url_list": [],
        }],
        "white_cover_url": [{
          "url_list": [],
        }],
      }
    }
  },
  getters: {},
  actions: {
    async init() {
      let r = await userinfo()
      if (r.success) {
        this.userinfo = r.data
      }
      let r2 = await friends()
      if (r2.success) {
        this.users = r2.data
      }
    }
  },
})