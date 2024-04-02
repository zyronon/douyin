<template>
  <from-bottom-dialog
    :page-id="pageId"
    :modelValue="modelValue"
    @update:modelValue="(e) => $emit('update:modelValue', e)"
    @cancel="closeShare"
    :show-heng-gang="false"
    :touch-moved="false"
    maskMode="light"
    height="370rem"
    mode="dark"
  >
    <div class="share">
      <div class="title">
        <span>分享给朋友</span>
        <dy-back mode="light" img="close" direction="right" @click.stop="closeShare"></dy-back>
      </div>
      <div class="friends list">
        <div
          class="option"
          :key="i"
          v-for="(item, i) in friends.all"
          @click.stop="toggleCall(item)"
        >
          <img
            :style="item.select ? 'opacity: .5;' : ''"
            class="avatar"
            :src="$imgPreview(item.avatar)"
            alt=""
          />
          <span>{{ item.name }}</span>
          <img
            v-if="item.select"
            class="checked"
            src="../assets/img/icon/components/check/check-red-share.png"
          />
        </div>
        <div class="option" @click.stop="closeShare($nav('/message/share-to-friend'))">
          <dy-back class="more" mode="light" direction="right"></dy-back>
          <span>更多朋友</span>
        </div>
      </div>
      <div class="shares list">
        <template v-if="mode === 'video'">
          <div class="option" @click.stop="closeShare($emit('ShareToFriend'))">
            <img class="avatar" src="../assets/img/icon/components/video/torichang.png" alt="" />
            <span>转发</span>
          </div>
          <div class="option" @click.stop="closeShare($emit('ShareToFriend'))">
            <Icon icon="icon-park-solid:good-two" />
            <span>推荐给朋友</span>
          </div>
          <div class="option" @click.stop="copyLink">
            <Icon icon="humbleicons:link" />
            <span>复制链接</span>
          </div>
          <div class="option" @click.stop="$no">
            <img class="small" src="../assets/img/icon/components/video/comeonplay.png" alt="" />
            <span>合拍</span>
          </div>
          <div class="option" @click.stop="$no">
            <img class="small" src="../assets/img/icon/components/video/dou.webp" alt="" />
            <span>帮上热门</span>
          </div>
          <div class="option" @click.stop="$nav('/home/report', { mode: this.mode })">
            <img class="small" src="../assets/img/icon/components/video/warring.png" alt="" />
            <span>举报</span>
          </div>
          <div class="option" @click.stop="closeShare($emit('ShareToFriend'))">
            <Icon icon="ion:paper-plane" />
            <span>私信朋友</span>
          </div>
          <div class="option" v-if="canDownload" @click.stop="closeShare($emit('download'))">
            <Icon icon="mingcute:download-fill" />
            <span>保存本地</span>
          </div>
          <div class="option" @click.stop="$no">
            <!--TODO icon不对            -->
            <img class="small" src="../assets/img/icon/components/video/feedback.webp" alt="" />
            <span>建群分享</span>
          </div>
          <div class="option" @click.stop="$no">
            <img class="small" src="../assets/img/icon/components/video/comeonlook.webp" alt="" />
            <span>一起看视频</span>
          </div>
          <div class="option" @click.stop="closeShare($emit('dislike'))">
            <img class="small" src="../assets/img/icon/components/video/dislike.png" alt="" />
            <span>不感兴趣</span>
          </div>
          <div class="option" @click.stop="closeShare($emit('showDouyinCode'))">
            <Icon icon="tabler:photo" />
            <span>生成图片</span>
          </div>
          <div class="option" @click.stop="$no">
            <img class="small" src="../assets/img/icon/components/video/bizhi.webp" alt="" />
            <span>动态壁纸</span>
          </div>
          <div class="option" @click.stop="closeShare($emit('play-feedback'))">
            <img class="small" src="../assets/img/icon/components/video/feedback.webp" alt="" />
            <span>播放反馈</span>
          </div>
        </template>
        <template v-if="mode === 'music'">
          <div class="option" @click.stop="closeShare($emit('ShareToFriend'))">
            <img class="small" src="../assets/img/icon/components/video/tofriend.webp" alt="" />
            <span>私信朋友</span>
          </div>
          <div class="option" @click.stop="$nav('/home/report', { mode: this.mode })">
            <img class="small" src="../assets/img/icon/components/video/warring.png" alt="" />
            <span>举报音乐</span>
          </div>
        </template>
        <template v-if="mode === 'my-music'">
          <div class="option" @click.stop="$no">
            <img class="small" src="../assets/img/icon/components/video/torichang.png" alt="" />
            <span>转发到日常</span>
          </div>
          <div class="option" @click.stop="closeShare($emit('ShareToFriend'))">
            <img class="small" src="../assets/img/icon/components/video/tofriend.webp" alt="" />
            <span>私信朋友</span>
          </div>
        </template>
      </div>

      <div class="share2friend" v-if="selectFriends.length">
        <div class="comment">
          <textarea placeholder="有什么想和好友说的..."></textarea>
          <img class="poster" src="../assets/img/poster/1.jpg" alt="" />
        </div>
        <div class="btns">
          <dy-button type="dark2" radius="7" v-if="selectFriends.length > 1" @click.stop="$no"
            >建群并发送
          </dy-button>
          <dy-button type="primary" radius="7" @click.stop="$no"
            >{{ selectFriends.length > 1 ? '分别发送' : '发送' }}
          </dy-button>
        </div>
      </div>
    </div>
  </from-bottom-dialog>
