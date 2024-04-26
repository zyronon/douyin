<template>
  <from-bottom-dialog
    :page-id="pageId"
    :modelValue="modelValue"
    @update:modelValue="(e) => $emit('update:modelValue', e)"
    @cancel="closeShare1"
    :touch-moved="false"
    maskMode="light"
    height="60vh"
    mode="light"
  >
    <div class="video-share">
      <div class="shares">
        <to-share
          item-type="weChat"
          :need-down="true"
          :can-download="canDownload"
          @copy="copyLink"
          @click="closeShare"
        />
        <to-share
          item-type="weChatZone"
          :need-down="true"
          :can-download="canDownload"
          @copy="copyLink"
          @click="closeShare"
        />
        <to-share
          item-type="qq"
          :need-down="true"
          :can-download="canDownload"
          @copy="copyLink"
          @click="closeShare"
        />
        <to-share
          item-type="download"
          :need-down="true"
          :can-download="canDownload"
          @click="closeShare()"
        />
        <to-share item-type="report" @click="$router.push('/home/report', { mode: this.mode })" />
        <to-share item-type="copyPassword" @click="copyLink" />
        <to-share :item-type="isCollect ? 'collectYellow' : 'collect'" @click="toggleCollect" />
        <to-share item-type="comeon" @click="_no" />
        <to-share item-type="dou" @click="_no" />
        <to-share item-type="copyLink" @click="copyLink" />
        <template v-if="isShowMore">
          <to-share item-type="duoshan" @click="isShowMore = true" />
          <to-share item-type="totoutiao" @click="isShowMore = true" />
        </template>
        <to-share v-else item-type="share" @click="isShowMore = true" />
        <to-share item-type="dislike" @click="isShowMore = true" />
        <to-share item-type="bizhi" @click="_no" />
        <to-share item-type="code" @click="_no" />
      </div>
      <div class="friends">
        <div class="item" :key="i" v-for="(item, i) in friends.all">
          <img class="left" v-lazy="_checkImgUrl(item.avatar)" alt="" />
          <div class="right">
            <span>{{ item.name }}</span>
            <dy-button
              size="small"
              :type="item.shared ? 'dark' : 'primary'"
              @click="item.shared = true"
            >
              {{ item.shared ? '已' : '' }}分享
            </dy-button>
          </div>
        </div>
        <div class="more" @click="closeShare($router.push('/message/share-to-friend'))">
          <img class="left" src="../../../assets/img/icon/components/video/more-dark.png" />
          <span>更多朋友</span>
        </div>
      </div>
    </div>
  </from-bottom-dialog>
</template>

<script lang="jsx">
import { mapState } from 'pinia'
import FromBottomDialog from '../../../components/dialog/FromBottomDialog'
import LoadingCircle from './LoadingCircle'
import { useBaseStore } from '@/store/pinia'
import {
  _checkImgUrl,
  _hideLoading,
  _no,
  _notice,
  _showLoading,
  _sleep,
  _stopPropagation
} from '@/utils'
// import DouyinCode from "./DouyinCode";

