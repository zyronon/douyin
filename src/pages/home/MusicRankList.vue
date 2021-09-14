<template>
  <div class="MusicRankList">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">抖音音乐榜</span>
      </template>
    </BaseHeader>
    <div class="l-header">

    </div>
    <div class="content">
      <Indicator
          name="musicRankList"
          tabStyleWidth="33%"
          :tabTexts="['热歌榜','飙升樘','原创榜']"
          v-model:active-index="contentIndex">
      </Indicator>
      <SlideRowList
          name="musicRankList"
          v-model:active-index="contentIndex">
        <SlideItem>
          <div class="list">
            <div class="item">

            </div>
          </div>
        </SlideItem>
        <SlideItem></SlideItem>
        <SlideItem></SlideItem>
      </SlideRowList>
    </div>
  </div>
</template>
<script>
export default {
  name: "MusicRankList",
  components: {},
  props: {
    modelValue: false
  },
  data() {
    return {
      contentIndex: 0,
      hotList: [
        {
          name: '阳光宅男',
          cover: '',
          author: '周杰伦',
          duration: 60,
          hot: 37441000,
          is_collect: false
        },
        {
          name: '阳光宅男',
          cover: '',
          author: '周杰伦',
          duration: 60,
          hot: 37441000,
          is_collect: false
        },
        {
          name: '阳光宅男',
          cover: '',
          author: '周杰伦',
          duration: 60,
          hot: 37441000,
          is_collect: false
        },
      ]
    }
  },
  computed: {},
  created() {
  },
  methods: {}
}
</script>

<style scoped lang="less">
@import "../../assets/scss/index";

.MusicRankList {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 1.4rem;

  .content {
    padding-top: 6rem;
  }
}
</style>
