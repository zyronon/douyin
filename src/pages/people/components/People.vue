<template>
  <div class="People">
    <img :src="$imgPreview(people.avatar)" alt="" class="head-image pull-left">
    <div class="content">
      <template v-if="mode === 'fans'">
        <div class="left">
          <div class="name">{{ people.name }}</div>
          <div class="name">
            <template v-if="people.type === RELATE_ENUM.REQUEST_FOLLOW">
              发来一个关注请求
            </template>
            <template v-else>
              关注了你
            </template>
          </div>
          <div class="detail">07-23</div>
        </div>
        <div class="right">
          <!--   他关注我   -->
          <template v-if="people.type === RELATE_ENUM.FOLLOW_ME">
            <div class="l-button red" @click="$emit('follow')">回关</div>
          </template>
          <!--   我关注他   -->
          <template v-if="people.type === RELATE_ENUM.FOLLOW_HE">
            <div class="l-button" @click="$emit('unfollow')">已关注</div>
          </template>
          <!--          相互关注-->
          <template v-if="people.type === RELATE_ENUM.FOLLOW_EACH_OTHER">
            <div class="l-button" @click="$emit('unfollow')">互相关注</div>
          </template>
          <!--         关注请求-->
          <template v-if="people.type === RELATE_ENUM.REQUEST_FOLLOW">
            <div class="l-button " @click="$emit('ignore')">忽略</div>
            <div class="l-button red" @click="$emit('agree')">通过</div>
          </template>
        </div>
      </template>

      <template v-if="mode === 'recommend'">
        <div class="left">
          <div class="name">{{ people.name }}</div>
          <div class="detail">可能认识的人</div>
        </div>
        <div class="right">
          <template v-if="people.type === RELATE_ENUM.RECOMMEND">
            <div class="l-button" @click="$emit('remove')">移除</div>
            <div class="l-button red" @click="$emit('follow')">关注</div>
          </template>
          <!--   我关注他   -->
          <template v-if="people.type === RELATE_ENUM.FOLLOW_HE">
            <div class="l-button" @click="$emit('unfollow')">已关注</div>
          </template>
        </div>
      </template>

      <template v-if="mode === 'friend'">
        <div class="left">
          <div class="name">{{ people.name }}</div>
          <div class="detail">4小时之内在线</div>
        </div>
        <div class="right">
          <div class="l-button">发私信</div>
          <img src="../../../assets/img/icon/menu-white.png" alt="" @click="showPopover = !showPopover">
        </div>
      </template>

      <template v-if="mode === 'visitor'">
        <div class="left">
          <div class="name">{{ people.name }}</div>
        </div>
        <div class="right">
          <!--   他关注我   -->
          <template v-if="people.type === RELATE_ENUM.FOLLOW_ME">
            <div class="l-button red" @click="$emit('follow')">关注</div>
          </template>
          <!--   我关注他   -->
          <template v-if="people.type === RELATE_ENUM.FOLLOW_HE">
            <div class="l-button" @click="$emit('unfollow')">已关注</div>
          </template>
          <!--          相互关注-->
          <template v-if="people.type === RELATE_ENUM.FOLLOW_EACH_OTHER">
            <div class="l-button" @click="$emit('unfollow')">互相关注</div>
          </template>
        </div>
      </template>
    </div>
    <!--   TODO 点了不消失，内容也变了 -->
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
    },
    mode: {
      type: String,
      default: 'fans'
    }
  },
  data() {
    return {
      showPopover: false,
      RELATE_ENUM: {
        RECOMMEND: -1,//推荐
        FOLLOW_ME: 1,//只关注我
        FOLLOW_EACH_OTHER: 2,//互相关注
        FOLLOW_HE: 3,//我关注他
        REQUEST_FOLLOW: 4//关注请求
      }
    }
  },
  computed: {},
  created() {
  },
  methods: {}
}
</script>

<style scoped lang="less">
@import "../../../assets/less/index";

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
  transition: all 0.3s ease;
  width: 100%;
  height: 7rem;
  display: flex;
  align-items: center;
  position: relative;

  &.top {
    background: #353a4f;
  }


  .head-image {
    margin-right: 1.5rem;
    width: 4.5rem;
    height: 4.5rem;
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
        font-size: 1.4rem;
        margin-bottom: .2rem;
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
        border-radius: .2rem;
        background: rgb(58, 58, 67);
        font-size: 1.2rem;
        padding: .4rem 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 5.5rem;

        &:only-child {
          width: 7rem;
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
