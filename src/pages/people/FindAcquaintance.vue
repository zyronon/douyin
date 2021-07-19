<template>
  <div class="FindAcquaintance">
    <div class="header">
      <img src="../../assets/img/icon/back.png" alt="" class="back" @click="back">
      <Indicator
          style="width: 50%;"
          tabStyleWidth="40%"
          :tabTexts="['熟人列表','发现熟人']"
          v-model:active-index="currentSlideItemIndex">
      </Indicator>
      <img src="../../assets/img/icon/back.png" alt="" class="option" @click="moreOptionDialog = true">
    </div>
    <SlideRowList v-model:active-index="currentSlideItemIndex" :style="{opacity : moreOptionDialog ? .5:1}">
      <SlideItem class="tab1">
        <Search placeholder="搜索用户备注或名字" class="mr20p ml20p mt10p"></Search>
        <div class="title">我的好友（互相关注）</div>
        <People v-for="item in list " :people="item"></People>
        <NoMore></NoMore>
      </SlideItem>
      <SlideItem class="tab2">
        <div class="mr2r ml2r mt1r">
          <Search v-if="!isShowText" :is-show-text="false" @click="isShowText = true">
            <img src="../../assets/img/icon/close.svg" style="width: 1rem;" @click.stop="t">
          </Search>
          <Search v-else v-model="searchKey" :is-show-text="true" @notice="search" @clear="isSearch = false"></Search>
        </div>
        <div class="no-search" v-if="!isShowText">
          <div class="look-address-list" @click="findAddressListDialog = true">
            <img class="left" src="../../assets/img/icon/head-image.jpeg" alt="">
            <div class="right">
              <div class="notice">
                <div class="text1">查看通讯录朋友</div>
                <div class="text2">看看谁在抖音</div>
              </div>
              <img src="../../assets/img/icon/back.png" alt="">
            </div>
          </div>
          <div class="line"></div>
          <div class="title">
            朋友推荐
            <img src="../../assets/img/icon/close.svg" style="width: 1rem;">
          </div>
          <People v-for="item in list " :people="item"></People>
        </div>
        <div class="is-search" v-else>
          <div class="tooltip" v-if="searchKey && !isSearch">
            <img src="../../assets/img/icon/close.svg" style="width: 1rem;">
            搜索用户名字/抖音号：<span class="searchKey">{{ searchKey }}</span>
          </div>
          <People v-if="isSearch" v-for="item in list " :people="item"></People>
        </div>
      </SlideItem>
    </SlideRowList>


    <transition name="fade">
      <div v-if="findAddressListDialog" class="dialog find-address-list" @click="findAddressListDialog = false">
        <div class="content" @click.stop="null">
          <div class="body">
            <div>
              <img src="../../assets/img/icon/head-image.jpeg" alt="">
            </div>
            <span class="title">发现通讯录好友</span>
            <span class="desc">
            授权通讯录，看看哪些好友在使用抖音。具体使用场景及撤回授权方式详见
            <span class="link" @click="$nav('/service-protocol')">《隐私政策》</span>
        </span>
          </div>
          <div class="footer">
            <div @click="findAddressListDialog = false">暂时不要</div>
            <div @click="$nav('/address-list')">发现好友</div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <Mask v-if="moreOptionDialog" @click="moreOptionDialog = false"></Mask>
    </transition>
    <transition name="from-bottom">
      <div class="more-option-dialog" v-if="moreOptionDialog">
        <div class="row">
          <span>站外好友口令</span>
        </div>
        <div class="row">
          <span>扫一扫加好友</span>
        </div>
        <div class="row" style="border-bottom: none;">
          <span>面对面加好友</span>
        </div>
        <div class="space"></div>
        <div class="row" @click="moreOptionDialog = false">
          取消
        </div>
      </div>
    </transition>

  </div>
</template>
<script>
import People from './components/People'
import Search from '../../components/Search'
import Indicator from '../../components/Indicator'

