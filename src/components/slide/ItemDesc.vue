<script setup>

import {reactive} from "vue";
import BaseMarquee from "../BaseMarquee";
import bus from "../../utils/bus";

const props = defineProps({
  item: {
    type: Object,
    default: () => {
      return {}
    }
  },
  position: {
    type: Object,
    default: () => {
      return {}
    }
  },
  isMy: {
    type: Boolean,
    default: () => {
      return false
    }
  },
})

const state = reactive({
  isAttention: false,
  test: [1, 2],
})

</script>
<template>
  <div class="item-desc">
    <div class="content ml1r mb1r" v-if="!props.isMy">
      <div class="location-wrapper" v-if=" props.item.city || item.address">
        <div class="location">
          <img src="../../assets/img/icon/location.webp" alt="">
          <span>{{ props.item.city }}</span>
          <template v-if="props.item.address">
            <div class="gang"></div>
          </template>
          <span>{{ props.item.address }}</span>
        </div>
      </div>
      <div class="name mb1r fb" @click.stop="$emit('goUserInfo')">@{{ props.item.author.nickname }}</div>
      <div class="description mb1r">
        {{ props.item.desc }}
      </div>
      <div class="music" @click.stop="bus.emit('nav','/home/music')">
        <img src="../../assets/img/icon/music.svg" alt="" class="music-image">
        <BaseMarquee :text="props.item.music.title"/>
      </div>
    </div>
    <div v-else class="comment-status">
      <div class="comment">
        <div class="type-comment">
          <img src="../../assets/img/icon/head-image.jpeg" alt="" class="avatar">
          <div class="right">
            <p>
              <span class="name">zzzzz</span>
              <span class="time">2020-01-20</span>
            </p>
            <p class="text">北京</p>
          </div>
        </div>
        <transition-group name="comment-status" tag="div" class="loveds">
          <div class="type-loved" :key="i" v-for="i in state.test">
            <img src="../../assets/img/icon/head-image.jpeg" alt="" class="avatar">
            <img src="../../assets/img/icon/love.svg" alt="" class="loved">
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "../../assets/less/color";

.item-desc {

  .content {
    color: #fff;
    position: absolute;
    bottom: 0;
    width: 75%;
    //display: flex;
    //flex-direction: column;

    .location-wrapper {
      display: flex;

      .location {
        margin-bottom: 10rem;

        display: flex;
        align-items: center;
        font-size: 12rem;
        padding: 4rem;
        border-radius: 3rem;
        background: @second-btn-color-tran;

        .gang {
          height: 8rem;
          width: 1.5px;
          margin: 0 5rem;
          background: gray;
        }

        img {
          margin-right: 7rem;
          width: 18rem;
        }
      }
    }


    .music {
      position: relative;
      width: 60%;
      display: flex;
      align-items: center;

      .music-image {
        width: 20px;
        height: 20px;
        margin-top: 3px;
      }
    }
  }

  .comment-status {
    display: flex;
    align-items: center;

    .comment {

      .type-comment {
        display: flex;
        background: rgb(130, 21, 44);
        border-radius: 50px;
        padding: 3px;
        margin-bottom: 20px;

        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
        }

        .right {
          margin: 0 10px;
          color: @second-text-color;

          .name {
            margin-right: 10px;
          }

          .text {
            color: white;
          }

        }

      }

      .loveds {
      }

      .type-loved {
        width: 40px;
        height: 40px;
        position: relative;
        margin-bottom: 20px;
        animation: test 1s;
        animation-delay: .5s;

        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
        }

        .loved {
          position: absolute;
          bottom: 0;
          left: 20px;
          width: 10px;
          height: 10px;
          background: red;
          padding: 3px;
          border-radius: 50%;
          border: 2px solid white;
        }
      }

      @keyframes test {
        from {
          display: block;
          transform: translate3d(0, 0, 0);
        }
        to {
          display: none;
          transform: translate3d(0, -60px, 0);
        }
      }
    }
  }
}
</style>