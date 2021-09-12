<template>
  <div class="Music">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">申报学校信息</span>
      </template>
      <template v-slot:right>
        <img src="../../assets/img/icon/share.svg" alt="">
      </template>
    </BaseHeader>
    <div class="content">
      <div class="bottom">
        <img class="logo" src="../../assets/img/poster/src1-bg.png" alt="">
        <div class="info">
          <div class="name">MT创作的原声</div>
          <div class="user">NT ></div>
          <div class="peoples">1人使用</div>
          <div class="collection">
            <img src="../../assets/img/icon/collect-white.svg" alt="">
            <span>收藏</span>
          </div>
        </div>
      </div>
      <div class="tabs">
        <div class="tab active" @click="toggleTab($event,0)">热门</div>
        <div class="tab" @click="toggleTab($event,1)">最新</div>
      </div>
      <div class="video-container" v-for="(item,index) of videos" v-bind:style="{'height':width/3*1.2+'px'}">
        <video src="../../assets/video/1.mp4" poster="../../assets/img/poster/src1-bg.png"></video>
        <div class="no" v-if="index===1||index===2">
          NO. <span>{{ index + 1 }}</span>
        </div>
        <span v-if="index===0" class="first">首发</span>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "Music",
  components: {},
  data() {
    return {
      videos: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    }
  },
  created() {
  },
  computed: {},
  methods: {
    toggleTab(e, index) {
      if (!e.target.classList.contains('active')) {
        e.target.classList.toggle('active')
      }

      if (index === 1) {
        let pre = e.target.previousElementSibling
        pre.classList.remove('active')
      } else {
        let pre = e.target.nextElementSibling
        pre.classList.remove('active')
      }

    },
    back() {
      window.history.back()
    }
  }
}
</script>

<style scoped lang="less">

@import "../../assets/scss/index";

.Music {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 1.4rem;

  img {
    width: 2rem;
    height: 2rem;
  }

  .content {
    padding-top: 6rem;

    .bottom {
      display: flex;
      height: 120px;

      .logo {
        width: 120px;
        height: 100%;
        border-radius: 4px;
      }

      .info {
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .name {
          font-size: 18px;
          color: #fff;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .user, .peoples {
          margin-bottom: 5px;
          color: #999999;
        }

        .collection {
          display: flex;
          justify-content: center;
          height: 25px;
          width: 80px;
          align-items: center;
          color: #ffffff;
          background: #999;
          border-radius: 2px;

          img {
            margin-right: 10px;
            width: 15px;
            height: 15px;
          }
        }
      }
    }

    .tabs {
      height: 40px;
      display: flex;
      align-items: center;
      color: #fff;

      .tab {
        height: 90%;
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px;

        &.active {
          border-bottom: 3px solid yellow;
        }
      }
    }

    .video-container {
      width: 33%;
      float: left;
      position: relative;
      overflow: hidden;
      border: .5px solid black;

      video {
        width: 100%;
      }

      .first {
        padding: 0 5px;
        border-radius: 4px;
        position: absolute;
        top: 10px;
        left: 10px;
        background: yellow;
      }

      .no {
        position: absolute;
        color: #bdbdbd;
        bottom: 10px;
        right: 10px;
        font-style: italic;

        span {
          color: #ffffff;
          font-size: 20px;
        }
      }

    }
  }
}

</style>
