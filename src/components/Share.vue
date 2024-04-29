<template>
  <from-bottom-dialog
    :page-id="pageId"
    :modelValue="modelValue"
    @update:modelValue="(e) => $emit('update:modelValue', e)"
    @cancel="closeShare"
    :show-heng-gang="false"
    :touch-moved="false"
    maskMode="light"
    height="320rem"
    mode="dark"
  >
    <div class="share">
      <div class="title">
        <span>分享给朋友</span>
        <dy-back mode="light" img="close" direction="right" @click.stop="closeShare"></dy-back>
      </div>
      <div class="content">
        <div class="friends list">
          <div
            class="option"
            :key="i"
            v-for="(item, i) in store.friends.all"
            @click.stop="toggleCall(item)"
          >
            <img
              :style="item.select ? 'opacity: .5;' : ''"
              class="avatar"
              :src="_checkImgUrl(item.avatar)"
              alt=""
            />
            <span>{{ item.name }}</span>
            <img
              v-if="item.select"
              class="checked"
              src="../assets/img/icon/components/check/check-red-share.png"
            />
          </div>
          <div class="option" @click.stop="closeShare($router.push('/message/share-to-friend'))">
            <dy-back class="more" mode="light" direction="right"></dy-back>
            <span>更多朋友</span>
          </div>
        </div>
        <div class="bottom">
          <div class="share2friend" v-if="store.selectFriends.length">
            <div class="line"></div>
            <div class="comment">
              <textarea placeholder="有什么想和好友说的..."></textarea>
              <img class="poster" src="../assets/img/poster/1.jpg" alt="" />
            </div>
            <div class="btns">
              <dy-button type="dark2" radius="7" v-if="store.selectFriends.length > 1" @click="_no"
                >建群并发送
              </dy-button>
              <dy-button type="primary" radius="7" @click="_no"
                >{{ store.selectFriends.length > 1 ? '分别发送' : '发送' }}
              </dy-button>
            </div>
          </div>

          <div class="shares list" v-else>
            <template v-if="mode === 'video'">
              <div class="option" @click.stop="closeShare($emit('ShareToFriend'))">
                <img
                  class="avatar"
                  src="../assets/img/icon/components/video/torichang.png"
                  alt=""
                />
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
              <div class="option" @click.stop="_no">
                <img
                  class="small"
                  src="../assets/img/icon/components/video/comeonplay.png"
                  alt=""
                />
                <span>合拍</span>
              </div>
              <div class="option" @click.stop="_no">
                <img class="small" src="../assets/img/icon/components/video/dou.webp" alt="" />
                <span>帮上热门</span>
              </div>
              <div class="option" @click.stop="$router.push('/home/report', { mode: this.mode })">
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
              <div class="option" @click.stop="_no">
                <!--TODO icon不对            -->
                <img class="small" src="../assets/img/icon/components/video/feedback.webp" alt="" />
                <span>建群分享</span>
              </div>
              <div class="option" @click.stop="_no">
                <img
                  class="small"
                  src="../assets/img/icon/components/video/comeonlook.webp"
                  alt=""
                />
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
              <div class="option" @click.stop="_no">
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
              <div class="option" @click.stop="$router.push('/home/report', { mode: this.mode })">
                <img class="small" src="../assets/img/icon/components/video/warring.png" alt="" />
                <span>举报音乐</span>
              </div>
            </template>
            <template v-if="mode === 'my-music'">
              <div class="option" @click.stop="_no">
                <img class="small" src="../assets/img/icon/components/video/torichang.png" alt="" />
                <span>转发到日常</span>
              </div>
              <div class="option" @click.stop="closeShare($emit('ShareToFriend'))">
                <img class="small" src="../assets/img/icon/components/video/tofriend.webp" alt="" />
                <span>私信朋友</span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </from-bottom-dialog>
</template>

<script setup>
import FromBottomDialog from './dialog/FromBottomDialog'
import { useBaseStore } from '@/store/pinia'
import { _checkImgUrl, _copy, _hideLoading, _no, _notice, _showLoading, _sleep } from '@/utils'

defineOptions({
  name: 'Share'
})

const props = defineProps({
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
})

const store = useBaseStore()
const emit = defineEmits(['update:item'])

async function copyLink() {
  closeShare()
  _showLoading()
  await _sleep(500)
  _hideLoading()
  _copy(props.item.share_info.share_link_desc + props.item.share_info.share_url)
  //TODO 抖音样式改了
  _notice('复制成功')
}

function toggleCall(item) {
  item.select = !item.select
}

function closeShare() {
  store.friends.all = store.friends.all.map((v) => {
    v.select = false
    return v
  })
  emit('update:modelValue', false)
}
</script>

<style lang="less" scoped>
.share {
  width: 100%;
  height: 100%;
  background: var(--color-share-bg);
  border-radius: 10px 10px 0 0;
  color: white;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

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

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10rem;

    .bottom {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .list {
    overflow-x: scroll;
    display: flex;
    padding: 0 20rem;
    gap: 22rem;
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
    padding: 20rem;
    padding-top: 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .comment {
      display: flex;
      flex: 1;
      margin-top: 15rem;

      textarea {
        flex: 1;
        font-size: 14rem;
        outline: none;
        border: none;
        background: transparent;
        color: #fff;
      }

      .poster {
        margin-left: 20rem;
        height: 60rem;
        width: 60rem;
        object-fit: cover;
        border-radius: 4rem;
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
