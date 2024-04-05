<template>
  <div id="Visitors">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">主页访客</span>
      </template>
      <template v-slot:right>
        <span class="f14" @click="data.isShowSetting = !data.isShowSetting">设置</span>
      </template>
    </BaseHeader>
    <div class="content">
      <template v-if="data.realDisplay">
        <Peoples v-model:list="data.recommend" :loading="false" mode="visitor" />
        <NoMore />
      </template>
      <template v-else>
        <div class="open-display-desc">
          <div class="header">
            <div class="wrapper">
              <img src="../../assets/img/icon/message/display2.webp" alt="" class="icon1" />
              <img
                :src="_checkImgUrl(store.userinfo.cover_url[0].url_list[0])"
                alt=""
                class="icon2"
              />
              <img src="../../assets/img/icon/message/display1.webp" alt="" class="icon3" />
            </div>
          </div>
          <div class="title">查看新访客需要你的授权</div>
          <ul class="list">
            <li>访客记录中仅展示同样已授权的用户</li>
            <li>开户后，你访问他人方面也将留下记录</li>
            <li>你可以随时在访客设置中关闭授权</li>
          </ul>

          <div class="buttons">
            <base-button type="dark" @click="keepClose">保持关闭</base-button>
            <base-button type="primary" @click="data.display = data.realDisplay = true"
              >开启访客</base-button
            >
          </div>
        </div>
      </template>
    </div>

    <from-bottom-dialog
      page-id="Visitors"
      v-model="data.isShowSetting"
      mode="white"
      mask-mode="dark"
      height="270rem"
      :show-heng-gang="false"
    >
      <div class="setting-dialog">
        <div class="header">
          <div class="status">
            <img class="icon" src="../../assets/img/icon/message/peoples-black2.png" alt="" />
            <transition name="remove">
              <img
                v-if="!data.display"
                class="remove"
                src="../../assets/img/icon/message/remove.png"
                alt=""
              />
            </transition>
          </div>
          <img
            class="close"
            @click="data.isShowSetting = false"
            src="../../assets/img/icon/components/gray-close-full2.png"
            alt=""
          />
        </div>
        <div class="title">主页访客</div>
        <div class="sub-title">
          关闭后，你查看他人主页时不会留下记录；同时，你也无法查看谁访问了你的主页
        </div>
        <div class="l-line"></div>
        <div class="row">
          <div class="left">展示主页访客</div>
          <div class="right">
            <switches v-model="data.display" theme="bootstrap" color="success"></switches>
          </div>
        </div>
      </div>
    </from-bottom-dialog>
  </div>
</template>
<script setup lang="ts">
import Peoples from '../people/components/Peoples.vue'
import NoMore from '@/components/NoMore.vue'
import FromBottomDialog from '@/components/dialog/FromBottomDialog.vue'
import Switches from './components/swtich/switches.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useBaseStore } from '@/store/pinia'
import { _checkImgUrl, _notice, cloneDeep } from '@/utils'

import { onMounted, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'Visitors'
})

const store = useBaseStore()
const router = useRouter()
const data = reactive({
  recommend: [],
  isShowSetting: false,
  display: false,
  realDisplay: false
})

onMounted(() => {
  data.recommend = cloneDeep(store.friends.all)
})

watch(
  () => data.isShowSetting,
  (newVal) => {
    if (!newVal) {
      data.realDisplay = data.display
    }
  }
)

function keepClose() {
  _notice('你将不会再收到相关通知')
  router.back()
}
</script>

<style scoped lang="less">
.remove-enter-active,
.remove-leave-active {
  transition: transform 0.3s ease;
}

.remove-enter-from,
.remove-leave-to {
  transform: scale(0);
}

#Visitors {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 14rem;

  .content {
    padding: var(--page-padding);
    padding-top: var(--common-header-height);
  }

  .open-display-desc {
    text-align: center;

    .header {
      margin-top: 100rem;
      display: flex;
      align-items: center;
      justify-content: center;

      .wrapper {
        display: inline-block;
        position: relative;
      }

      .icon1 {
        left: -20rem;
        bottom: 20rem;
        position: absolute;
        width: 30rem;
      }

      .icon2 {
        z-index: 2;
        position: relative;
        padding: 2.5rem;
        background: black;
        border-radius: 50%;
        width: 80rem;
        height: 80rem;
      }

      .icon3 {
        bottom: 5rem;
        right: -30rem;
        z-index: 3;
        position: absolute;
        padding: 2rem;
        background: black;
        border-radius: 50%;
        width: 40rem;
      }
    }

    .title {
      margin-top: 30rem;
      font-size: 16rem;
      font-weight: bold;
    }

    .list {
      color: var(--second-text-color);
      text-align: left;
    }

    .buttons {
      position: fixed;
      padding: var(--page-padding);
      bottom: 0;
      left: 0;
      width: 100vw;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;

      .button {
        width: 49%;

        &:first-child {
          color: white;
        }
      }
    }
  }

  .setting-dialog {
    color: black;
    text-align: center;

    .header {
      padding: var(--page-padding);
      padding-top: 30rem;
      padding-bottom: 20rem;
      display: flex;
      align-items: center;
      justify-content: center;

      .status {
        position: relative;

        .icon {
          width: 64rem;
        }

        .remove {
          bottom: 0;
          right: 0;
          position: absolute;
          padding: 2rem;
          border-radius: 50%;
          background: white;
          width: 20rem;
        }
      }

      .close {
        top: var(--page-padding);
        right: var(--page-padding);
        position: absolute;
        width: 20rem;
      }
    }

    .title {
      font-size: 16rem;
    }

    .sub-title {
      padding: var(--page-padding);
      font-size: 12rem;
      color: var(--second-text-color);
    }

    .l-line {
      background: #f2f1f1;
      margin-left: var(--page-padding);
      width: calc(100vw - var(--page-padding) * 2);
      height: 1px;
    }

    .row {
      margin-bottom: 10rem;

      .left {
        color: black !important;
      }
    }
  }
}
</style>
