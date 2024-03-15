<template>
  <div id="Shop">
    <div class="wrapper">
      <div class="search">
        <div class="search-input">
          <Icon icon="tabler:search"/>
          <div class="placeholder">50元话费充值</div>
          <Icon color="gray" icon="lucide:camera"/>
          <div class="search-notice">搜索</div>
        </div>
        <div class="more">
          <Icon icon="ep:shopping-cart"/>
        </div>
      </div>
    </div>
    <Scroll class="Scroll"
            fixedHeight="100"
            @fixed="e=>state.fixed = e"
            @pulldown="loadData">
      <div class="wrapper">
        <div class="card">
          <div class="options">
            <div class="option" @click="$no">
              <Icon icon="lets-icons:order-light"/>
              <div>我的订单</div>
            </div>
            <div class="option" @click="$no">
              <Icon icon="material-symbols-light:charging-station-outline"/>
              <div>手机充值</div>
            </div>
            <div class="option" @click="$no">
              <Icon icon="lucide:message-square-quote"/>
              <div>购物消息</div>
            </div>
            <div class="option" @click="$no">
              <Icon icon="fluent:location-16-regular"/>
              <div>小时达</div>
            </div>
            <div class="option" @click="$no">
              <Icon icon="ri:refund-2-fill"/>
              <div>退款/售后</div>
            </div>
            <div class="option" @click="$no">
              <Icon icon="icon-park-outline:clothes-turtleneck"/>
              <div>潮流服饰</div>
            </div>
          </div>
        </div>
        <div class="card" style="margin-bottom: 5rem;">
          <div class="baiyibutie">
            <div class="item">
              <img src="@/assets/img/icon/shop/baiyibutie.png" alt="">
              <span>38节补贴</span>
            </div>
            <div class="item">
              <img src="@/assets/img/icon/shop/1.webp" alt="">
              <span class="price">
              <span class="m">￥</span>
              <span>470</span>
            </span>
            </div>
            <div class="item">
              <img src="@/assets/img/icon/shop/2.webp" alt="">
              <span class="price">
              <span class="m">￥</span>
              <span>699</span>
            </span>
            </div>
            <div class="item">
              <img src="@/assets/img/icon/shop/3.png" alt="">
              <span class="price">
              <span class="m">￥</span>
              <span>8.8</span>
            </span>
            </div>
            <div class="item">
              <img src="@/assets/img/icon/shop/4.jpg" alt="">
              <span class="price">
              <span class="m">￥</span>
              <span>2.99</span>
            </span>
            </div>
          </div>
        </div>
      </div>

      <div v-masonry class="goods-list"
           :class="{fixed:state.fixed}"
           transition-duration="0s"
           item-selector=".goods">
        <div v-masonry-tile class="goods"
             @click="nav('/shop/detail')"
             v-for="(item, index) in  state.list">
          <div class="item">
            <img class="poster" :src="Utils.$imgPreview(item.cover)"/>
            <div class="bottom">
              <div class="desc">
                {{ item.name }}
              </div>
              <div class="discounts" v-if="item.discount">{{ item.discount }}</div>
              <div class="info">
                <div class="price">
                  ￥
                  <div class="big">{{ item.price }}</div>
                </div>
                <div class="num">已售{{ item.sold }}件</div>
              </div>
              <div class="low" v-if="item.isLowPrice">
                近30天低价
              </div>
            </div>
          </div>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script setup lang="jsx">

import {onMounted, reactive} from "vue";
import {useNav} from "@/utils/hooks/useNav";
import api from "@/api";
import SlideList from "@/pages/home/slide/SlideList.vue";
import Utils, {$no} from "@/utils";
import Scroll from "@/components/Scroll.vue";
import goods from "@/assets/data/goods";

const nav = useNav()
const state = reactive({
  list: goods.list,
  listEl: null,
  fixed: false
})

