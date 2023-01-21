<template>
  <div class="Loading" :class="isFullScreen?'full':'normal'">
    <div class="circle blue"></div>
    <div class="circle red"></div>
  </div>
</template>
<script>
export default {
  name: "Loading",
  props: {
    isFullScreen: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped lang="less">
@import "../assets/less/index";

.Loading {

  &.normal {
    width: 100%;
    height: 40rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }


  &.full {
    z-index: 999;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: space-between;
    width: 22rem;
  }

  .circle {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
  }

  .blue {
    background: cadetblue;
    animation: anim-blue .4s ease-in-out 0s infinite alternate;
  }

  .red {
    background: @primary-btn-color;
    animation: anim-red .4s ease-in-out 0s infinite alternate;
  }

  @keyframes anim-blue {
    from {
      transform: translate3d(0, 0, 0) scale(1);
    }
    to {
      transform: translate3d(10rem, 0, 0) scale(1.2);
    }

  }
  @keyframes anim-red {
    from {
      transform: translate3d(0, 0, 0) scale(1);
    }
    to {
      transform: translate3d(-10rem, 0, 0) scale(1.2);
    }
  }
}

</style>
