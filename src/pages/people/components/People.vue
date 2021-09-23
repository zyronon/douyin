<template>
  <div class="People">
    <img v-if="people.type === 6" src="../../../assets/img/icon/add-light.png" alt="" class="add">
    <img v-else src="../../../assets/img/icon/msg-icon1.png" alt="" class="head-image pull-left">
    <div class="content">
      <div class="left">
        <div class="name">{{ people.name }}</div>
        <div class="detail" v-if="people.type !== 6">
          该用户关注了你
        </div>
      </div>

      <!--   已关注   -->
      <div class="right" v-if="people.type === 1">
        <div class="l-button">已关注</div>
      </div>
      <!--     粉丝 -->
      <div class="right" v-if="people.type === 2">
        <div class="l-button red">回关</div>
        <img src="../../../assets/img/icon/menu-white.png" alt="">
      </div>
      <!--     朋友推荐 -->
      <div class="right" v-if="people.type === 3">
        <div class="l-button red">回关</div>
        <div class="l-button ">移除</div>
      </div>
      <!--     互相关注 -->
      <div class="right" v-if="people.type === 4">
        <div class="l-button">发私信</div>
        <img src="../../../assets/img/icon/menu-white.png" alt="" @click="showPopover = !showPopover">
      </div>
      <!--     通讯录 -->
      <div class="right" v-if="people.type === 5">
        <div class="l-button red address-list">回关</div>
      </div>
    </div>
    <transition name="scale">
      <div class="popover" v-if="people.type === 4 && showPopover">
        <div class="arrow"></div>
        <div class="item">
          <img src="../../../assets/img/icon/feedback-white.png" alt="">
          <span>设置备注名</span>
        </div>
        <div class="item">
          <img src="../../../assets/img/icon/people-red.png" alt="">
          <span>从朋友中移除</span>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "People",
  props: {
    people: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      showPopover: false
    }
  },
  computed: {},
  created() {
  },
  methods: {}
}
</script>

<style scoped lang="less">
@import "../../../assets/scss/index";

.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s ease;
}

.scale-enter-from,
.scale-leave-to {
  //transform: scale(0);
  opacity: 0;
}

.People {
  height: 7rem;
  display: flex;
  align-items: center;
  position: relative;

  &.top {
    background: #353a4f;
  }


  .head-image {
    margin-right: 1.5rem;
    width: 4.8rem;
    height: 4.8rem;
    border-radius: 50%;
  }

  .add {
    background: @second-btn-color-tran;
    margin-right: 1.5rem;
    padding: 1.5rem;
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 50%;
  }

  .content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    padding: 15px 0;

    .left {
      .name {
        font-size: 1.6rem;
        color: white;
      }

      .detail {
        color: @second-text-color;
        font-size: 1.2rem;
        margin-top: 4px;
      }
    }

    .right {
      display: flex;
      align-items: center;

      .l-button {
        margin-left: .8rem;
        padding: .5rem 2rem;
        border-radius: .2rem;
        background: rgb(58, 58, 67);

        &.address-list {
          padding: .7rem 3rem;
        }

        &.red {
          background: @primary-btn-color;
        }

      }

      img {
        height: 1.8rem;
        margin-left: 2rem;
      }
    }
  }

  .popover {
    z-index: 9;
    position: absolute;
    bottom: -100%;
    right: 1rem;
    border-radius: .8rem;
    background: @second-btn-color;

    .item {
      font-size: 1.4rem;
      padding: 0 4rem 0 1rem;
      display: flex;
      height: 4rem;
      align-items: center;
      border-bottom: 1px solid @line-color;

      &:nth-last-child(1) {
        border-bottom: none;
        color: @primary-btn-color;
      }

      img {
        margin-right: 1rem;
        height: 2rem;
      }
    }

    .arrow {
      width: 0;
      height: 0;
      border: .7rem solid transparent;
      border-bottom: .7rem solid @second-btn-color;
      position: absolute;
      right: 1rem;
      top: -1.4rem;
    }
  }
}
</style>
