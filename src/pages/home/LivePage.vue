<template>
  <div class="LivePage">
    <div class="live-wrapper">
      <img src="../../assets/img/poster/6.jpg" alt="">
    </div>
    <div class="float">
      <div class="top">
        <div class="left">
          <div class="liver">
            <img class="avatar" src="../../assets/img/icon/avatar/10.png" alt="">
            <div class="desc">
              <div class="desc-wrapper">
                <div class="name">大司马大司马大司马</div>
                <div class="count">2万本场点赞</div>
              </div>
              <div class="follow-btn">关注</div>
            </div>
          </div>
          <div class="left-bottom">
            <div class="tag">#唱歌</div>
            <div class="rank">江苏第15名</div>
          </div>
        </div>
        <div class="right">
          <img src="../../assets/img/icon/avatar/1.png" alt="" class="follower">
          <img src="../../assets/img/icon/avatar/2.png" alt="" class="follower">
          <img src="../../assets/img/icon/avatar/3.png" alt="" class="follower">
          <div class="follower-count">107</div>
          <back img="close" mode="light"/>
        </div>
      </div>
      <div class="bottom">

      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "LivePage",
  components: {},
  props: {
    modelValue: false
  },
  data() {
    return {}
  },
  computed: {},
  created() {
  },
  methods: {}
}
</script>

<style scoped lang="less">
@import "../../assets/scss/index";

.LivePage {
  width: 100vw;
  height: 100vh;
  color: white;
  font-size: 1.4rem;
  position: relative;

  .live-wrapper {
    width: 100vw;
    height: 100vh;

    img {
      width: 100vw;
      height: 100vh;
    }
  }

  .float {
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vh;

    .top {
      margin-top: 1rem;

      .left {
        .liver {
          box-sizing: border-box;
          width: 45vw;
          background: yellowgreen;
          display: flex;
          padding: .2rem .2rem .2rem .1rem;
          align-items: center;
          border-radius: 2rem;

          .avatar {
            border-radius: 50%;
            width: 3rem;
            height: 3rem;
          }

          .desc {

            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;


            .desc-wrapper {
              width: 60%;

              .name {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }

              .count {
                font-size: 1rem;
              }
            }

            .follow-btn {
              height: 3.8rem;
              width: 4rem;
              background: @primary-btn-color;
              border-radius: 3rem;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1.2rem;
            }
          }
        }

      }

      .right {

      }
    }
  }
}
</style>
