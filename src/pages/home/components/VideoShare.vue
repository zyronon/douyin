<template>
  <from-bottom-dialog
      :page-id="pageId"
      v-model="modelValue"
      @cancel="closeShare1"
      :touch-moved="false"
      maskMode="light"
      height="60vh"
      mode="light">
    <div class="video-share">
      <div class="shares">
        <div class="to" @click="closeShare('weChat')">
          <div class="wrapper">
            <div v-if="loading.weChat" class="loading-wrapper" style="width: 80%;height: 80%;">
              <LoadingCircle v-model="progress"/>
            </div>
            <img v-else src="@/assets/img/icon/components/share/wechat.webp" alt="">
          </div>
          <span>{{ displayText('weChat') }}</span>
        </div>
        <div class="to" @click="closeShare('weChatZone')">
          <div class="wrapper">
            <div v-if="loading.weChatZone" class="loading-wrapper" style="width: 80%;height: 80%;">
              <LoadingCircle v-model="progress"/>
            </div>
            <img v-else src="@/assets/img/icon/components/share/wechatquan.png" alt="">
          </div>
          <!--          <span>{{ displayText('weChatZone') }}</span>-->
         <sssss></sssss>
        </div>
        <template v-if="false">
          <div class="to" @click="closeShare($emit('share2QQZone'))">
            <img src="@/assets/img/icon/components/share/qq.webp" alt="">
            <span>QQ</span>
          </div>
          <div class="to" @click="canDownload && closeShare($emit('download'))"
               :style="{ opacity : canDownload ? '1' : '0.5' }">
            <img src="@/assets/img/icon/components/share/download.png" alt="">
            <span>保存本地</span>
          </div>
          <div class="to" @click="$nav('/home/report',{mode:this.mode})">
            <img src="@/assets/img/icon/components/share/warning.png" alt="">
            <span>举报</span>
          </div>
          <div class="to" @click="copyLink">
            <img src="@/assets/img/icon/components/share/copy.png" alt="">
            <span>复制口令</span>
          </div>
          <div class="to" @click="toggleCollect">
            <img v-if="isCollect" src="@/assets/img/icon/components/share/collect-yellow.png" alt="">
            <img v-else src="@/assets/img/icon/components/share/collect.png" alt="">
            <span>收藏</span>
          </div>
          <div class="to" @click="$no">
            <img src="@/assets/img/icon/components/share/comeon.webp" alt="">
            <span>一起看</span>
          </div>
          <div class="to" @click="copyLink">
            <img src="@/assets/img/icon/components/share/link.png" alt="">
            <span>复制链接</span>
          </div>
          <div class="to" @click="$no">
            <img src="@/assets/img/icon/components/share/dou.webp" alt="">
            <span>帮上热门</span>
          </div>
          <template v-if="isShowMore">
            <div class="to" @click="closeShare($emit('showShareDuoshan'))">
              <img src="@/assets/img/icon/components/video/duoshan.png" alt="">
              <span>多闪</span>
            </div>
            <div class="to" @click="$no">
              <img src="@/assets/img/icon/components/video/totoutiao.webp" alt="">
              <span>今日头条</span>
            </div>
          </template>
          <template v-else>
            <div class="to" @click="$no">
              <img src="@/assets/img/icon/components/share/share.png" alt="">
              <span>更多分享</span>
            </div>
          </template>
          <div class="to" @click="closeShare($emit('dislike'))">
            <img src="@/assets/img/icon/components/share/dislike.png" alt="">
            <span>不感兴趣</span>
          </div>
          <div class="to" @click="$no">
            <img src="@/assets/img/icon/components/share/bizhi.webp" alt="">
            <span>动态壁纸</span>
          </div>
          <div class="to" @click="closeShare($emit('showDouyinCode'))">
            <img src="@/assets/img/icon/components/share/code.png" alt="">
            <span>抖音码</span>
          </div>
        </template>
      </div>
      <div class="friends">
        <div class="item" v-for="item in friends.all">
          <img class="left" v-lazy="$imgPreview(item.avatar)" alt="">
          <div class="right">
            <span>{{ item.name }}</span>
            <b-button size="small" :type="item.shared?'dark':'primary'"
                      @click="item.shared = true">
              {{ item.shared ? '已' : '' }}分享
            </b-button>
          </div>
        </div>
        <div class="more" @click="closeShare($nav('/message/share-to-friend'))">
          <img class="left" src="../../../assets/img/icon/components/video/more-dark.png">
          <span>更多朋友</span>
        </div>
      </div>
    </div>
  </from-bottom-dialog>
