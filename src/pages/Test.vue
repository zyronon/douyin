<template>
  <div class="Test">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">申报学校信息</span>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="my-buttons">
        <div class="follow-display">
          <div class="follow-wrapper" :class="isFollowed ? 'follow-wrapper-followed' : ''">
            <div class="no-follow" @click="isFollowed = true">
              <img src="../assets/img/icon/add-white.png" alt="">
              <span>关注</span>
            </div>
            <div class="followed">
              <div class="l-button" @click="isFollowed = false">
                <span>已关注</span>
                <img src="../assets/img/icon/arrow-up-white.png" alt="">
              </div>
              <div class="l-button">
                <span>私信</span>
              </div>
            </div>
          </div>
        </div>
        <div class="option" @click="isFollowed = !isFollowed">
          <img src="../assets/img/icon/arrow-up-white.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "Test",
  props: {},
  data() {
    return {
      isFollowed: true
    }
  },
  computed: {},
  created() {
  },
  methods: {}
}
</script>

<style scoped lang="less">
@import "../assets/scss/index";

.Test {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  font-size: 1.4rem;

  .content {
    padding-top: 6rem;
    display: flex;
    align-items: center;
    justify-content: center;

    .my-buttons {
      margin-top: 2rem;
      overflow: hidden;
      width: 80%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      @width: 3.6rem;

      .follow-display {
        flex: 1;
        overflow: hidden;

        .follow-wrapper {
          width: 200%;
          display: flex;
          flex-wrap: nowrap;
          transition: all .3s ease;

          &.follow-wrapper-followed {
            transform: translate3d(-50%, 0, 0);
          }

          .no-follow {
            width: calc(100% - 0.5rem);
            color: white;
            border-radius: .2rem;
            background: @primary-btn-color;
            height: @width;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: .5rem;
            box-sizing: border-box;

            span {
              margin-left: .2rem;
            }
          }

          .followed {
            width: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;

            .l-button {
              color: white;
              border-radius: .2rem;
              background: @second-btn-color;
              height: @width;
              width: 50%;
              margin-right: .5rem;
              box-sizing: border-box;
              display: flex;
              align-items: center;
              justify-content: center;

              span {
                margin-left: .2rem;
              }

              img {
                transform: rotate(180deg);
              }
            }
          }
        }

      }


      .option {
        position: relative;
        width: @width;
        height: @width;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: .2rem;
        background: @second-btn-color;
        color: white;
      }

      img {
        @width: 1.6rem;
        width: @width;
        height: @width;
      }

    }

  }
}
</style>
