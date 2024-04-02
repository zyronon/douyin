<template>
  <div class="Loading" :class="[isFullScreen ? 'full' : 'inline', type]">
    <div class="circle blue"></div>
    <div class="circle red"></div>
  </div>
</template>
<script>
export default {
  name: 'Loading',
  props: {
    isFullScreen: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'normal'
    }
  }
}
</script>

<style scoped lang="less">
@import '../assets/less/index';

.Loading {
  &.inline {
    width: 100%;
    height: 40rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &.small {
    .circle {
      width: 8rem;
      height: 8rem;
    }
  }

  &.full {
    z-index: 999;
    position: absolute;
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
    animation: anim-blue 0.4s ease-in-out 0s infinite alternate;
  }

  .red {
    background: var(--primary-btn-color);
    animation: anim-red 0.4s ease-in-out 0s infinite alternate;
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
