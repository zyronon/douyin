<template>
  <div id="RedPacketDetail">
    <BaseHeader mode="light">
      <template v-slot:right>
        <span @click="_no" class="f14" style="color: rgb(193, 135, 79)">红包记录</span>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="wrapper">
        <img :src="_checkImgUrl(store.userinfo.cover_url[0].url_list[0])" alt="" class="avatar" />
        <span class="belong">{{ store.userinfo.nickname }}的红包</span>
        <div class="password">大吉大利</div>
        <span class="money">0.01元</span>
        <!--        <span class="notice" @click="$router.push('/me/money')">已存入我的零钱，可直接使用></span>-->
        <span class="notice" @click="_no">已存入我的零钱，可直接使用></span>
      </div>
      <img src="../../assets/img/icon/message/chat/money-detail-bg.png" alt="" class="bg" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useBaseStore } from '@/store/pinia'
import { _checkImgUrl, _no } from '@/utils'

defineOptions({
  name: 'RedPacketDetail'
})

defineProps({
  modelValue: {
    type: Boolean,
    default() {
      return false
    }
  }
})
const store = useBaseStore()
</script>

<style scoped lang="less">
#RedPacketDetail {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  font-size: 14rem;
  background: white;

  .content {
    padding-top: 60rem;

    .wrapper {
      color: rgb(110, 87, 63);
      display: flex;
      flex-direction: column;
      align-items: center;

      .avatar {
        margin-top: 55rem;
        width: 55rem;
        height: 55rem;
        border-radius: 50%;
        margin-bottom: 20rem;
      }

      .money {
        color: rgb(193, 135, 79);
        font-size: 40rem;
        font-weight: bold;
        margin-top: 25rem;
        margin-bottom: 10rem;
      }

      .belong {
        font-weight: bold;
        font-size: 13rem;
        margin-bottom: 10rem;
      }

      .notice {
        font-size: 12rem;
      }

      .password {
        font-size: 12rem;
        opacity: 0.6;
      }
    }

    .bg {
      bottom: 0;
      position: absolute;
      width: 100vw;
    }
  }
}
</style>
