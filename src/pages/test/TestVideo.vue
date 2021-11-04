<template>
  <div id="TestVideo">
    <video :src="url" ref="video" controls autoplay muted></video>
    <Loading v-if="loading"/>
  </div>
</template>
<script>
export default {
  name: "TestVideo",
  components: {},
  props: {
    modelValue: false
  },
  data() {
    return {
      loading: false,
      url: 'http://ttentau.top/13.mp4?v=' + Date.now()
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
    let video = this.$refs.video
    // video.addEventListener('progress', () => {
    //   console.log('加载中')
    // })
    // console.log(video)

    let eventTester = (e, t) => {
      video.addEventListener(e, () => {
        if (e === 'playing') this.loading = false
        if (e === 'progress') this.loading = true
        if (e === 'waiting') this.loading = true
        console.log((new Date()).getTime(), e, t)
      }, false);
    }


    eventTester("loadstart", '客户端开始请求数据'); //客户端开始请求数据
    eventTester("abort", '客户端主动终止下载（不是因为错误引起）'); //客户端主动终止下载（不是因为错误引起）
    eventTester("loadstart", '客户端开始请求数据'); //客户端开始请求数据
    // eventTester("progress", '客户端正在请求数据'); //客户端正在请求数据
    // eventTester("suspend", '延迟下载'); //延迟下载
    eventTester("abort", '客户端主动终止下载（不是因为错误引起），'); //客户端主动终止下载（不是因为错误引起），
    eventTester("error", '请求数据时遇到错误'); //请求数据时遇到错误
    eventTester("stalled", '网速失速'); //网速失速
    eventTester("play", 'play()和autoplay开始播放时触发'); //play()和autoplay开始播放时触发
    eventTester("pause", 'pause()触发'); //pause()触发
    eventTester("loadedmetadata", '成功获取资源长度'); //成功获取资源长度
    eventTester("loadeddata"); //
    eventTester("waiting", '等待数据，并非错误'); //等待数据，并非错误
    eventTester("playing", '开始回放'); //开始回放
    eventTester("canplay", '/可以播放，但中途可能因为加载而暂停'); //可以播放，但中途可能因为加载而暂停
    eventTester("canplaythrough", '可以播放，歌曲全部加载完毕'); //可以播放，歌曲全部加载完毕
    eventTester("seeking", '寻找中'); //寻找中
    eventTester("seeked", '寻找完毕'); //寻找完毕
    // eventTester("timeupdate",'播放时间改变'); //播放时间改变
    eventTester("ended", '播放结束'); //播放结束
    eventTester("ratechange", '播放速率改变'); //播放速率改变
    eventTester("durationchange", '资源长度改变'); //资源长度改变
    eventTester("volumechange", '音量改变'); //音量改变

  },
  methods: {}
}
</script>

<style scoped lang="less">
@import "@/assets/less/index";

#TestVideo {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 1.4rem;

  video {
    width: 100%;
    height: 100%;
  }
}
</style>
