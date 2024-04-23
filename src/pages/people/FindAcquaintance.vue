<template>
  <div class="FindAcquaintance" id="FindAcquaintance">
    <div class="header">
      <dy-back mode="light" @click="back"></dy-back>
      <Indicator
        style="width: 50%"
        tabStyleWidth="40%"
        :tabTexts="['发现朋友', '熟人列表']"
        v-model:active-index="data.currentSlideItemIndex"
      >
      </Indicator>
      <img
        src="../../assets/img/icon/menu-gray.png"
        alt=""
        class="option"
        @click="data.moreOptionDialog = true"
      />
    </div>
    <SlideHorizontal v-model:index="data.currentSlideItemIndex">
      <SlideItem class="tab1" style="overflow: auto">
        <div class="mr2r ml2r mt1r">
          <Search
            v-if="!data.isShowRightText"
            placeholder="搜索用户名字/抖音号"
            :is-show-right-text="false"
            @click="data.isShowRightText = true"
          >
            <img
              src="../../assets/img/icon/scan-gray.png"
              style="width: 10rem; transform: scale(1.5)"
              @click.stop="nav('/scan')"
            />
          </Search>
          <Search
            v-else
            v-model="data.searchKey"
            :is-show-right-text="true"
            @notice="search"
            @clear="data.isSearch = false"
          ></Search>
        </div>
        <div class="no-search" v-if="!data.isShowRightText">
          <div class="look-address-list" @click="data.findAddressListDialog = true">
            <img class="left" src="../../assets/img/icon/people/address-book.png" alt="" />
            <div class="right">
              <div class="notice">
                <div class="text1">查看通讯录朋友</div>
                <div class="text2">看看有谁在抖音</div>
              </div>
              <dy-back direction="right"></dy-back>
            </div>
          </div>
          <div class="line"></div>
          <div class="title">
            朋友推荐
            <img
              src="../../assets/img/icon/about-gray.png"
              style="width: 10rem; margin-left: 2rem"
            />
          </div>
          <People
            :key="i"
            v-for="(item, i) in store.friends.all"
            :people="item"
            mode="recommend"
          ></People>
        </div>
        <div class="is-search" v-else>
          <div class="tooltip" v-if="data.searchKey && !data.isSearch">
            <img src="../../assets/img/icon/close.svg" style="width: 10rem" />
            搜索用户名字/抖音号：<span class="searchKey">{{ data.searchKey }}</span>
          </div>
          <!--          TODO -->
          <template v-if="data.isSearch">
            <People
              :key="i"
              v-for="(item, i) in store.friends.all"
              :people="item"
              mode="recommend"
            ></People>
          </template>
        </div>
      </SlideItem>
      <SlideItem class="tab2" style="overflow: auto">
        <Search placeholder="搜索用户备注或名字" class="mr20p ml20p mt10p"></Search>
        <div class="title">{{ store.friends.all.length }} 位朋友</div>
        <People
          :key="i"
          v-for="(item, i) in store.friends.all"
          :people="item"
          mode="friend"
        ></People>
        <NoMore class="mb5r" />
      </SlideItem>
    </SlideHorizontal>

    <transition name="fade">
      <BaseMask v-if="maskDialog" @click="maskDialog = false" />
    </transition>

    <transition name="fade">
      <div
        v-if="data.findAddressListDialog"
        class="find-address-list-dialog"
        @click="data.findAddressListDialog = false"
      >
        <div class="body">
          <div>
            <img src="../../assets/img/icon/head-image.jpeg" alt="" />
          </div>
          <span class="title">发现通讯录好友</span>
          <span class="desc">
            <span>授权通讯录，看看哪些好友在使用抖音。具体使用场景及撤回授权方式详见</span>
            <span class="link" @click="nav('/service-protocol', { type: '“抖音”用户服务协议' })"
              >《隐私政策》</span
            >
          </span>
        </div>
        <div class="footer">
          <div @click="data.findAddressListDialog = false">暂时不要</div>
          <div @click="nav('/address-list')">发现好友</div>
        </div>
      </div>
    </transition>

    <from-bottom-dialog
      page-id="FindAcquaintance"
      v-model="data.moreOptionDialog"
      :show-heng-gang="false"
      height="210rem"
      mode="white"
    >
      <div class="more-option-dialog">
        <div class="row" @click="handleClick">
          <span>站外好友口令</span>
        </div>
        <div class="row" @click="nav('/scan')">
          <span>扫一扫加好友</span>
        </div>
        <div class="row" style="border-bottom: none" @click="nav('/face-to-face')">
          <span>面对面加好友</span>
        </div>
        <div class="space"></div>
        <div class="row" @click="data.moreOptionDialog = false">取消</div>
      </div>
    </from-bottom-dialog>

    <transition name="fade">
      <div class="out-web-img-account-dialog" v-if="data.outWebImgAccountDialog">
        <img src="../../assets/img/icon/head-image.jpeg" alt="" class="img-account" />
        <img
          src="../../assets/img/icon/close-white.png"
          alt=""
          class="close"
          @click="data.outWebImgAccountDialog = false"
        />
        <div class="desc">
          <div>这是你的图片口令</div>
          <div>你可以通过此口令添加站外好友</div>
        </div>
        <div class="notice">
          <img src="../../assets/img/icon/close.svg" alt="" />
          <span>图片口令已保存到相册</span>
        </div>
        <div class="btn wechat" @click="data.outWebImgAccountDialog = false">
          <img src="../../assets/img/icon/close.svg" alt="" />
          <span>发给微信好友</span>
        </div>
        <div class="btn qq" @click="data.outWebImgAccountDialog = false">
          <img src="../../assets/img/icon/close.svg" alt="" />
          <span>发给QQ好友</span>
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import People from './components/People.vue'
import Search from '../../components/Search.vue'
import Indicator from '../../components/slide/Indicator.vue'
import FromBottomDialog from '../../components/dialog/FromBottomDialog.vue'
import { useBaseStore } from '@/store/pinia'
import { computed, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useNav } from '@/utils/hooks/useNav'
import { _hideLoading, _showLoading, _sleep } from '@/utils'