export default {
  name: "FindAcquaintance",
  components: {
    People,
    Search,
    Indicator
  },
  data() {
    return {
      findAddressListDialog: false,
      moreOptionDialog: false,
      indicatorFixed: false,
      isShowText: false,
      isSearch: false,
      searchKey: '',

      currentSlideItemIndex: 1,
      list: [
        {
          type: 1,
        },
        {
          type: 2,
        },
        {
          type: 3,
        },
        {
          type: 4,
        },
        {
          type: 5,
        },
      ],
    }
  },
  computed: {},
  mounted() {
  },
  methods: {
    t() {
      console.log('scan')
    },
    async search() {
      this.$showLoading()
      await this.$sleep(500)
      this.$hideLoading()
      this.isSearch = true
    },
    back() {
      if (this.isShowText) {
        this.isShowText = false
      } else {
        this.$back()
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/index";

.from-bottom-enter-active,
.from-bottom-leave-active {
  transition: transform 0.2s ease;
}

.from-bottom-enter-from,
.from-bottom-leave-to {
  transform: translate3d(0, 50vh, 0);
}

.FindAcquaintance {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  color: white;

  .header {
    height: 6rem;
    font-size: 1.4rem;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid $line-color;

    img {
      height: 2rem;
    }
  }

  .tab1 {
    .title {
      margin-left: 2rem;
      margin-top: 2rem;
      color: $second-text-color;
      font-size: 1.2rem;
    }
  }

  .tab2 {
    .title {
      display: flex;
      align-items: center;
      margin-top: 2rem;
      margin-bottom: 1rem;
      color: $second-text-color;
      font-size: 1.2rem;

      img {
        width: 1rem;
      }
    }

    .no-search {
      padding: 2rem;

      .look-address-list {
        margin: 0 2rem 2rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
          background: $second-btn-color;
          border-radius: 50%;
          padding: 1rem;
          width: 2.4rem;
          margin-right: 1.8rem;
        }

        .right {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;

          img {
            height: 2rem;
          }

          .notice {

            .text1 {
              font-size: 1.6rem;
              margin-bottom: .5rem;
            }

            .text2 {
              font-size: 1.2rem;
              color: $second-text-color;
            }
          }
        }
      }
    }

    .is-search {
      padding: 0 2rem 2rem 2rem;

      .tooltip {
        margin-top: 2rem;
        display: flex;
        align-items: center;
        color: $second-text-color;

        img {
          margin-right: 1rem;
          width: 1.5rem;
        }

        .searchKey {
          color: yellow;
        }
      }
    }
  }

  .dialog {
    z-index: 10;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #000000bb;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;

    .content {
      background: white;
      width: 70%;
      border-radius: 2px;
      box-sizing: border-box;
      font-size: 1.5rem;

      .body {
        padding: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
          height: 6rem;
          margin-bottom: 2rem;
        }

        .title {
          font-size: 1.6rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        .desc {
          font-size: 1rem;
          color: gray;
        }

        .link {
          color: rgb(18, 100, 149);
        }
      }

      $footer-border-color: #eaeaf1;

      .footer {
        margin-top: 2rem;
        display: flex;
        height: 4rem;
        border-top: 1px solid $footer-border-color;
        font-size: 1.4rem;

        div {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 49%;
          text-align: center;
          border-right: 1px solid $footer-border-color;
          opacity: .5;

          &:nth-last-child(1) {
            border-right: none;
            opacity: 1;
          }
        }
      }

    }

  }

  .more-option-dialog {
    z-index: 9;
    position: fixed;
    width: 100%;
    max-height: 50vh;
    overflow: auto;
    bottom: 0;
    background: white;
    box-sizing: border-box;
    border-radius: 5px 5px 0 0;

    .space {
      height: 1rem;
      background: whitesmoke;
    }

    .row {
      font-size: 1.6rem;
      color: black;
      background: white;
      box-sizing: border-box;
      padding: 1.8rem;
      width: 100%;
      //border-bottom: 1px solid ghostwhite;
      border-bottom: 1px solid gainsboro;
      text-align: center;

    }
  }
}
</style>
