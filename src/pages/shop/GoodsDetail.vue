<template>
  <div class="goods-detail base-page">
    <header>
      <Icon
          @click="$back()"
          icon="material-symbols-light:arrow-back-ios-new"/>
      <div class="right">
        <div class="search">
          <Icon icon="jam:search"/>
          <div class="placeholder">多功能电源插座</div>
        </div>
        <div class="option">
          <Icon icon="jam:search"/>
          <Icon icon="mynaui:star"/>
          <Icon icon="ph:share-fat"/>
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
      <div class="info">
        <div class="price-wrap">
          <div class="price">
            <span class="symbol">￥</span>
            <span class="int">8</span>
            <span class="decimal">.8</span>
          </div>
          <div class="discount">
            <span class="text">热销款券后</span>
            <div class="price">
              <span class="symbol">￥</span>
              <span class="int">5</span>
              <span class="decimal">.9</span>
            </div>
          </div>
        </div>
        <div class="name">{{ state.detail.name }}</div>
        <div class="num">已售20/100</div>
      </div>
      <div class="card desc-wrapper">
        <div class="item">
          <div class="label">保障</div>
          <div class="desc">
            假一赔四·运费险·极速退款
            <Icon class="right-arrow" icon="mingcute:right-line"/>
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
            <Icon class="right-arrow" icon="mingcute:right-line"/>
          </div>
        </div>
        <div class="item">
          <div class="label">活动</div>
          <div class="desc">
            <div class="ellipsis">优惠新人券 立减4新人券立减4新人券立减4新人券 立减4新人券 立减4</div>
            <Icon class="right-arrow" icon="mingcute:right-line"/>
          </div>
        </div>
        <div class="item">
          <div class="label">物流</div>
          <div class="desc" style="display:block;">
            <div style="display:flex;gap: 5rem">
              <span>发货 四川成都</span>
              <span style="color: #dedede">|</span>
              <span>免运费</span>
            </div>
            <div>48小时内发货</div>
          </div>
        </div>
      </div>

      <div class="card comments">
        <header>
          <span>商品评论(507)</span>
          <Icon class="right-arrow" icon="mingcute:right-line"/>
        </header>
        <div class="tags">
          <div class="tag">物美价廉 <span class="gray">29</span></div>
          <div class="tag">物流很好 <span class="gray">26</span></div>
          <div class="tag">推荐 <span class="gray">18</span></div>
          <div class="tag">商用服务好 <span class="gray">15</span></div>
        </div>
        <div class="comment" v-for="i in 2">
          <header>
            <img src="https://cdn.seovx.com/ha/?mom=302" alt="" class="avatar">
            <span class="gray">花***栽</span>
          </header>
          <div class="w">
            <div class="left">
              <div class="d">
                东西不错质量也很好 性价比很高 良心商家就冲这图必须给好评
              </div>
              <div class="gray">
                china款/超值【买る双+送2双】共5双
              </div>
            </div>
            <img src="https://cdn.seovx.com/ha/?mom=302" alt="" class="avatar">
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
  color: black;
  font-size: 14rem;

  & > header {
    background: white;
    height: @header-height;
    display: flex;
    align-items: center;
    padding: 0 10rem;

    svg {
      font-size: 22rem;
      background: rgba(176, 176, 176, 0.5);
      padding: 5rem;
      border-radius: 50%;
    }

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

        svg {
          padding: 0;
          background: unset;
        }
      }

      .option {
        margin-left: 20rem;
        display: flex;
        align-items: center;
        gap: 20rem;
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
      bottom: 30rem;
      color: white;
    }
  }

  .content {
    //background: rgb(247, 247, 249);
    background: #f5f5f5;
    padding: 8rem;
    border-radius: 16rem 16rem 0 0;
    transform: translateY(-20rem);

    .info {
      padding: 0 8rem;
      margin-bottom: 20rem;

      .price-wrap {
        margin-bottom: 20rem;
        display: flex;
        align-items: flex-end;

        .price {
          color: red;
          font-weight: bold;

          .symbol {
            font-size: 16rem;
          }

          .int {
            font-size: 26rem;
          }

          .decimal {
            letter-spacing: 2px;
            font-size: 20rem;
          }
        }

        .discount {
          margin-left: 10rem;
          color: rgb(248, 38, 74);
          display: flex;
          align-items: flex-end;
          padding: 2rem 15rem;
          padding-bottom: 4rem;
          background: rgb(255 167 183 / 25%);
          border-radius: 20rem;

          .text {
            font-size: 13rem;
          }

          .price {
            margin-top: -6rem;
            transform: translateY(4rem);
          }
        }

      }

      .name {
        color: black;
        font-size: 16rem;
        margin-bottom: 8rem;
        overflow: hidden;
        font-weight: bold;
        letter-spacing: 1rem;
      }

      .num {
        font-size: 12rem;
        color: gray;
      }
    }

    .card {
      margin: 5rem;
      margin-bottom: 10rem;
      background: white;
      border-radius: 10rem;
      padding: 10rem 15rem;
    }

    @c: #a2a2a2;

    .gray {
      color: @c;
    }

    .right-arrow {
      font-size: 18rem;
      color: @c;
    }

    .desc-wrapper {
      .item {
        display: flex;
        align-items: flex-start;
        padding: 5rem 0;
        margin-bottom: 22rem;

        .label {
          color: @c;
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

        .ellipsis {
          max-width: 70vw;
          overflow: hidden; //超出的文本隐藏
          text-overflow: ellipsis; //溢出用省略号显示
          white-space: nowrap; //溢出不换行
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
          color: @c;

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
    }

    .comments {
      & > header {
        margin-bottom: 20rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
          font-size: 18rem;
          font-weight: bold;
        }
      }

      .tags {
        display: flex;
        gap: 10rem;
        margin-bottom: 20rem;

        .tag {
          display: flex;
          gap: 5rem;
          background: rgb(255 167 183 / 15%);
          padding: 6rem 8rem;
          border-radius: 8rem;
          font-size: 11rem;
        }
      }

      .comment {
        margin-bottom: 20rem;
        & > header {
          margin-bottom: 10rem;
          display: flex;
          align-items: center;
          gap: 5rem;

          img {
            border-radius: 50%;
            width: 25rem;
            height: 25rem;
          }
        }

        .w {
          display: flex;
          gap: 10rem;

          .d{
            margin-bottom: 10rem;
          }

          img {
            border-radius: 8rem;
            height: 50rem;
            width: 50rem;
          }
        }
      }
    }
  }
}

</style>