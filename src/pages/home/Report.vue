<template>
  <div class="Report">
    <BaseHeader backMode="light">
      <template v-slot:center>
        <span class="f16">
          <template v-if="type === 'video'">视频</template>
          <template v-if="type === 'music'">音乐</template>举报</span>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="title">
        <span>内容违规</span>
      </div>
      <div class="row" @click="$nav('/home/submit-report',{type:'色情低俗'})">
        <span>色情低俗</span>
        <back scale=".8" direction="right"></back>
      </div>
      <div class="row" @click="$nav('/home/submit-report',{type:'时政不实信息'})">
        <span>时政不实信息</span>
        <back scale=".8" direction="right"></back>
      </div>
      <div class="row" @click="$nav('/home/submit-report',{type:'违法犯罪'})">
        <span>违法犯罪</span>
        <back scale=".8" direction="right"></back>
      </div>
      <div class="row" @click="$nav('/home/submit-report',{type:'垃圾广告、售卖假货等'})">
        <span>垃圾广告、售卖假货等</span>
        <back scale=".8" direction="right"></back>
      </div>
      <div class="row" @click="$nav('/home/submit-report',{type:'造谣传播'})">
        <span>造谣传播</span>
        <back scale=".8" direction="right"></back>
      </div>
      <div class="row" @click="$nav('/home/submit-report',{type:'涉嫌欺诈'})">
        <span>涉嫌欺诈</span>
        <back scale=".8" direction="right"></back>
      </div>
      <div class="row" @click="$nav('/home/submit-report',{type:'侮辱漫骂'})">
        <span>侮辱漫骂</span>
        <back scale=".8" direction="right"></back>
      </div>
      <div class="row" @click="$nav('/home/submit-report',{type:'危险行为'})">
        <span>危险行为</span>
        <back scale=".8" direction="right"></back>
      </div>
      <div class="row" @click="$nav('/home/submit-report',{type:'涉嫌非法集资'})">
        <span>涉嫌非法集资</span>
        <back scale=".8" direction="right"></back>
      </div>
      <div class="row" @click="$nav('/home/submit-report',{type:'价值观导向不良'})">
        <span>价值观导向不良</span>
        <back scale=".8" direction="right"></back>
      </div>
      <div class="line"></div>
      <!--todo 没做详细的举报      -->
      <div class="title">
        <span>侵犯名誉</span>
      </div>
      <div class="row" @click="$nav('/home/submit-report',{type:'侵犯名誉、隐私、肖像权等'})">
        <span>侵犯名誉、隐私、肖像权等</span>
        <back scale=".8" direction="right"></back>
      </div>
      <div class="row" @click="$nav('/home/submit-report',{type:'内容盗用本人作品'})">
        <span>内容盗用本人作品</span>
        <back scale=".8" direction="right"></back>
      </div>
      <div class="row" @click="$nav('/home/submit-report',{type:'内容盗用他人作品'})">
        <span>内容盗用他人作品</span>
        <back scale=".8" direction="right"></back>
      </div>
      <div class="line"></div>
      <div class="title">
        <span>未成年</span>
      </div>
      <div class="row" @click="$nav('/home/submit-report',{type:'未成年人不当行为'})">
        <span>未成年人不当行为</span>
        <back scale=".8" direction="right"></back>
      </div>
      <div class="row" @click="$nav('/home/submit-report',{type:'内容不适合未成年观看'})">
        <span>内容不适合未成年观看</span>
        <back scale=".8" direction="right"></back>
      </div>
      <div class="line"></div>
      <div class="title">
        <span>其他</span>
      </div>
      <div class="row" @click="$nav('/home/submit-report',{type:'引人不适'})">
        <span>引人不适</span>
        <back scale=".8" direction="right"></back>
      </div>
      <div class="row" @click="$nav('/home/submit-report',{type:'疑似自我伤害'})">
        <span>疑似自我伤害</span>
        <back scale=".8" direction="right"></back>
      </div>
      <div class="row" @click="$nav('/home/submit-report',{type:'诱导点赞、分享、关注'})">
        <span>诱导点赞、分享、关注</span>
        <back scale=".8" direction="right"></back>
      </div>
      <div class="row" @click="$nav('/home/submit-report',{type:'其他'})">
        <span>其他</span>
        <back scale=".8" direction="right"></back>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Report",
  props: {},
  data() {
    return {
      type: 'video'
    }
  },
  computed: {},
  created() {
  },
  activated() {
    this.type = this.$route.query.type
  },
  methods: {}
}
</script>

<style scoped lang="less">
@import "../../assets/scss/index";

.Report {
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

    .title {
      font-size: 1.2rem;
      padding: 1rem 1.5rem;
      color: @second-text-color;

      img {
        width: 1rem;
        height: 1rem;
        margin-right: .2rem;
      }
    }
  }

  .line {
    width: calc(100% - 3rem);
    margin-left: 1.5rem;
    background: @line-color;
  }
}
</style>
