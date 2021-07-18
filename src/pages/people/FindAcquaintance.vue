<template>
  <div class="FindAcquaintance">
    <div class="header">
      <img src="../../assets/img/icon/back.png" alt="" class="back" @click="$back">
      <Indicator
          style="width: 50%;"
          tabStyleWidth="40%"
          :tabTexts="['熟人列表','发现熟人']"
          v-model:active-index="currentSlideItemIndex">
      </Indicator>
      <img src="../../assets/img/icon/back.png" alt="" class="option" @click="moreOptionDialog = true">
    </div>
    <SlideRowList v-model:active-index="currentSlideItemIndex" :style="{opacity : moreOptionDialog ? .5:1}">
      <SlideItem>
        <Search placeholder="搜索用户备注或名字" class="mr20p ml20p mt10p"></Search>
        <div class="title">我的好友（互相关注）</div>
        <People v-for="item in list " :people="item"></People>
        <NoMore></NoMore>
      </SlideItem>
      <SlideItem>
        <Search :key="1"></Search>
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
      moreOptionDialog: true,
      indicatorFixed: false,
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
  methods: {}
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

  .title {
    margin-left: 2rem;
    margin-top: 2rem;
    color: $second-text-color;
    font-size: 1.2rem;
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
