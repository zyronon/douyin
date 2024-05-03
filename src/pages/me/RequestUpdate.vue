<template>
  <div class="RequestUpdate" id="RequestUpdate">
    <BaseHeader :is-fixed="false">
      <template v-slot:center>
        <span class="f16">求更新</span>
      </template>
      <template v-slot:right>
        <div>
          <img
            src="../../assets/img/icon/menu-gray.png"
            style="width: 20rem"
            @click="data.isShowOption = true"
          />
        </div>
      </template>
    </BaseHeader>
    <Loading v-if="data.loading" />
    <div v-else class="content">
      <div class="none" v-if="false">
        <img src="../../assets/img/icon/none-bg1.webp" alt="" />
        <div class="title">暂时还没有粉丝点击“求更新”</div>
        <div class="subtitle">当粉丝期待你的新作品时，会点击“求更新”提醒你</div>
      </div>
      <div class="request">
        <!--        <div class="title">近7天收到1次求更新</div>-->
        <!--        <div class="subtitle f12">上次发布作品：2020-08-01 上次开播：昨天23:12</div>-->
        <div class="subtitle f12">历史求更新（粉丝送礼后7天未开播则退还礼物）</div>
        <div class="list">
          <div class="item" :key="i" v-for="(item, i) in store.friends.all">
            <div class="left">
              <img :src="_checkImgUrl(item.avatar)" />
              <span class="name">{{ item.name }}</span>
            </div>
            <span class="time">{{ _dateFormat(item.lastLoginTime, 'D') }}</span>
          </div>
        </div>
        <no-more>最多展示100位粉丝的历史求更新记录</no-more>
      </div>
    </div>
    <div class="buttons">
      <dy-button type="white" :border="false" :active="false" @click="nav('/publish')"
        >发布作品
      </dy-button>
      <dy-button type="primary" :active="false" @click="_no">去直播</dy-button>
    </div>

    <from-bottom-dialog
      page-id="RequestUpdate"
      height="160rem"
      :show-heng-gang="false"
      mode="white"
      v-model="data.isShowOption"
    >
      <div class="l-row" @click="toggleRequestUpdate">
        {{ data.openRequestUpdate ? '关闭' : '开启' }}求更新提醒
      </div>
      <div class="l-row" @click="nav('/me/my-request-update')">我的求更新提醒</div>
      <div class="space"></div>
      <div class="l-row" @click="data.isShowOption = false">取消</div>
    </from-bottom-dialog>
  </div>
</template>
<script setup lang="ts">
import FromBottomDialog from '../../components/dialog/FromBottomDialog.vue'
import { useBaseStore } from '@/store/pinia'
import { onMounted, reactive } from 'vue'
import { useNav } from '@/utils/hooks/useNav'
import { _checkImgUrl, _dateFormat, _notice, _sleep } from '@/utils'

defineOptions({
  name: 'RequestUpdate'
})

const nav = useNav()
const store = useBaseStore()
const data = reactive({
  isShowOption: false,
  loading: false,
  openRequestUpdate: true
})

onMounted(() => {
  getData()
})

async function getData() {
  data.loading = true
  await _sleep(700)
  data.loading = false
}

function toggleRequestUpdate() {
  data.openRequestUpdate = !data.openRequestUpdate
  data.isShowOption = false
  if (data.openRequestUpdate) {
    _notice('提醒已开启，再次点击可关闭')
  } else {
    _notice('提醒已关闭，再次点击可开启')
  }
}
</script>

<style scoped lang="less">
@import '../../assets/less/index';

.RequestUpdate {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 14rem;
  display: flex;
  flex-direction: column;

  .content {
    flex: 1;
    overflow: auto;
    padding: 15rem 15rem 60rem 15rem;

    .none {
      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        margin-top: 100rem;
        height: 120rem;
      }
    }

    .request {
      .list {
        margin-top: var(--page-padding);

        .item {
          padding: 10rem 0;

          display: flex;
          justify-content: space-between;
          align-items: center;

          .left {
            display: flex;
            align-items: center;
            @width: 42rem;

            img {
              width: @width;
              height: @width;
              border-radius: 50%;
              margin-right: 10rem;
            }
          }

          .time {
            font-size: 12rem;
            color: var(--second-text-color);
          }
        }
      }
    }

    .title {
      margin-top: 10rem;
      font-size: 16rem;
    }

    .subtitle {
      margin-top: 10rem;
      font-size: 14rem;
      color: var(--second-text-color);
    }
  }

  .l-row {
    padding: 15rem;
    color: black;
    text-align: center;

    &:nth-child(2) {
      border-bottom: 1px solid gainsboro;
    }
  }

  .space {
    height: 10rem;
    background: whitesmoke;
  }

  .buttons {
    position: fixed;
    padding: 0 15rem 15rem 15rem;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    background: var(--main-bg);

    .button {
      flex: 1;

      &:nth-child(1) {
        margin-right: 5rem;
      }

      &:nth-child(2) {
        margin-left: 5rem;
      }
    }
  }
}
</style>
