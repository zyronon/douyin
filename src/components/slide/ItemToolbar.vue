<script setup>
import BaseMusic from "../BaseMusic";
import Utils from "../../utils";
import {reactive} from "vue";
import bus from "../../utils/bus";
import {cloneDeep} from "lodash";

const {item, index, isMy, isUp, isPlay, position} = defineProps({
  item: {
    type: Object,
    default: () => {
      return {}
    }
  },
  index: {
    type: Number,
    default: () => {
      return -1
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
  isUp: {
    type: Boolean,
    default: () => {
      return false
    }
  },
  //用于第一条数据，自动播放，如果都用事件去触发播放，有延迟
  isPlay: {
    type: Boolean,
    default: () => {
      return true
    }
  },
})
const emit = defineEmits(['update:item'])
const state = reactive({
  isAttention: false,
})

function loved(e, index) {
  let old = cloneDeep(item)
  old.isLoved = !old.isLoved
  emit('update:item', old)
  // bus.emit('update:item', {position, item: old})
}

function attention() {
  // let option = this.$refs['attention-option']
  // option.classList.add('attention')
  // setTimeout(() => {
  //   this.isAttention = true
  // }, 1000)
}

</script>

<template>
  <div class="toolbar mb1r">
    <div class="avatar-ctn mb4r">
      <img class="avatar" :src="item.author.avatar" alt=""
           @click.stop="$emit('goUserInfo')">
      <transition name="fade">
        <div v-if="!state.isAttention" @click.stop="attention" class="options" ref="attention-option">
          <img class="no" src="../../assets/img/icon/add-light.png" alt="">
          <img class="yes" src="../../assets/img/icon/ok-red.png" alt="">
        </div>
      </transition>

    </div>
    <div class="love mb2r" @click.stop="loved($event)">
      <div>
        <img src="../../assets/img/icon/love.svg" class="love-image" v-if="!item.isLoved">
        <img src="../../assets/img/icon/loved.svg" class="love-image" v-if="item.isLoved">
      </div>
      <span>{{ Utils.formatNumber(item.digg_count) }}</span>
    </div>
    <div class="message mb2r" @click.stop="$emit('showComments')">
      <!--            <div class="message mb15p" @click.stop="showComment">-->
      <img src="../../assets/img/icon/message.svg" alt="" class="message-image">
      <span>{{ Utils.formatNumber(item.comment_count) }}</span>
    </div>
    <div v-if="!isMy" class="share mb4r" @click.stop="$emit('showShare')">
      <img src="../../assets/img/icon/share-white-full.png" alt="" class="share-image">
      <span>{{ Utils.formatNumber(item.share_count) }}</span>
    </div>
    <div v-else class="share mb4r" @click.stop="$emit('showShare')">
      <img src="../../assets/img/icon/share-white-full.png" alt="" class="share-image">
    </div>
    <BaseMusic
        :cover="item.music.cover"
        :key="state.name"
        :name="state.name"
        :isPlay="isPlay"
        @click.stop="$emit('goMusic')"
    />
  </div>

</template>

<style scoped lang="less">
.toolbar {
  //width: 40px;
  position: absolute;
  bottom: 0;
  right: 5px;
  color: #fff;

  .avatar-ctn {
    position: relative;

    .avatar {
      width: 55px;
      height: 55px;
      border-radius: 50%;
    }

    .options {
      position: absolute;
      border-radius: 50%;
      margin: auto;
      left: 0;
      right: 0;
      bottom: -5px;
      background: red;
      //background: black;
      width: 18px;
      height: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 1s;

      img {
        position: absolute;
        width: 12px;
        height: 12px;
        transition: all 1s;
      }

      .yes {
        opacity: 0;
        transform: rotate(-180deg);
      }

      &.attention {
        background: white;

        .no {
          opacity: 0;
          transform: rotate(180deg);
        }

        .yes {
          opacity: 1;
          transform: rotate(0deg);
        }
      }
    }
  }

  .love, .message, .share {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @width: 35rem;

    img {
      width: @width;
      height: @width;
    }

    span {
      font-size: 12rem;
    }
  }

  .loved {
    background: red;
  }

}
</style>