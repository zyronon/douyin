import * as Vuex from "vuex";

const store = Vuex.createStore({
  state: {
    pageAnim: 'none',
    playDuration: 60,
    currentVideoId: null,
    bodyHeight: document.body.clientHeight,
    bodyWidth: document.body.clientWidth
  },
  mutations: {
    setPageAnim(state, states) {
      state.pageAnim = states
    },
    setPlayDuration(state, v) {
      state.playDuration = v
    },
    setCurrentVideoId(state, v) {
      state.currentVideoId = v
    },
  }
})

export default store