function loadData() {
  console.log('loadData')
  for (let i = 1; i < 12; i++) {
    let temp = {
      src: new URL(`../../../assets/img/poster/${i}.jpg`, import.meta.url).href,
      author: new URL(`../../../assets/img/avatar.png`, import.meta.url).href,
    }
    // state.list.push(temp)
  }
}

onMounted(() => {
  for (let i = 1; i < 12; i++) {
    let temp = {
      src: new URL(`../../../assets/img/poster/${i}.jpg`, import.meta.url).href,
      author: new URL(`../../../assets/img/avatar.png`, import.meta.url).href,
    }
    // state.list.push(temp)
  }
})
</script>

<style scoped lang="less">
@import "@/assets/less/index";

@fColor: #f1f1f1;

#Shop {
  font-size: 14rem;
  position: relative;
  background: @fColor;
  background: #f1f1f1;
  padding: 10rem 5rem;
  color: black;

  .wrapper {
    padding: 0 5rem;
  }

  .search {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    height: 36rem;
    box-sizing: border-box;
    margin-bottom: 10rem;

    svg {
      font-size: 22rem;
    }

    .search-input {
      border: 1rem solid rgb(140, 48, 74);
      border-radius: 8rem;
      height: 100%;
      padding: 0 10rem;
      padding-right: 3rem;
      flex: 1;
      gap: 10rem;
      display: flex;
      align-items: center;

      .placeholder {
        flex: 1;
      }

      img {
        margin-right: 10rem;
      }

      .search-notice {
        background: rgb(242, 62, 92);
        padding: 0 10rem;
        height: 85%;
        border-radius: 6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
      }
    }

    .more {
      margin-left: 10rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      font-size: 12rem;
    }
  }

  .card {
    background: white;
    padding: 10rem 15rem;
    margin-bottom: 10rem;
    border-radius: 8rem;
  }

  .options {
    display: flex;
    overflow-x: auto;
    box-sizing: border-box;

    .option {
      width: 17vw;
      flex-shrink: 0;
      font-size: 13rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      svg {
        font-size: 30rem;
        margin-bottom: 3rem;
      }
    }
  }

  .baiyibutie {
    display: flex;

    .item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 25%;
      font-size: 12rem;
      color: gray;

      img {
        width: 80%;
      }

      .price {
        color: red;
        font-size: 16rem;
        font-weight: bold;

        .m {
          font-size: 10rem;
        }
      }
    }
  }

  .Scroll {
    position: relative;
    z-index: 2;
    height: calc(100vh - @footer-height * 2) !important;
  }

  .fixed {
    background: @fColor;
  }

  @p: 5rem;

  .goods-list {
    padding-bottom: 20rem;
  }

  .goods {
    width: 50%;
    box-sizing: border-box;
    padding: 5rem;

    .item {
      border-radius: 8rem;
      overflow: hidden;
      background: white;

      img {
        width: 100%;
      }

      .bottom {
        padding: 10rem;

        .desc {
          color: black;
          font-size: 16rem;
          margin-bottom: 8rem;
          @lh: 18rem;
          line-height: @lh;
          height: @lh * 2;
          overflow: hidden;
        }

        .discounts {
          display: inline-block;
          @c: rgb(199, 89, 106);
          border: 1rem solid @c;
          padding: 0 4rem;
          color: @c;
          font-size: 12rem;
          margin-bottom: 4rem;
        }

        .info {
          display: flex;
          align-items: flex-end;

          .price {
            color: rgb(248, 38, 74);
            display: flex;
            align-items: flex-end;
            font-size: 14rem;
            margin-right: 5rem;

            .big {
              font-size: 22rem;
              font-weight: bold;
              transform: translateY(2rem);
            }
          }

          .num {
            color: darkgray;
            font-size: 12rem;
          }
        }

        .low {
          margin-top: 2rem;
          color: rgb(230, 153, 92);
        }
      }
    }
  }
}
</style>
