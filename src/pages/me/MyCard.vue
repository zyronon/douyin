<template>
  <div id='MyCard'>
    <div class="header">
      <back mode="light" @click="$back"/>
      <!--      todo 差一-->
      <img class="share" src="../../assets/img/icon/share-white.png" @click="isSharing = true">
    </div>
    <div class="content">
      <div class="qrcode">
        <img class="qrcode-bg" src="../../assets/img/icon/me/code-bg.png" alt="">
        <img class="avatar" :src="$imgPreview(userinfo.avatar)" alt="">
      </div>

      <span class="name">ZZZZZZZZZZ</span>
      <span class="notice">抖音扫一扫，立即关注我</span>
    </div>
    <div class="footer">
      <!--      <div class="btn" @click="$nav('/scan')">-->
      <div class="btn" @click="$no">
        <div class="wrapper">
          <img src="../../assets/img/icon/scan.png" alt="">
        </div>
        <span>扫一扫</span>
      </div>
      <div class="btn" @click="$no">
        <div class="wrapper">
          <img src="../../assets/img/icon/download.png" alt="">
        </div>
        <span>保存</span>
      </div>
    </div>

    <Share v-model="isSharing"
           mode="qrcode"
           ref="share"
           page-id="MyCard"
    />

  </div>
</template>
<script>
import Share from "../../components/Share";
import ConfirmDialog from "../../components/dialog/ConfirmDialog";
import ShareToFriend from "../home/components/ShareToFriend";
import {mapState} from "vuex";

export default {
  name: "MyCard",
  components: {
    Share,
  },

  data() {
    return {
      isSharing: false,
      okText: '',

      showSharePassword: false,
      shareToFriend: false,
      shareType: -1,

      showDouyinCode: false,
    }
  },
  watch: {
    shareType(newVal, oldVal) {
      if (newVal === -1) return
      this.showSharePassword = true
      switch (newVal) {
        case 2:
        case 3:
          return this.okText = '去微信粘贴'
        case 4:
        case 5:
          return this.okText = '去QQ粘贴'
        case 8:
          return this.okText = '去微博粘贴'
      }
    }
  },
  created() {

  },
  computed: {
    ...mapState(['userinfo'])
  },
  methods: {
    delayShowDialog(cb) {
      setTimeout(() => {
        cb()
      }, 100)
    },
  }
}
</script>

<style scoped lang="less">
@import "../../assets/less/index";

#MyCard {
  background: rgb(136, 132, 133);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  font-size: 1.4rem;

  .header {
    position: fixed;
    z-index: 9;
    top: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 0 1.5rem;
    height: 6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .share {
      width: 2.4rem;
      height: 2.4rem;
      margin-left: 1.5rem;
    }
  }


  .content {
    padding-top: @header-height;
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
      margin-top: 2rem;
      font-size: 1.6rem;
      color: white;
    }

    .notice {
      color: white;
      font-size: 1.4rem;
      margin-top: 2rem;
      opacity: .4;
    }


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
      font-size: 1.2rem;

      .wrapper {
        background: rgba(252, 250, 250, 0.3);
        border-radius: 50%;
        display: flex;
        padding: 1.8rem;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;
      }

      img {
        width: 2.6rem;
      }
    }
  }
}

</style>
