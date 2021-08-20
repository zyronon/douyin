<template>
  <div id='MyCard'>
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">我的抖音码</span>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="card">
        <div class="logo-ctn">
          <img src="../../assets/img/icon/head-image.jpeg" alt="">
        </div>
        <span class="name">TTentau</span>
        <span class="notice">使用抖音扫码，加我好友</span>
        <img src="../../assets/img/icon/logo2.png" alt="" class="logo">
      </div>
    </div>
    <div class="notice-two">请使用最新版抖音扫描</div>
    <div class="footer">
      <div class="btn">
        <img src="../../assets/img/icon/download.png" alt="">
        <span>保存到相册</span>
      </div>
      <div class="btn" @click="$nav('/scan')">
        <img src="../../assets/img/icon/scan.png" alt="">
        <span>扫一扫</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MyCard",
  components: {},
  data() {
    return {
      transitionName: 'fade'
    }
  },
  created() {

  },
  computed: {},
  methods: {}
}
</script>

<style scoped lang="less">
@import "../../assets/scss/index";

#MyCard {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  font-size: 1.4rem;


  .content {
    padding-top: @header-height;

    .card {
      margin: 3rem;
      background: white;
      border-radius: 1rem;
      display: flex;
      align-items: center;
      flex-direction: column;

      .logo-ctn {
        margin: 2rem 0;
        width: 40vw;
        background-image: url("/@/assets/img/icon/logo-bg.png");
        background-position: center;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

      .notice {
        font-size: 1.2rem;
        margin-top: 6rem;
        opacity: .4;
      }

      .logo {
        margin: 2rem 0;
        width: 40vw;
      }
    }

  }

  .notice-two {
    font-size: 1.2rem;
    color: white;
    opacity: .4;
    text-align: center;
  }

  .footer {
    position: absolute;
    bottom: 3rem;
    display: flex;
    justify-content: space-around;
    width: 100%;

    .btn {
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        width: 3rem;
        margin-bottom: 1rem;
      }
    }
  }
}

</style>
