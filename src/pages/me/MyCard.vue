<template>
  <div id="MyCard">
    <div class="header">
      <dy-back mode="light" @click="router.back" />
      <!--      todo 差一-->
      <img
        class="share"
        src="../../assets/img/icon/share-white.png"
        @click="data.isSharing = true"
      />
    </div>
    <div class="content">
      <div class="qrcode">
        <img class="qrcode-bg" src="../../assets/img/icon/me/code-bg.png" alt="" />
        <img class="avatar" :src="_checkImgUrl(store.userinfo.cover_url[0].url_list[0])" alt="" />
      </div>

      <span class="name">ZZZZZZZZZZ</span>
      <span class="notice">抖音扫一扫，立即关注我</span>
    </div>
    <div class="footer">
      <!--      <div class="btn" @click="$router.push('/scan')">-->
      <div class="btn" @click="_no">
        <div class="wrapper">
          <img src="../../assets/img/icon/scan.png" alt="" />
        </div>
        <span>扫一扫</span>
      </div>
      <div class="btn" @click="_no">
        <div class="wrapper">
          <img src="../../assets/img/icon/download.png" alt="" />
        </div>
        <span>保存</span>
      </div>
    </div>

    <Share v-model:value="data.isSharing" mode="qrcode" ref="share" page-id="MyCard" />
  </div>
</template>

<script setup lang="ts">
import Share from '../../components/Share.vue'
import { useBaseStore } from '@/store/pinia'
import { _checkImgUrl, _no } from '@/utils'
import { reactive, watch } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'MyCard'
})

const router = useRouter()
const store = useBaseStore()
const data = reactive({
  isSharing: false,
  okText: '',
  showSharePassword: false,
  shareToFriend: false,
  shareType: -1,
  showDouyinCode: false
})

watch(
  () => data.shareType,
  (newVal) => {
    if (newVal === -1) return
    data.showSharePassword = true
    switch (newVal) {
      case 2:
      case 3:
        return (data.okText = '去微信粘贴')
      case 4:
      case 5:
        return (data.okText = '去QQ粘贴')
      case 8:
        return (data.okText = '去微博粘贴')
    }
  }
)
</script>

<style lang="less" scoped>
@import '../../assets/less/index';

#MyCard {
  background: rgb(136, 132, 133);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  font-size: 14rem;

  .header {
    position: fixed;
    z-index: 9;
    top: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 0 15rem;
    height: 60rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .share {
      width: 24rem;
      height: 24rem;
      margin-left: 15rem;
    }
  }

  .content {
    padding-top: var(--common-header-height);
    display: flex;
    flex-direction: column;
    align-items: center;

    .qrcode {
      margin-top: 12vh;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      .qrcode-bg {
        width: 60vw;
      }

      .avatar {
        border-radius: 50%;
        position: absolute;
        width: 25vw;
      }
    }

    .name {
      font-weight: bold;
      margin-top: 20rem;
      font-size: 16rem;
      color: white;
    }

    .notice {
      color: white;
      font-size: 14rem;
      margin-top: 20rem;
      opacity: 0.4;
    }
  }

  .footer {
    position: absolute;
    bottom: 30rem;
    display: flex;
    justify-content: space-around;
    width: 100%;

    .btn {
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 12rem;

      .wrapper {
        background: rgba(252, 250, 250, 0.3);
        border-radius: 50%;
        display: flex;
        padding: 18rem;
        align-items: center;
        justify-content: center;
        margin-bottom: 10rem;
      }

      img {
        width: 26rem;
      }
    }
  }
}
</style>