</template>

<script lang="jsx">
import {mapState} from "vuex";
import FromBottomDialog from "../../../components/dialog/FromBottomDialog";
import LoadingCircle from "./LoadingCircle";
// import DouyinCode from "./DouyinCode";

export default {
  name: "Share",
  components: {
    FromBottomDialog,
    LoadingCircle,
    // DouyinCode,
    sssss: {
      render() {
        return <span>1231</span>
      }
    }
  },
  props: {
    modelValue: false,
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
      default: true
    },
  },
  computed: {
    ...mapState(['friends']),
  },
  watch: {
    modelValue(newVal) {
      if (!newVal) {
        this.loading = {
          weChat: false,
          weChatZone: false,
        }
        this.progress = 0
        this.isShowMore = false
      }
    }
  },
  data() {
    return {
      isCollect: false,
      isShowMore: true,
      loading: {
        weChat: false,
        weChatZone: false,
      },
      text: {
        weChat: '微信',
        weChatZone: '朋友圈'
      },
      progress: 0
    }
  },
  methods: {
    displayText(type) {
      if (this.loading[type]) {
        return this.progress !== 100 ? '下载中' : this.text[type]
      }
      return this.text[type]
    },
    async copyLink() {
      this.closeShare()
      this.$showLoading()
      await this.$sleep(500)
      this.$hideLoading()
      this.$notice('复制成功')
    },
    toggleCollect() {
      this.closeShare()
      if (this.isCollect) {
        this.$notice('取消收藏成功')
      } else {
        this.$notice('收藏成功')
      }
      this.isCollect = !this.isCollect
    },
    toggleCall(item) {
      item.select = !item.select
    },
    closeShare(type) {
      if (this.progress === 100) {
        this.$notice('未实现分享跳转到其他App')
      } else {
        this.loading[type] = true
        let interval = setInterval(() => {
          if (this.progress < 100) {
            this.progress++
          } else {
            clearInterval(interval)
            this.loading[type] = false
            // this.$emit("update:modelValue", false)
            this.$notice('未实现分享跳转到其他App')
          }
        }, 10)
      }
    },
    closeShare1() {
      this.$emit("update:modelValue", false)
    }
  }
}
</script>

<style lang="less" scoped>
@import "@/assets/less/index";

.video-share {
  height: 60vh;
  width: 100%;
  border-radius: 1rem 1rem 0 0;
  color: white;
  box-sizing: border-box;

  .friends {
    border-radius: 1rem;
    margin: 1rem;
    padding: 0 @padding-page;
    @avatar-width: 3.8rem;
    font-size: 1.4rem;
    background: white;

    @item-width: 5.5rem;

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
        margin-right: 1.5rem;
      }

      .right {
        font-size: 1.4rem;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;

        img {
          height: 2rem;
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
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        margin-left: 1rem;
        margin-right: 2rem;
      }
    }
  }

  @icon-width: 5.8rem;

  .shares {
    @space-width: 1.5rem;

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
        padding: 1.2rem;
        border-radius: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 100%;
          //height: 100%;
        }
      }

      span {
        margin-top: .7rem;
        color: black;
        font-size: 1rem;
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
      border: @border-width solid #514F56;
      border-radius: 50%;
    }

  }


}

</style>
