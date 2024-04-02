<template>
  <div id="Test">
    <base-button type="primary" @click="t = true">test</base-button>
    <!--    <ShareToFriend pageId="Test" v-model="t"/>-->
    <VideoShare v-model="t" page-id="Test" />
  </div>
</template>
<script>
import BaseButton from '../../components/BaseButton'
import VideoShare from '../home/components/VideoShare'

export default {
  name: 'Test4',
  components: {
    BaseButton,
    VideoShare
  },
  props: {
    text: {
      type: String,
      default: '@喵嗷污说电影创作的原声'
    }
  },
  data() {
    return {
      t: false
    }
  },
  methods: {},
  mounted() {}
}
</script>

<style scoped lang="less">
@import '../../assets/less/index';

#Test {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  font-size: 1.4rem;
  color: white;
}
</style>