</template>

<script>
import { mapState } from 'pinia'
import FromBottomDialog from './dialog/FromBottomDialog'
import { useBaseStore } from '@/store/pinia'
import { $no, _copy } from '@/utils'

export default {
  name: 'Share',
  components: {
    FromBottomDialog
  },
  props: {
    modelValue: {
      type: Boolean,
      default() {
        return false
      }
    },
    item: {},
    videoId: {
      type: String,
      default() {
        return null
      }
    },
    pageId: {
      type: String,
      default() {
        return 'home-index'
      }
    },
    canDownload: {
      type: Boolean,
      default() {
        return true
      }
    },
    mode: {
      type: String,
      default() {
        return 'video'
        //music
        //qrcode
      }
    }
  },
  computed: {
    ...mapState(useBaseStore, ['friends']),
    selectFriends() {
      return this.friends.all.filter((v) => v.select)
    }
  },
  data() {
    return {}
  },
  methods: {
    $no,
    async copyLink() {
      this.closeShare()
      this.$showLoading()
      await this.$sleep(500)
      this.$hideLoading()
      _copy(this.item.share_info.share_link_desc + this.item.share_info.share_url)
      //TODO 抖音样式改了
      this.$notice('复制成功')
    },

    toggleCall(item) {
      item.select = !item.select
    },
    closeShare() {
      this.friends.all = this.friends.all.map((v) => {
        v.select = false
        return v
      })
      this.$emit('update:modelValue', false)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/less/index';

.share {
  width: 100%;
  background: black;
  border-radius: 10px 10px 0 0;
  color: white;
  box-sizing: border-box;

  @space-width: 26rem;
  @avatar-width: 58rem;
  @icon-width: 30rem;

  .title {
    font-size: 14rem;
    padding: 10rem 20rem 30rem 20rem;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      width: 14rem;
      height: 14rem;
      padding: 6rem;
      border-radius: 50%;
      background: var(--second-btn-color-tran);
      //background: rgb(56, 58, 57);
    }
  }

  .list {
    overflow-x: scroll;
    display: flex;
    padding: 0 20rem;
    gap: 22rem;
    padding-bottom: 50rem;
  }

  @c: rgb(51, 51, 51);

  .option {
    width: @avatar-width;
    position: relative;
    font-size: 10rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    .avatar {
      width: @avatar-width;
      height: @avatar-width;
      border-radius: 50%;
    }

    .checked {
      position: absolute;
      top: @avatar-width - 1.5;
      right: -2px;
      width: 20rem;
      height: 20rem;
      border-radius: 50%;
    }

    span {
      margin-top: 8rem;
      text-align: center;
      width: @avatar-width;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .more {
      width: 20rem;
      padding: 19rem;
      border-radius: 50%;
      background: @c;
      //background: rgb(56, 58, 57);
    }

    svg {
      .more;
      width: unset;
      padding: 16rem;
      font-size: 26rem;
      color: rgb(205, 205, 205);
    }

    .small {
      width: @icon-width;
      height: @icon-width;
      padding: 14rem;
      border-radius: 50%;
      background: @c;
    }
  }

  .share2friend {
    position: fixed;
    bottom: 0;
    padding: 20rem;
    box-sizing: border-box;
    width: 100vw;
    height: 180rem;
    background: black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .comment {
      display: flex;
      flex: 1;

      textarea {
        flex: 1;
        outline: none;
        border: none;
        background: transparent;
        color: #fff;
      }

      .poster {
        margin-left: 20rem;
        height: 40rem;
        width: 40rem;
      }
    }

    .btns {
      display: flex;
      gap: 10rem;
      align-items: center;
      justify-content: space-between;

      .button {
        flex: 1;
      }
    }
  }
}

.share-enter-active,
.share-leave-active {
  transition: all 0.15s ease;
}

.share-enter-from,
.share-leave-to {
  transform: translateY(60vh);
}
</style>
