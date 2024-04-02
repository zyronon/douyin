<script setup>
import BaseMusic from '../BaseMusic'
import Utils from '../../utils'
import bus, { EVENT_KEY } from '@/utils/bus'
import { Icon } from '@iconify/vue'

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
  }
})
const emit = defineEmits(['update:item', 'goUserInfo', 'showComments', 'showShare', 'goMusic'])

function loved() {
  Utils.updateItem(props, 'isLoved', !props.item.isLoved, emit)
}

function attention(e) {
  e.currentTarget.classList.add('attention')
  setTimeout(() => {
    Utils.updateItem(props, 'isAttention', true, emit)
  }, 1000)
}

function showComments() {
  // emit('showComments')
  bus.emit(EVENT_KEY.OPEN_COMMENTS, props.item.id)
}
</script>

<template>
  <div class="toolbar mb1r">
    <div class="avatar-ctn mb2r">
      <img
        class="avatar"
        :src="props.item.author.avatar_168x168.url_list[0]"
        alt=""
        @click.stop="bus.emit(EVENT_KEY.GO_USERINFO)"
      />
      <transition name="fade">
        <div v-if="!props.item.isAttention" @click.stop="attention" class="options">
          <img class="no" src="../../assets/img/icon/add-light.png" alt="" />
          <img class="yes" src="../../assets/img/icon/ok-red.png" alt="" />
        </div>
      </transition>
    </div>
    <div class="love mb2r" @click.stop="loved($event)">
      <div>
        <img src="../../assets/img/icon/love.svg" class="love-image" v-if="!props.item.isLoved" />
        <img src="../../assets/img/icon/loved.svg" class="love-image" v-if="props.item.isLoved" />
      </div>
      <span>{{ Utils.formatNumber(props.item.statistics.digg_count) }}</span>
    </div>
    <div class="message mb2r" @click.stop="showComments">
      <Icon icon="mage:message-dots-round-fill" class="icon" style="color: white" />
      <span>{{ Utils.formatNumber(props.item.statistics.comment_count) }}</span>
    </div>
    <!--TODO     -->
    <div
      class="message mb2r"
      @click.stop="Utils.updateItem(props, 'isCollect', !props.item.isCollect, emit)"
    >
      <Icon v-if="props.item.isCollect" icon="ic:round-star" class="icon" style="color: yellow" />
      <Icon v-else icon="ic:round-star" class="icon" style="color: white" />
      <span>{{ Utils.formatNumber(props.item.statistics.comment_count) }}</span>
    </div>
    <div v-if="!props.isMy" class="share mb2r" @click.stop="bus.emit(EVENT_KEY.SHOW_SHARE)">
      <img src="../../assets/img/icon/share-white-full.png" alt="" class="share-image" />
      <span>{{ Utils.formatNumber(props.item.statistics.share_count) }}</span>
    </div>
    <div v-else class="share mb2r" @click.stop="bus.emit(EVENT_KEY.SHOW_SHARE)">
      <img src="../../assets/img/icon/menu-white.png" alt="" class="share-image" />
    </div>
    <!--    <BaseMusic-->
    <!--        :cover="props.item.music.cover"-->
    <!--        @click.stop="$nav('/home/music')"-->
    <!--    /> -->
    <BaseMusic :item="props.item" />
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

    @w: 45rem;

    .avatar {
      width: @w;
      height: @w;
      border: 3rem solid white;
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

  .love,
  .message,
  .share {
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

  .icon {
    font-size: 40rem;
  }

  .loved {
    background: red;
  }
}
</style>