defineOptions({
  name: 'FindAcquaintance'
})

const router = useRouter()
const nav = useNav()
const store = useBaseStore()
const data = reactive({
  findAddressListDialog: false,
  moreOptionDialog: false,
  outWebImgAccountDialog: false,
  indicatorFixed: false,
  isShowRightText: false,
  isSearch: false,
  searchKey: '',

  currentSlideItemIndex: 0,
  list: [
    {
      type: 1
    },
    {
      type: 2
    },
    {
      type: 3
    },
    {
      type: 4
    },
    {
      type: 5
    }
  ]
})

onMounted(() => {})

const maskDialog = computed({
  get() {
    return data.findAddressListDialog || data.outWebImgAccountDialog
  },
  set() {
    data.findAddressListDialog = data.outWebImgAccountDialog = false
  }
})

async function search() {
  _showLoading()
  await _sleep(500)
  _hideLoading()
  data.isSearch = true
}

function back() {
  if (data.isShowRightText) {
    data.isShowRightText = false
  } else {
    router.back()
  }
}

function handleClick() {
  data.outWebImgAccountDialog = true
  data.moreOptionDialog = false
}
</script>

<style scoped lang="less">
@import '../../assets/less/index';

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
  font-size: 14rem;

  .header {
    height: 60rem;
    font-size: 14rem;
    padding: 0 20rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--line-color);

    img {
      height: 20rem;
    }
  }

  .tab2 {
    box-sizing: border-box;
    padding: 20rem;

    .title {
      margin-top: var(--page-padding);
      margin-bottom: 10rem;
      color: var(--second-text-color);
      font-size: 12rem;
    }
  }

  .tab1 {
    .title {
      display: flex;
      align-items: center;
      margin-top: 20rem;
      margin-bottom: 10rem;
      color: var(--second-text-color);
      font-size: 12rem;

      img {
        width: 10rem;
      }
    }

    .no-search {
      padding: 20rem;

      .look-address-list {
        margin: 0 0 20rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
          background: var(--second-btn-color-tran);
          border-radius: 50%;
          padding: 12rem;
          width: 22rem;
          margin-right: 15rem;
        }

        .right {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;

          img {
            width: 14rem;
          }

          .notice {
            .text1 {
              font-size: 14rem;
              margin-bottom: 5rem;
            }

            .text2 {
              font-size: 12rem;
              color: var(--second-text-color);
            }
          }
        }
      }
    }

    .is-search {
      padding: 0 20rem 20rem 20rem;

      .tooltip {
        font-size: 12rem;
        margin-top: 20rem;
        display: flex;
        align-items: center;
        color: var(--second-text-color);

        img {
          margin-right: 10rem;
          width: 15rem;
        }

        .searchKey {
          color: yellow;
        }
      }
    }
  }

  .find-address-list-dialog {
    z-index: 4;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 70vw;
    color: black;
    background: white;
    box-sizing: border-box;
    border-radius: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    .body {
      padding: 20rem;
      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        height: 60rem;
        margin-bottom: 20rem;
      }

      .title {
        font-size: 16rem;
        font-weight: bold;
        margin-bottom: 10rem;
      }

      .desc {
        font-size: 10rem;
        color: gray;
      }

      .link {
        color: rgb(18, 100, 149);
      }
    }

    @footer-border-color: #eaeaf1;

    .footer {
      width: 100%;
      display: flex;
      height: 40rem;
      border-top: 1px solid @footer-border-color;
      font-size: 14rem;

      div {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 49%;
        text-align: center;
        border-right: 1px solid @footer-border-color;
        opacity: 0.5;

        &:nth-last-child(1) {
          border-right: none;
          opacity: 1;
        }
      }
    }
  }

  .more-option-dialog {
    font-size: 14rem;

    .space {
      height: 10rem;
      background: whitesmoke;
    }

    .row {
      height: 50rem;
      color: black;
      background: white;
      box-sizing: border-box;
      width: 100%;
      //border-bottom: 1px solid ghostwhite;
      border-bottom: 1px solid gainsboro;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .out-web-img-account-dialog {
    z-index: 4;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 80%;
    color: black;
    background: white;
    box-sizing: border-box;
    border-radius: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20rem;

    .img-account {
    }

    .close {
      top: 10rem;
      right: 10rem;
      position: absolute;
      background: var(--second-btn-color-tran);
      padding: 4rem;
      width: 10rem;
      border-radius: 50%;
    }

    .desc {
      margin-top: 20rem;
      text-align: center;
    }

    .notice {
      margin-top: 20rem;
      display: flex;
      align-items: center;
      color: var(--second-text-color);

      img {
        margin-right: 10rem;
        width: 10rem;
      }
    }

    .btn {
      width: 100%;
      height: 40rem;
      border-radius: 3rem;
      margin-top: 20rem;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;

      &:nth-last-child(1) {
        margin-top: 10rem;
      }

      &.wechat {
        background: rgb(62, 174, 56);
      }

      &.qq {
        background: rgb(24, 183, 238);
      }

      img {
        margin-right: 10rem;
        width: 10rem;
      }
    }
  }
}
</style>
