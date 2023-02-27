<template>
  <div class="goods-detail">
    <header>
      <dy-back @click="history.back()"/>
      <div class="right">
        <div class="search">
          <img src="@/assets/img/icon/share-white-full.png" alt="">
          <div class="placeholder">多功能电源插座</div>
        </div>
        <div class="option">
          <img src="@/assets/img/icon/components/dark-close.png" alt="">
          <img src="@/assets/img/icon/components/dark-close.png" alt="">
        </div>
      </div>
    </header>
    <div class="imgs">
      <SlideHorizontal v-model:index="state.index">
        <SlideItem v-for="item in state.detail.imgs">
          <img :src="item" alt="">
        </SlideItem>
      </SlideHorizontal>
      <div class="index">{{ state.index + 1 }}/{{ state.detail.imgs.length }}</div>
    </div>
    <div class="content">
      <div class="card">
        <div class="price-item">
          <div class="price">
            ￥
            <div class="big">{{ state.detail.price }}</div>
          </div>
          <div class="right">
            <div class="discount">券后￥
              <div class="big">0.01</div>
              起
            </div>
            <div class="num">已售{{ state.detail.sold }}</div>
          </div>
        </div>
        <div class="title">{{ state.detail.name }}</div>
      </div>
      <div class="card">
        <div class="item">
          <div class="label">保障</div>
          <div class="desc">
            假一赔四·运费险·极速退款
            <dy-back direction="right" scale=".8"/>
          </div>
        </div>
        <div class="item">
          <div class="label">选择</div>
          <div class="desc">
            <div class="left">
              <div class="options">
                <div class="option">【10双】男土SP中筒袜</div>
                <div class="option">【5双】男土SP中筒袜</div>
                <div class="option">【5双】男土SP中筒袜</div>
              </div>
              <div class="all">
                <div class="bg"></div>
                <div class="count">共3种规格可选</div>
              </div>
            </div>
            <dy-back direction="right" scale=".8"/>
          </div>
        </div>
        <div class="item">
          <div class="label">活动</div>
          <div class="desc">
            <span>优惠</span>
            <span>新人券 立减4</span>
            <dy-back direction="right" scale=".8"/>
          </div>
        </div>
        <div class="item">
          <div class="label">物流</div>
          <div class="desc">
            48小时内从浙江省发货，包邮
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SlideHorizontal from "@/components/slide/SlideHorizontal.vue";
import SlideItem from "@/components/slide/SlideItem.vue";
import {reactive} from "vue";
import goods from "@/assets/data/goods";
import {useNav} from "@/utils/hooks/useNav";

const nav = useNav()
const props = defineProps({
  id: {
    type: String,
    default: () => ''
  }
})

const state = reactive({
  detail: goods.list[1],
  index: 2
})
</script>

<style scoped lang="less">
@import "@/assets/less/index.less";

.goods-detail {
  font-size: 14rem;

  header {
    background: white;
    height: @header-height;
    display: flex;
    align-items: center;
    padding: 0 20rem;

    .right {
      margin-left: 10rem;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .search {
        font-size: 12rem;
        border-radius: 20rem;
        padding: 5rem 10rem;
        flex: 1;
        background: rgb(243, 243, 243);
        display: flex;
        align-items: center;
        color: gray;

        img {
          margin-right: 10rem;
          height: 15rem;
        }
      }

      .option {
        margin-left: 10rem;
        display: flex;
        align-items: center;

        img {
          margin-left: 15rem;
        }
      }

      img {
        width: 20rem;
      }
    }

  }

  .imgs {
    position: relative;
    height: 30vh;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      touch-action: none;
    }

    .index {
      font-size: 12rem;
      position: absolute;
      padding: 3rem 10rem;
      border-radius: 15rem;
      background: rgba(91, 89, 89, 0.5);
      right: 10rem;
      bottom: 10rem;
      color: white;
    }
  }

  .content {
    //background: rgb(247, 247, 249);
    background: gray;
    padding: 5rem;

    .card {
      margin: 5rem;
      margin-bottom: 10rem;
      background: white;
      border-radius: 6rem;
      padding: 10rem 15rem;

      .item {
        display: flex;
        align-items: center;
        padding: 5rem 0;

        .label {
          color: gray;
        }

        .desc {
          padding-left: 15rem;
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .left {
            flex: 1;
            position: relative;
            display: flex;
            align-items: center;
            font-size: 10rem;
            overflow: hidden;
          }
        }

        .options {
          display: flex;
          overflow: hidden;
          flex-shrink: 0;

          .option {
            padding: 4rem 10rem;
            background: #f5f5f5;
            margin-right: 10rem;
            border-radius: 3rem;
          }
        }

        .all {
          right: 0;
          height: 100%;
          display: flex;
          align-items: center;
          position: absolute;

          .bg {
            width: 60rem;
            height: 100%;
            background: linear-gradient(to right, transparent, #f5f5f5);
          }

          .count {
            padding-left: 4rem;
            display: flex;
            align-items: center;
            height: 100%;
            background: white;
          }
        }
      }

      .price-item {
        display: flex;
        align-items: center;
        margin-bottom: 10rem;

        .big {
          font-size: 20rem;
          font-weight: bold;
          transform: translateY(2rem);
        }

        .price {
          color: rgb(248, 38, 74);
          display: flex;
          align-items: flex-end;
          font-size: 14rem;
          margin-right: 5rem;
        }

        .right {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 2rem;

          .discount {
            font-size: 10rem;
            color: rgb(248, 38, 74);
            display: flex;
            align-items: flex-end;
            padding: 2rem 15rem;
            padding-bottom: 4rem;
            background: rgb(255 167 183 / 25%);
            border-radius: 20rem;

            .big {
              line-height: 20rem;
              font-size: 18rem;
            }
          }

          .num {
            font-size: 12rem;
            color: darkgray;
          }
        }
      }

      .title {
        color: black;
        font-size: 16rem;
        margin-bottom: 8rem;
        @lh: 18rem;
        line-height: @lh;
        height: @lh * 2;
        overflow: hidden;
        font-weight: bold;
        letter-spacing: 1rem;
      }
    }
  }

}

</style>