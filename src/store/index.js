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
    }
  },
  mutations: {
    setUserinfo(store, val) {
      store.userinfo = val
    },
    setMaskDialog(store, val) {
      store.maskDialog = val.state
      if (val.mode){
        store.maskDialogMode = val.mode
      }
    }
  }
})

export default store