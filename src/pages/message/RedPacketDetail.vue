<template>
  <div id="RedPacketDetail">
    <BaseHeader mode="light">
      <template v-slot:right>
        <span @click="$no" class="f14" style=" color: rgb(193, 135, 79);">红包记录</span>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="wrapper">
        <img :src="$imgPreview(userinfo.avatar)" alt="" class="avatar">
        <span class="belong">{{ userinfo.nickname }}的红包</span>
        <div class="password">大吉大利</div>
        <span class="money">0.01元</span>
<!--        <span class="notice" @click="$nav('/me/money')">已存入我的零钱，可直接使用></span>-->
        <span class="notice" @click="$no">已存入我的零钱，可直接使用></span>
      </div>
      <img src="../../assets/img/icon/message/chat/money-detail-bg.png" alt="" class="bg">
    </div>
  </div>
</template>
<script>
import {mapState} from "vuex";

export default {
  name: "RedPacketDetail",
  components: {},
  props: {
    modelValue: false
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['userinfo'])
  },
  watch: {},
  created() {
  },
  methods: {}
}
</script>

<style scoped lang="less">
@import "@/assets/less/index";

#RedPacketDetail {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  font-size: 1.4rem;
  background: white;

  .content {
    padding-top: 6rem;

    .wrapper {
      color: rgb(110, 87, 63);
      display: flex;
      flex-direction: column;
      align-items: center;

      .avatar {
        margin-top: 5.5rem;
        width: 5.5rem;
        border-radius: 50%;
        margin-bottom: 2rem;
      }

      .money {
        color: rgb(193, 135, 79);
        font-size: 4rem;
        font-weight: bold;
        margin-top: 2.5rem;
        margin-bottom: 1rem;
      }

      .belong {
        font-weight: bold;
        font-size: 1.3rem;
        margin-bottom: 1rem;
      }

      .notice {
        font-size: 1.2rem;
      }

      .password {
        font-size: 1.2rem;
        opacity: .6;
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
