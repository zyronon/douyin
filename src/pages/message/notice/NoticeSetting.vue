<template>
  <div id="SystemNotice">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">通知设置</span>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="title">消息免打扰</div>
      <div class="sub-title">开启后，新通知将用黄点展示，不再展示未读数字</div>
      <template v-if="data.type === 'SYSTEM'">
        <div class="row">
          <div class="left">系统通知</div>
          <switches v-model="data.option" theme="bootstrap" color="success"></switches>
        </div>
      </template>

      <template v-if="data.type === 'TASK'">
        <div class="row">
          <div class="left">运营任务</div>
          <switches v-model="data.option1" theme="bootstrap" color="success"></switches>
        </div>
        <div class="row">
          <div class="left">星图(任务)</div>
          <switches v-model="data.option2" theme="bootstrap" color="success"></switches>
        </div>
        <div class="row">
          <div class="left">成长任务</div>
          <switches v-model="data.option3" theme="bootstrap" color="success"></switches>
        </div>
        <div class="row">
          <div class="left">DUO来评审团</div>
          <switches v-model="data.option4" theme="bootstrap" color="success"></switches>
        </div>
        <div class="row">
          <div class="left">任务中心</div>
          <switches v-model="data.option5" theme="bootstrap" color="success"></switches>
        </div>
        <div class="row">
          <div class="left">中视频伙伴任务</div>
          <switches v-model="data.option6" theme="bootstrap" color="success"></switches>
        </div>
      </template>
      <template v-if="data.type === 'LIVE'">
        <div class="row">
          <div class="left">直播</div>
          <switches v-model="data.option7" theme="bootstrap" color="success"></switches>
        </div>
      </template>
      <template v-if="data.type === 'MONEY'">
        <div class="row">
          <div class="left">钱包服务</div>
          <switches v-model="data.option8" theme="bootstrap" color="success"></switches>
        </div>
        <div class="row">
          <div class="left">收入服务</div>
          <switches v-model="data.option9" theme="bootstrap" color="success"></switches>
        </div>
        <div class="row">
          <div class="left">零钱服务</div>
          <switches v-model="data.option10" theme="bootstrap" color="success"></switches>
        </div>
        <div class="row">
          <div class="left">抖币服务</div>
          <switches v-model="data.option11" theme="bootstrap" color="success"></switches>
        </div>
        <div class="row">
          <div class="left">卡券服务</div>
          <switches v-model="data.option12" theme="bootstrap" color="success"></switches>
        </div>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import Switches from '../components/swtich/switches.vue'
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'

defineOptions({
  name: 'NoticeSetting'
})

defineProps({
  modelValue: {
    type: Boolean,
    default() {
      return false
    }
  }
})
const route = useRoute()
const data = reactive({
  option: true,
  option1: false,
  option2: false,
  option3: true,
  option4: false,
  option5: false,
  option6: false,
  option7: true,
  option8: true,
  option9: false,
  option10: false,
  option11: false,
  option12: false,
  type: 'TASK'
})

onMounted(() => {
  data.type = route.query.type
})
</script>

<style scoped lang="less">
#SystemNotice {
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
      padding: var(--page-padding);
    }

    .sub-title {
      padding: 0 var(--page-padding);
      margin-bottom: 10rem;
      color: var(--second-text-color);
      font-size: 12rem;
    }
  }
}
</style>
