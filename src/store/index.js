import * as Vuex from "vuex";
import enums from '../utils/enums'

const store = Vuex.createStore({
  state: {
    bodyHeight: document.body.clientHeight,
    bodyWidth: document.body.clientWidth,
    maskDialog: false,
    maskDialogMode: 'dark',
    userinfo: {
      id: 1,
      name: '',
      account: '',
      desc: '123',
      sex: '',
      birthday: '',
      location: '',
      school: {
        name: 'asdasd',
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