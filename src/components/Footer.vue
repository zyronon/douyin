<template>
  <div class="footer f16 ">
    <div class="button" @click="refresh()">
      <span v-if="!isRefresh" :class="{active:currentTab===1}">首页</span>
      <img v-else src="../assets/img/icon/refresh.png" alt="" class="refresh">
    </div>
    <div class="button" @click="tab(2)"><span :class="{active:currentTab===2}">关注</span></div>
    <div class="button" @click="tab(3)">
      <div class="add-ctn">
        <div class="add-one"></div>
        <div class="add-two"></div>
        <img src="../assets/img/icon/add.svg" alt="" class="add">
      </div>
    </div>
    <div class="button" @click="tab(4)"><span :class="{active:currentTab===4}">消息</span></div>
    <div class="button" @click="tab(5)"><span :class="{active:currentTab===5}">我</span></div>
  </div>

</template>

<script>
export default {
  name: "Footer",
  props: ['initTab'],
  data() {
    return {
      isRefresh: false,
      currentTab: this.initTab
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
          break
        case 4:
          this.$router.push('/message')
          break
        case 5:
          this.$router.push('/me')
          break
      }
    },
    refresh() {
      if (location.hash === '#/') {
        this.isRefresh = !this.isRefresh
        setTimeout(() => {
          this.isRefresh = false
        }, 2000)
      } else {
        this.currentTab = 1
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped lang="scss">

.footer {
  font-size: 1.8rem;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  //border-top: 1px solid #7b7878;
  z-index: 2;
  /*top: 600px;*/
  background: #020202;
  color: white;
  display: flex;
  //justify-content: space-between;

  .button {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;

    .refresh {
      width: 25%;
      animation: rotate .8s linear infinite;
    }

    @keyframes rotate {
      0% {
        -webkit-transform: rotate(0deg);
      }

      45% {
        -webkit-transform: rotate(-180deg);
      }

      55% {
        -webkit-transform: rotate(-180deg);
      }

      100% {
        -webkit-transform: rotate(-360deg);
      }
    }

    .add-ctn {
      width: 70%;
      height: 55%;
      //background: white;
      position: relative;
      display: flex;
      justify-content: center;

      .add-one {
        position: absolute;
        width: 100%;
        height: 100%;
        background: linear-gradient(to right, #59dcdf, #ff5f75);
        border-radius: 5px;
      }

      .add-two {
        border-radius: 5px;
        position: relative;
        width: 90%;
        height: 100%;
        background: white;
      }

      img {
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        margin: auto;
        position: absolute;
        width: 50%;
        height: 50%;
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
