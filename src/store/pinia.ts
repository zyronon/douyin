import { defineStore } from 'pinia'
import { friends, getAwemeStatus, panel } from '@/api/user'
import enums from '@/utils/enums'
import { ref } from 'vue'
import cookie from 'js-cookie'
import { getAllMsg } from '@/api/message'

export const useBaseStore = defineStore('base', {
  state: () => {
    return {
      bodyHeight: document.body.clientHeight,
      bodyWidth: document.body.clientWidth,
      maskDialog: false,
      maskDialogMode: 'dark',
      version: '17.1.0',
      excludeNames: [],
      judgeValue: 20,
      homeRefresh: 60,
      loading: false,
      routeData: null,
      users: [],
      login_id: '',
      token: ref(window.localStorage.getItem('token') || cookie.get('x-token') || ''), // Add token field
      userinfo: {
        uid: '',
        short_id: '',
        unique_id: '',
        gender: '',
        user_age: '',
        nickname: '',
        province: '',
        city: '',
        signature: '',
        ip_location: '',
        desc: '',
        school: {
          name: '',
          department: null,
          joinTime: null,
          education: null,
          displayType: enums.DISPLAY_TYPE.ALL
        },
        avatar_small: {
          url_list: []
        },
        avatar_large: {
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
      },
      friends: {
        all: [],
        recent: [],
        eachOther: []
      },
      follow: [],
      fans: [],
      AwemeStatus: {
        Attentions: [],
        Likes: [],
        Collects: []
      },
      message: ''
    }
  },
  getters: {
    selectFriends() {
      return this.friends.all.filter((v) => v.select)
    }
  },
  actions: {
    async init() {
      this.token = window.localStorage.getItem('token') || cookie.get('token') || '' // Initialize token in init
      const r1 = await panel()
      if (r1.success) {
        this.userinfo = Object.assign(this.userinfo, r1.data)
      }
      const r2 = await friends()
      // console.log('friends:', r2)
      if (r2.success) {
        this.friends.all = r2.data
      }
      const r3 = await getAwemeStatus()
      console.log('getAwemeStatus:', r3)
      if (r3.success) {
        this.AwemeStatus = r3.data
      }
    },
    setUserinfo(val) {
      this.userinfo = val
    },
    setToken(val) {
      this.token = val
      window.localStorage.setItem('token', val)
      cookie.set('token', val)
    },
    setMaskDialog(val) {
      this.maskDialog = val.state
      if (val.mode) {
        this.maskDialogMode = val.mode
      }
    },
    updateExcludeNames(val) {
      if (val.type === 'add') {
        if (!this.excludeNames.find((v) => v === val.value)) {
          this.excludeNames.push(val.value)
        }
      } else {
        const resIndex = this.excludeNames.findIndex((v) => v === val.value)
        if (resIndex !== -1) {
          this.excludeNames.splice(resIndex, 1)
        }
      }
      // console.log('store.excludeNames', store.excludeNames,val)
    }
  }
})

export const useChatStore = defineStore('chat', {
  state: () => ({
    chatObject: null,
    messages: [
      {
        msg_type: 1,
        msg_data: '',
        create_time: '2024-11-19 22:50'
      }
    ],
    previewImg: '',
    videoCall: [],
    newMessage: '',
    MESSAGE_TYPE: {},
    all_messages: {},
    typing: false,
    loading: false,
    opening: false,
    isOpened: false,
    recording: false,
    showOption: false,
    isShowOpenRedPacket: false,
    tooltipTop: -1,
    tooltipTopLocation: ''
  }),
  actions: {
    async init() {
      const r1 = await getAllMsg()
      if (r1.success) {
        this.all_messages = Object.assign(this.all_messages, r1.data)
      }
    },
    setChatObject(newChatObject) {
      this.chatObject = newChatObject
      this.messages = this.all_messages[String(newChatObject.uid)]
    }
  }
})
