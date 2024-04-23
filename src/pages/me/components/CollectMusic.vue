<template>
  <div id="CollectMusic">
    <SlideVertical
      :changeActiveIndexUseAnim="false"
      v-model:index="activeIndex"
      :canMove="slideCanMove"
    >
      <SlideItemMusic
        :ref="setItemRef"
        @showList="isShowList = true"
        @showShare="isSharing = true"
        @previous="previous"
        @next="next"
        @slideCanMove="(e) => (this.slideCanMove = e)"
        :model-value="list[index]"
        v-model:isLoop="isLoop"
        v-for="(item, index) in list"
        :key="index"
      />
    </SlideVertical>
    <from-bottom-dialog
      mask-mode="lightgray"
      page-id="CollectMusic"
      border-radius="15rem 15rem 0 0"
      :show-heng-gang="false"
      height="70vh"
      v-model="isShowList"
    >
      <div class="music-list-dialog">
        <div class="music-list-header">
          <div class="left">待播清单</div>
          <div class="right" @click="isLoop = !isLoop">
            <img v-show="isLoop" src="@/assets/img/icon/me/loop.png" alt="" />
            <img v-show="!isLoop" src="@/assets/img/icon/me/play-normal.png" alt="" />
            <span>{{ isLoop ? '单曲循环' : '顺序播放' }}</span>
          </div>
        </div>
        <div class="wrapper">
          <div
            class="l-row"
            v-for="(item, index) in list"
            @click="play(index)"
            :key="index"
            :class="{ active: activeIndex === index }"
          >
            <div class="left">
              <img
                v-if="activeIndex === index"
                src="@/assets/img/icon/me/pinlv.gif"
                alt=""
                class="play-icon"
              />
              <div class="name">{{ item.name }}</div>
              <div class="author">{{ item.author }}</div>
            </div>
            <dy-back class="right" mode="gray" img="close" />
          </div>
        </div>
        <div class="footer" @click="isShowList = false">取消</div>
      </div>
    </from-bottom-dialog>

    <Share
      v-model="isSharing"
      mode="my-music"
      ref="share"
      pageId="GuessMusic"
      @ShareToFriend="delayShowDialog((e) => (this.isShowShareToFriend = true))"
    />

    <ShareToFriend pageId="GuessMusic" v-model="isShowShareToFriend" />
  </div>
</template>
<script>
import FromBottomDialog from '../../../components/dialog/FromBottomDialog'
import SlideItemMusic from './SlideItemMusic'
import Share from '../../../components/Share'
import ShareToFriend from '../../home/components/ShareToFriend'
import SlideVertical from '@/components/slide/SlideVertical.vue'

export default {
  name: 'GuessMusic',
  components: {
    SlideVertical,
    FromBottomDialog,
    SlideItemMusic,
    Share,
    ShareToFriend
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    },
    page2SlideIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      slideCanMove: true,
      isShowShareToFriend: false,
      isShowList: false,
      isSharing: false,
      isLoop: false,
      collectSlideIndex: 0,
      isShowCollectDialog: false,
      itemRefs: []
    }
  },
  computed: {
    activeIndex: {
      get() {
        return this.page2SlideIndex
      },
      set(val) {
        this.$emit('update:page2SlideIndex', val)
      }
    }
  },
  created() {},
  watch: {
    activeIndex(newVal) {
      this.itemRefs.map((ref) => {
        ref.togglePlay(false)
      })
      this.itemRefs[newVal].togglePlay(true, true)
    }
  },
  methods: {
    previous() {
      if (this.activeIndex > 0) {
        this.play(this.activeIndex - 1)
      }
    },
    next() {
      if (this.activeIndex < this.list.length - 1) {
        this.play(this.activeIndex + 1)
      }
    },
    delayShowDialog(cb) {
      setTimeout(() => {
        cb()
      }, 100)
    },
    setItemRef(el) {
      if (el) {
        this.itemRefs.push(el)
      }
    },
    play(index) {
      this.activeIndex = index
      this.itemRefs.map((ref) => {
        ref.togglePlay(false)
      })
      this.itemRefs[index].togglePlay(true, true)
    },
    pause() {
      this.itemRefs.map((ref) => {
        ref.togglePlay(false)
      })
    }
  }
}
</script>
<style scoped lang="less">
#CollectMusic {
  //width: 100%;
  //height: calc(var(--vh, 1vh) * 100);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 14rem;
}

.music-list-dialog {
  height: 70vh;
  @bg-color: #1e1d1d;
  background: @bg-color;

  .music-list-header {
    position: fixed;
    width: 100%;
    background: @bg-color;
    box-sizing: border-box;
    border-bottom: 1px solid #2a2828;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50rem;
    padding: 0 var(--page-padding);
    border-radius: 15rem 15rem 0 0;
    z-index: 9;

    .left {
      font-size: 16rem;
    }

    .right {
      display: flex;
      align-items: center;
      font-size: 12rem;

      img {
        width: 20rem;
        margin-right: 5rem;
      }
    }
  }

  .wrapper {
    padding-top: 50rem;
  }

  .l-row {
    background: @bg-color;
    height: 50rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 var(--page-padding);

    &.active {
      color: var(--primary-btn-color);
    }

    .left {
      display: flex;
      align-items: center;

      .author {
        font-size: 12rem;
        color: var(--second-text-color);
        margin-left: 20rem;
        position: relative;
        display: flex;
        align-items: center;

        &:after {
          content: '';
          width: 6rem;
          height: 0.5px;
          background: var(--second-text-color);
          position: absolute;
          left: -12rem;
        }
      }

      .play-icon {
        width: 15rem;
        margin-right: 10rem;
      }
    }

    .right {
      width: 15rem;
    }
  }

  .footer {
    background: @bg-color;
    border-top: 1px solid #2a2828;
    height: 60rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
