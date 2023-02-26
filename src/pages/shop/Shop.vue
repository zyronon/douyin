<template>
  <div id="Shop">
    <div class="bg">
      <div class="top"></div>
      <div class="bottom"></div>
    </div>
    <div class="search">
      <div class="search-input">
        <img src="@/assets/img/icon/search-gray.png" alt="">
        <div class="placeholder">50元话费充值</div>
        <img src="@/assets/img/icon/scan-gray.png" alt="">
        <div class="search-notice">搜索</div>
      </div>
      <div class="more">
        <img src="@/assets/img/icon/category-gray.png" alt="">
        <span>更多</span>
      </div>
    </div>
    <Scroll class="Scroll"
            fixedHeight="100"
            @fixed="e=>state.fixed = e"
            @pulldown="loadData">
      <div class="options">
        <div class="option">
          <img src="@/assets/img/icon/scan-gray.png" alt="">
          <span>我的订单 快捷查单</span>
        </div>
        <div class="option">
          <img src="@/assets/img/icon/scan-gray.png" alt="">
          <span>购物车 空空如也</span>
        </div>
      </div>
      <div class="navs">
        <div class="wrapper">
          <div class="nav" v-for="i in 20">推荐</div>
        </div>
      </div>
      <div v-masonry class="goods-list"
           :class="{fixed:state.fixed}"
           transition-duration="0s"
           item-selector=".goods">
        <div v-masonry-tile class="goods"
             @click="nav('/shop/detail')"
             v-for="(item, index) in  state.list">
          <div class="card">
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

<script setup>
import {onMounted, reactive} from "vue";
import Utils from "@/utils";
import Scroll from "@/components/Scroll.vue";
import goods from "@/assets/data/goods";
import {useNav} from "@/utils/hooks/useNav";

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
  color: white;
  padding-top: @header-height;
  position: relative;
  background: @fColor;

  .bg {
    top: 0;
    position: absolute;
    width: 100vw;
    height: 30vh;
    //background: red;

    @th: 70%;
    @eColor: rgb(32, 28, 58);

    .top {
      height: @th;
      background: linear-gradient(to bottom, rgb(56, 30, 77), @eColor);
    }

    .bottom {
      height: 100% - @th;
      background: red;
      background: linear-gradient(to bottom, @eColor, @fColor);
    }
  }

  .search {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    height: @header-height;
    padding: 9rem 20rem;
    box-sizing: border-box;

    img {
      width: 20rem;
    }

    .search-input {
      border: 3rem solid rgb(140, 48, 74);
      border-radius: 8rem;
      height: 100%;
      padding: 0 10rem;
      flex: 1;
      display: flex;
      align-items: center;

      .placeholder {
        flex: 1;
      }

      img {
        margin-right: 10rem;
      }

      .search-notice {
        color: rgb(242, 62, 92);
      }
    }

    .more {
      margin-left: 20rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      font-size: 12rem;
    }
  }

  .options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20rem;
    height: 40rem;
    padding: 4rem 20rem;
    box-sizing: border-box;

    img {
      width: 20rem;
      margin-right: 10rem;
    }

    .option {
      font-size: 13rem;
      flex: 1;
      display: flex;
      background: rgb(63, 58, 78);
      padding: 6rem 8rem;
      border-radius: 6rem;
    }
  }

  .navs {
    overflow: auto;
    padding: 0 10rem;

    .wrapper {
      display: flex;
      //flex-wrap: wrap;
    }

    .nav {
      margin: 10rem;
      word-break: keep-all;
      //border-bottom: 2rem solid white;
    }
  }

  .Scroll {
    position: relative;
    z-index: 2;
    //height: calc(100vh - @header-height) !important;
    height: calc(100vh - @header-height * 2 - @footer-height) !important;
  }

  .fixed {
    background: @fColor;
  }

  @p: 5rem;

  .goods-list {
    padding: @p;
  }

  .goods {
    width: calc(50% - @p);
    box-sizing: border-box;
    padding: 5rem;

    .card {
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