export default {
  name: 'Share',
  components: {
    FromBottomDialog,
    // DouyinCode,
    ToShare: {
      components: {
        LoadingCircle
      },
      props: {
        itemType: {
          type: String,
          default: 'weChat'
        },
        needDown: {
          type: Boolean,
          default: false
        },
        canDownload: {
          type: Boolean,
          default: true
        }
      },
      data() {
        return {
          progress: 0,
          loading: false,
          text: {
            weChat: '微信',
            weChatZone: '朋友圈',
            qq: 'QQ',
            download: '保存本地',
            report: '举报',
            copyPassword: '复制口令',
            copyLink: '复制链接',
            collect: '收藏',
            collectYellow: '取消收藏',
            comeon: '一起看',
            dou: '帮上热门',
            share: '更多分享',
            duoshan: '多闪',
            totoutiao: '今日头条',
            dislike: '不感兴趣',
            bizhi: '动态壁纸',
            code: '抖音码'
          }
        }
      },
      computed: {
        styleCanDownload() {
          if (!this.canDownload) {
            return this.itemType !== 'download'
          }
          return true
        }
      },
      methods: {
        displayText() {
          if (this.loading) {
            return this.progress !== 100 ? '下载中' : this.text[this.itemType]
          }
          return this.text[this.itemType]
        },
        click(e) {
          if (!this.canDownload) {
            if (this.itemType === 'download') {
              _stopPropagation(e)
            } else {
              _notice('作者已关闭下载功能')
              this.$emit('copy')
            }
            return
          }
          if (this.needDown) _stopPropagation(e)
          else return
          if (this.progress === 100) {
            _notice('未实现分享跳转到其他App')
          } else {
            this.loading = true
            let interval = setInterval(() => {
              if (this.progress < 100) {
                this.progress++
              } else {
                clearInterval(interval)
                this.loading = false
                this.$emit('click')
                this.$emit('click')
                _notice('未实现分享跳转到其他App')
              }
            }, 10)
          }
        }
      },
      render() {
        return (
          <div
            className="to"
            onClick={this.click}
            style={{ opacity: this.styleCanDownload ? '1' : '0.5' }}
          >
            <div className="wrapper">
              {this.loading ? (
                <div className="loading-wrapper" style="width: 80%;height: 80%;">
                  <LoadingCircle v-model={this.progress} />
                </div>
              ) : (
                <img src={`/src/assets/img/icon/components/share/${this.itemType}.png`} alt="" />
              )}
            </div>
            <span>{this.displayText()}</span>
          </div>
        )
      }
    }
  },
  props: {
    modelValue: {
      type: Boolean,
      default() {
        return false
      }
    },
    videoId: {
      type: String,
      default: null
    },
    pageId: {
      type: String,
      default: 'home-index'
    },
    canDownload: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState(useBaseStore, ['friends'])
  },
  watch: {
    modelValue(newVal) {
      if (!newVal) {
        this.loading = {
          weChat: false,
          weChatZone: false
        }
        this.progress = 0
        this.isShowMore = false
      }
    }
  },
  data() {
    return {
      isCollect: false,
      isShowMore: false,
      loading: {
        weChat: false,
        weChatZone: false
      },
      text: {
        weChat: '微信',
        weChatZone: '朋友圈'
      },
      progress: 0
    }
  },
  methods: {
    _checkImgUrl,
    _no,
    displayText(type) {
      if (this.loading[type]) {
        return this.progress !== 100 ? '下载中' : this.text[type]
      }
      return this.text[type]
    },
    async copyLink() {
      this.closeShare()
      _showLoading()
      await _sleep(500)
      _hideLoading()
      _notice('复制成功')
    },
    toggleCollect() {
      this.closeShare()
      if (this.isCollect) {
        _notice('取消收藏成功')
      } else {
        _notice('收藏成功')
      }
      this.isCollect = !this.isCollect
    },
    toggleCall(item) {
      item.select = !item.select
    },
    closeShare() {
      this.$emit('update:modelValue', false)
    },
    closeShare1() {
      this.$emit('update:modelValue', false)
    }
  }
}
</script>

<style lang="less" scoped>
.video-share {
  height: 60vh;
  width: 100%;
  border-radius: 10rem 10rem 0 0;
  color: white;
  box-sizing: border-box;

  .friends {
    border-radius: 10rem;
    margin: 10rem;
    padding: 0 var(--page-padding);
    @avatar-width: 38rem;
    font-size: 14rem;
    background: white;

    @item-width: 55rem;

    .item {
      height: @item-width;
      color: black;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #f3f3f3;

      .left {
        width: @avatar-width;
        height: @avatar-width;
        border-radius: 50%;
        margin-right: 15rem;
      }

      .right {
        font-size: 14rem;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;

        img {
          height: 20rem;
        }
      }
    }

    .more {
      height: @item-width;
      color: black;
      background: white;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #f3f3f3;

      .left {
        width: 20rem;
        height: 20rem;
        border-radius: 50%;
        margin-left: 10rem;
        margin-right: 20rem;
      }
    }
  }

  @icon-width: 58rem;

  :deep(.shares) {
    @space-width: 15rem;

    overflow-x: scroll;
    display: flex;
    padding-right: @space-width * 2;

    .to {
      margin-left: @space-width;
      margin-bottom: @space-width;

      .wrapper {
        box-sizing: border-box;
        background: white;
        width: @icon-width;
        height: @icon-width;
        padding: 12rem;
        border-radius: 15rem;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 100%;
          //height: 100%;
        }
      }

      span {
        margin-top: 7rem;
        color: black;
        font-size: 10rem;
        display: block;
        text-align: center;
      }
    }
  }

  .loading {
    width: 60%;
    height: 60%;
    position: relative;

    @border-width: 3.1px;

    .quan1 {
      position: absolute;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      border: @border-width solid darkgrey;
      border-radius: 50%;
    }

    .quan2 {
      position: absolute;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      border: @border-width solid #514f56;
      border-radius: 50%;
    }
  }
}
</style>
