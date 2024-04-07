<template>
  <div class="Report">
    <BaseHeader backMode="light">
      <template v-slot:center>
        <span class="f16">
          <template v-if="data.mode === 'video'">视频</template>
          <template v-if="data.mode === 'music'">音乐</template>
          <template v-if="data.mode === 'chat'">私信</template>举报</span
        >
      </template>
    </BaseHeader>
    <div class="content">
      <div class="title">
        <span>内容违规</span>
      </div>
      <div class="row" @click="nav('/home/submit-report', { type: '色情低俗', mode: data.mode })">
        <span>色情低俗</span>
        <dy-back scale=".8" direction="right"></dy-back>
      </div>
      <div
        class="row"
        @click="nav('/home/submit-report', { type: '时政不实信息', mode: data.mode })"
      >
        <span>时政不实信息</span>
        <dy-back scale=".8" direction="right"></dy-back>
      </div>
      <div class="row" @click="nav('/home/submit-report', { type: '违法犯罪', mode: data.mode })">
        <span>违法犯罪</span>
        <dy-back scale=".8" direction="right"></dy-back>
      </div>
      <div
        class="row"
        @click="nav('/home/submit-report', { type: '垃圾广告、售卖假货等', mode: data.mode })"
      >
        <span>垃圾广告、售卖假货等</span>
        <dy-back scale=".8" direction="right"></dy-back>
      </div>
      <div class="row" @click="nav('/home/submit-report', { type: '造谣传播', mode: data.mode })">
        <span>造谣传播</span>
        <dy-back scale=".8" direction="right"></dy-back>
      </div>
      <div class="row" @click="nav('/home/submit-report', { type: '涉嫌欺诈', mode: data.mode })">
        <span>涉嫌欺诈</span>
        <dy-back scale=".8" direction="right"></dy-back>
      </div>
      <div class="row" @click="nav('/home/submit-report', { type: '侮辱漫骂', mode: data.mode })">
        <span>侮辱漫骂</span>
        <dy-back scale=".8" direction="right"></dy-back>
      </div>
      <div class="row" @click="nav('/home/submit-report', { type: '危险行为', mode: data.mode })">
        <span>危险行为</span>
        <dy-back scale=".8" direction="right"></dy-back>
      </div>
      <div
        class="row"
        @click="nav('/home/submit-report', { type: '涉嫌非法集资', mode: data.mode })"
      >
        <span>涉嫌非法集资</span>
        <dy-back scale=".8" direction="right"></dy-back>
      </div>
      <div
        class="row"
        @click="nav('/home/submit-report', { type: '价值观导向不良', mode: data.mode })"
      >
        <span>价值观导向不良</span>
        <dy-back scale=".8" direction="right"></dy-back>
      </div>
      <div class="line"></div>
      <!--todo 没做详细的举报      -->
      <div class="title">
        <span>侵犯名誉</span>
      </div>
      <div
        class="row"
        @click="
          nav('/home/submit-report', {
            type: '侵犯名誉、隐私、肖像权等',
            mode: data.mode
          })
        "
      >
        <span>侵犯名誉、隐私、肖像权等</span>
        <dy-back scale=".8" direction="right"></dy-back>
      </div>
      <div
        class="row"
        @click="nav('/home/submit-report', { type: '内容盗用本人作品', mode: data.mode })"
      >
        <span>内容盗用本人作品</span>
        <dy-back scale=".8" direction="right"></dy-back>
      </div>
      <div
        class="row"
        @click="nav('/home/submit-report', { type: '内容盗用他人作品', mode: data.mode })"
      >
        <span>内容盗用他人作品</span>
        <dy-back scale=".8" direction="right"></dy-back>
      </div>
      <div class="line"></div>
      <div class="title">
        <span>未成年</span>
      </div>
      <div
        class="row"
        @click="nav('/home/submit-report', { type: '未成年人不当行为', mode: data.mode })"
      >
        <span>未成年人不当行为</span>
        <dy-back scale=".8" direction="right"></dy-back>
      </div>
      <div
        class="row"
        @click="nav('/home/submit-report', { type: '内容不适合未成年观看', mode: data.mode })"
      >
        <span>内容不适合未成年观看</span>
        <dy-back scale=".8" direction="right"></dy-back>
      </div>
      <div class="line"></div>
      <div class="title">
        <span>其他</span>
      </div>
      <div class="row" @click="nav('/home/submit-report', { type: '引人不适', mode: data.mode })">
        <span>引人不适</span>
        <dy-back scale=".8" direction="right"></dy-back>
      </div>
      <div
        class="row"
        @click="nav('/home/submit-report', { type: '疑似自我伤害', mode: data.mode })"
      >
        <span>疑似自我伤害</span>
        <dy-back scale=".8" direction="right"></dy-back>
      </div>
      <div
        class="row"
        @click="nav('/home/submit-report', { type: '诱导点赞、分享、关注', mode: data.mode })"
      >
        <span>诱导点赞、分享、关注</span>
        <dy-back scale=".8" direction="right"></dy-back>
      </div>
      <div class="row" @click="nav('/home/submit-report', { type: '其他', mode: data.mode })">
        <span>其他</span>
        <dy-back scale=".8" direction="right"></dy-back>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useNav } from '@/utils/hooks/useNav'

defineOptions({
  name: 'Report'
})

const route = useRoute()
const nav = useNav()
const data = reactive({
  mode: 'video'
})

onMounted(() => {
  data.mode = route.query.mode as string
})
</script>

<style scoped lang="less">
@import '../../assets/less/index';

.Report {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 14rem;

  .content {
    padding-top: 60rem;

    .title {
      font-size: 12rem;
      padding: 10rem 15rem;
      color: var(--second-text-color);

      img {
        width: 10rem;
        height: 10rem;
        margin-right: 2rem;
      }
    }
  }

  .line {
    width: calc(100% - 30rem);
    margin-left: 15rem;
    background: var(--line-color);
  }
}
</style>
