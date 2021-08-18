<template>
  <div class="footer f16 " @touchmove.stop="false">
    <div class="l-button" @click="refresh(1)">
      <span v-if="!isRefresh1" :class="{active:currentTab===1}">首页</span>
      <img v-if="isRefresh1 " src="../assets/img/icon/refresh1.png" alt="" class="refresh">
    </div>
    <div class="l-button" @click="refresh(2)">
      <span v-if="!isRefresh2" :class="{active:currentTab === 2}">关注</span>
      <img v-if="isRefresh2" src="../assets/img/icon/refresh1.png" alt="" class="refresh">
    </div>
    <div class="l-button" @click="tab(3)">
      <div class="add-ctn">
        <div class="add-one">
          <img src="../assets/img/icon/add-light.png" alt="" class="add">
        </div>
      </div>
    </div>
    <div class="l-button" @click="tab(4)"><span :class="{active:currentTab===4}">消息</span></div>
    <div class="l-button" @click="tab(5)"><span :class="{active:currentTab===5}">我</span></div>
  </div>

</template>

<script>
export default {
  name: "Footer",
  props: ['initTab'],
  data() {
    return {
      isRefresh1: false,
      isRefresh2: false,
      currentTab: this.initTab,
    }
  },
  methods: {
    tab(index) {
      this.currentTab = index
      switch (index) {
        case 1:
          this.$router.push('/')
          break
        case 2:
          this.$router.push('/attention')
          break
        case 3:
          this.$nav('/publish')
          break
        case 4:
          this.$router.push('/message')
          break
        case 5:
          this.$router.push('/me')
          break
      }
    },
    refresh(index) {
      if (this.currentTab === index) {
        this['isRefresh' + index] = !this['isRefresh' + index]
        setTimeout(() => {
          this['isRefresh' + index] = !this['isRefresh' + index]
        }, 2000)
      } else {
        this.tab(index)
      }
    }
  }
}
</script>

<style scoped lang="scss">

.footer {
  font-size: 1.5rem;
  position: fixed;
  width: 100%;
  height: 5rem;
  //border-top: 1px solid #7b7878;
  z-index: 2;
  //不用bottom：0是因为，在进行页面切换的时候，vue的transition
  // 会使footer的bottom：0失效，不能准备定位
  top: calc(100vh - 5rem);
  background: #020202;
  color: white;
  display: flex;
  //justify-content: space-between;

  .l-button {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;

    .refresh {
      width: 25%;
      animation: rotate .5s linear infinite;
    }

    @keyframes rotate {
      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(-360deg);
      }
    }

    .add-ctn {
      $height: 2.7rem;
      $width: 4rem;
      height: $height;
      width: $width;
      background: linear-gradient(to right, #59dcdf, #ff5f75);
      border-radius: .5rem;
      box-sizing: border-box;
      padding: 0 .2rem;

      .add-one {
        box-sizing: border-box;
        height: 100%;
        border-radius: .5rem;
        border: 2px solid white;
        background: black;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      img {
        width: 2rem;
      }
    }

    span {
      opacity: .7;

      &.active {
        opacity: 1;
      }
    }
  }
}

</style>
