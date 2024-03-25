<template>
  <div class="goods-detail base-page"
       ref="page"
  >
    <header ref="header">
      <Icon
          @click="$back()"
          icon="material-symbols-light:arrow-back-ios-new"/>
      <div class="option" @click="nav('/home/search')">
        <Icon icon="jam:search"/>
      </div>
    </header>

    <div class="slide-imgs">
      <SlideHorizontal v-model:index="state.index">
        <SlideItem v-for="item in state.detail.imgs">
          <img :src="item" alt="">
        </SlideItem>
      </SlideHorizontal>
      <div class="index">
        {{ state.index + 1 }}/{{ state.detail.imgs.length }}
      </div>
      <div class="indicator-bar">
        <div class="indicator"
             :class="[i <= state.index+1 && 'active']"
             v-for="i in state.detail.imgs.length"></div>
      </div>
    </div>

    <div class="content">
      <div class="shop">
        <header>
          <img src="https://cdn.seovx.com/?mom=302" alt="" class="avatar">
          <div class="right">
            <div class="name">店铺名</div>
            <div class="r">关注</div>
          </div>
        </header>
        <div class="desc">
          店铺名店铺名店铺名店铺名店铺名店铺名店铺名店铺名店铺名店铺名店铺名店铺名店铺名店铺名店铺名店铺名店铺名店铺名店铺名店铺名店铺名店铺名店铺名店铺名店铺名店铺名店铺名店铺名店铺名店铺名店铺名店铺名店铺名店铺名
        </div>
        <div class="date">03:11</div>
      </div>

      <div class="card comments">
        <header>
          <span class="l">评论 507</span>
          <div class="r">
            <span>查看全部</span>
            <Icon class="arrow" icon="mingcute:right-line"/>
          </div>
        </header>
        <div class="comment" v-for="i in 2">
          <img src="https://cdn.seovx.com/?mom=302" alt="" class="avatar">
          <span>
               花***栽：东西不错质量也很好 性价比很高 良心商家就冲这图必须给好评
            </span>
        </div>
      </div>
    </div>

    <div class="toolbar">
      <div class="input-wrap">
        说点什么...
      </div>
      <div class="options">
        <div class="option">
          <Icon icon="solar:heart-linear"/>
          <div class="text">678</div>
        </div>
        <div class="option">
          <Icon icon="mage:message-dots-round" class="icon"/>
          <div class="text">178</div>
        </div>
        <div class="option">
          <Icon icon="mage:star"/>
          <div class="text">82</div>
        </div>
        <div class="option">
          <Icon icon="ph:share-fat-light"/>
          <div class="text">23</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SlideHorizontal from "@/components/slide/SlideHorizontal.vue";
import SlideItem from "@/components/slide/SlideItem.vue";
import {reactive, ref} from "vue";
import goods from "@/assets/data/goods";
import {useNav} from "@/utils/hooks/useNav";
import Utils from "@/utils";
import {Icon} from "@iconify/vue";

let activeIndexs = ref([])
const nav = useNav()
const props = defineProps({
  id: {
    type: String,
    default: () => ''
  }
})
let page = ref()
let header = ref()
let headerShadow = ref()

function scroll() {
  let d = page.value.scrollTop / 200
  // console.log('s', d, header.value)
  if (d > 0) {
    header.value.style.opacity = 1 - d
  } else {
    header.value.style.opacity = 1 - d
  }
  headerShadow.value.style.opacity = d
}

const state = reactive({
  detail: goods.list[1],
  index: 0,
  list: goods.list,
  listEl: null,
  fixed: false
})

function toggle(i) {
  let rIndex = activeIndexs.value.findIndex(v => v === i)
  if (rIndex > -1) {
    activeIndexs.value.splice(rIndex, 1)
  } else {
    activeIndexs.value.push(i)
  }
}
</script>

<style scoped lang="less">
@import "@/assets/less/index.less";

.goods-detail {
  background: var(--color-message);
  color: white;
  font-size: 14rem;
  @c: #a2a2a2;
  @c2: #c0c0c0;
  @red: rgb(248, 38, 74);

  & > header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    z-index: 9;
    display: flex;
    justify-content: space-between;
    padding: 15rem;
    box-sizing: border-box;

    svg {
      font-size: 20rem;
      background: rgba(176, 176, 176, 0.4);
      padding: 5rem;
      color: white;
      border-radius: 50%;
    }
  }

  .slide-imgs {
    position: relative;
    height: 55vh;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      touch-action: none;
    }

    .indicator-bar {
      position: absolute;
      bottom: 5rem;
      left: 3vw;
      width: 94vw;
      display: flex;
      gap: 5rem;

      .indicator {
        background: rgba(162, 160, 160, 0.5);
        height: 3rem;
        flex: 1;
        border-radius: 2rem;
      }

      .active {
        background: rgba(250, 246, 246, 0.58);
      }
    }

    .index {
      font-size: 12rem;
      position: absolute;
      padding: 3rem 10rem;
      border-radius: 15rem;
      background: rgba(91, 89, 89, 0.5);
      right: 10rem;
      bottom: 30rem;
      color: white;
    }
  }

  .card {
    margin-top: 15rem;
    border-radius: 10rem;
    padding: 10rem 15rem;
    background: black;
  }

  .arrow {
    font-size: 16rem;
  }

  .content {
    padding: 15rem;
    padding-bottom: 10vh;
    border-radius: 16rem 16rem 0 0;

    .comments {
      & > header {
        margin-bottom: 16rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .l {
          font-size: 15rem;
        }

        .r {
          color: gray;
          font-size: 12rem;
          display: flex;
          align-items: center;
        }
      }

      .comment {
        margin-bottom: 16rem;
        display: flex;
        align-items: center;
        gap: 5rem;

        span {
          display: inline-block;
          white-space: nowrap;
          flex: 1;
          word-break: break-all;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        img {
          border-radius: 50%;
          width: 20rem;
          height: 20rem;
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    .shop {
      & > header {
        display: flex;
        align-items: center;
        gap: 10rem;

        img {
          width: 36rem;
          height: 36rem;
          border-radius: 50%;
        }

        .right {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .name {
            font-size: 16rem;
          }

          .r {
            border-radius: 4rem;
            padding: 6rem 16rem;
            background: var(--primary-btn-color);
            font-size: 12rem;
            color: white;
          }
        }
      }

      .desc {
        margin-top: 10rem;
      }

      .date {
        font-size: 12rem;
        margin-top: 10rem;
        color: gray;
      }

    }
  }

  .toolbar {
    position: fixed;
    bottom: 0;
    width: 100vw;
    left: 0;
    background: var(--color-message);
    border-top: 1px solid rgba(white, .1);
    display: flex;
    align-items: center;
    padding: 8rem 10rem;
    padding-right: 0;
    box-sizing: border-box;
    gap: 6rem;

    .input-wrap {
      width: 110rem;
      padding-left: 15rem;
      height: 34rem;
      border-radius: 30rem;
      background: var(--second-btn-color-tran);
      color: gray;
      display: flex;
      align-items: center;
    }

    .options {
      flex: 1;
      display: flex;

      .option {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-size: 13rem;
        color: white;

        svg {
          font-size: 24rem;
        }
      }
    }
  }
}

</style>