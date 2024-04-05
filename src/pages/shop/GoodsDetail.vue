<template>
  <div class="goods-detail base-page" ref="page" @scroll="scroll">
    <header ref="header">
      <div class="top">
        <Icon @click="router.back()" icon="material-symbols-light:arrow-back-ios-new" />
        <div class="right">
          <div class="search">
            <Icon icon="jam:search" />
            <div class="placeholder">多功能电源插座</div>
          </div>
          <div class="option">
            <Icon icon="jam:search" />
            <Icon icon="mynaui:star" />
            <Icon icon="ph:share-fat" />
          </div>
        </div>
      </div>
    </header>
    <header class="shadow" ref="headerShadow">
      <div class="top">
        <Icon @click="router.back()" icon="material-symbols-light:arrow-back-ios-new" />
        <div class="right">
          <div class="search">
            <Icon icon="jam:search" />
            <div class="placeholder">多功能电源插座</div>
          </div>
          <div class="option">
            <Icon icon="mynaui:star" />
            <Icon icon="ph:share-fat" />
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="tab active">
          <div class="text">商品</div>
        </div>
        <div class="tab">
          <div class="text">评价</div>
        </div>
        <div class="tab">
          <div class="text">详情</div>
        </div>
        <div class="tab">
          <div class="text">推荐</div>
        </div>
      </div>
    </header>

    <div class="slide-imgs">
      <SlideHorizontal v-model:index="state.index">
        <SlideItem v-for="(item, i) in state.detail.imgs" :key="i">
          <img v-lazy="_checkImgUrl('goods/' + item)" alt="" />
        </SlideItem>
      </SlideHorizontal>
      <div class="index">{{ state.index + 1 }}/{{ state.detail.imgs.length }}</div>
    </div>
    <div class="content p">
      <div class="info">
        <div class="price-wrap">
          <div class="price">
            <span class="symbol">￥</span>
            <span class="int">{{ state.detail.price }}</span>
            <!--            <span class="decimal">.8</span>-->
          </div>
          <div class="discount">
            <span class="text">热销款券后</span>
            <div class="price">
              <span class="symbol">￥</span>
              <span class="int">{{ state.detail.real_price }}</span>
              <!--              <span class="decimal">.9</span>-->
            </div>
          </div>
        </div>
        <div class="name">{{ state.detail.name }}</div>
        <div class="num">已售{{ state.detail.sold }}</div>
      </div>

      <div class="card desc-wrapper">
        <div class="item">
          <div class="label">保障</div>
          <div class="desc">
            假一赔四·运费险·极速退款
            <Icon class="arrow" icon="mingcute:right-line" />
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
            <Icon class="arrow" icon="mingcute:right-line" />
          </div>
        </div>
        <div class="item">
          <div class="label">物流</div>
          <div class="desc" style="display: block">
            <div style="display: flex; gap: 5rem">
              <span>发货 四川成都</span>
              <span style="color: #dedede">|</span>
              <span>免运费</span>
            </div>
            <div class="flex space-between mb1r mt1r">
              <div>48小时内发货</div>
              <Icon class="arrow" icon="mingcute:right-line" />
            </div>
            <div class="flex space-between mt1r">
              <div class="gray">送至 四川省成都市</div>
              <Icon class="arrow" icon="mingcute:right-line" />
            </div>
          </div>
        </div>
        <div class="item mb0r">
          <div class="label">参数</div>
          <div class="desc">
            <div class="ellipsis">
              优惠新人券 立减4新人券立减4新人券立减4新人券 立减4新人券 立减4
            </div>
            <Icon class="arrow" icon="mingcute:right-line" />
          </div>
        </div>
      </div>

      <div class="card comments">
        <header>
          <span>商品评论(507)</span>
          <Icon class="arrow" icon="mingcute:right-line" />
        </header>
        <div class="tags">
          <div class="tag">物美价廉 <span class="gray">29</span></div>
          <div class="tag">物流很好 <span class="gray">26</span></div>
          <div class="tag">推荐 <span class="gray">18</span></div>
          <div class="tag">商用服务好 <span class="gray">15</span></div>
        </div>
        <div class="comment">
          <header>
            <img :src="_checkImgUrl('2S9bbgb-Sf2kIdSTxoeTw.png')" alt="" class="avatar" />
            <span class="gray">花***栽</span>
          </header>
          <div class="w">
            <div class="left">
              <div class="d">东西不错质量也很好 性价比很高 良心商家就冲这图必须给好评</div>
              <div class="c2">china款/超值【买る双+送2双】共5双</div>
            </div>
            <img :src="_checkImgUrl('NYEfuYS-LVZ620UYgQNAM.png')" alt="" class="avatar" />
          </div>
        </div>
        <div class="comment">
          <header>
            <img :src="_checkImgUrl('9Tx6cZkUOoHqPkbETUZ5Y.png')" alt="" class="avatar" />
            <span class="gray">花***栽</span>
          </header>
          <div class="w">
            <div class="left">
              <div class="d">东西不错质量也很好 性价比很高 良心商家就冲这图必须给好评</div>
              <div class="c2">china款/超值【买る双+送2双】共5双</div>
            </div>
            <img :src="_checkImgUrl('2b2rpive_RVzDrYgo-F9K.png')" alt="" class="avatar" />
          </div>
        </div>
      </div>

      <div class="card shop">
        <header>
          <img :src="_checkImgUrl('LJ-8p2jF3HydBD5j28PgQ.png')" alt="" class="avatar" />
          <div class="right">
            <div class="l">
              <div class="name">店铺名</div>
              <div class="tags">
                <div class="tag">金牌店铺</div>
                <div class="tag">好评过千</div>
                <div class="tag">销量超10万</div>
              </div>
              <div class="c2">店铺口碑4.90分</div>
            </div>
            <div class="r">进店</div>
          </div>
        </header>

        <div class="desc">
          <div class="grid">
            <div class="c2">商品质量</div>
            <div>商品评价一般</div>
          </div>
          <div class="line"></div>
          <div class="grid">
            <div class="c2">物流速度</div>
            <div>平均24小时发货</div>
          </div>
          <div class="line"></div>
          <div class="grid">
            <div class="c2">商品质量</div>
            <div>商品评价一般</div>
          </div>
        </div>

        <div class="recommend">
          <header>
            <span class="left">店铺推荐</span>
            <div class="right">
              <span class="gray">查看全部</span>
              <Icon class="arrow" icon="mingcute:right-line" />
            </div>
          </header>
          <div class="wrap">
            <div class="item">
              <img :src="_checkImgUrl('/goods/g6-0.jpg')" alt="" class="avatar" />
              <div class="name">小米电视6 65" OLED 65英寸</div>
              <div class="price">
                <span class="symbol">￥</span>
                <span class="int">8</span>
                <span class="decimal">.8</span>
              </div>
            </div>
            <div class="item">
              <img :src="_checkImgUrl('/goods/g1-0.jpg')" alt="" class="avatar" />
              <div class="name">红白撞色条纹软糯针织上衣女2022年秋季新款甜美减龄短款毛衣开衫</div>
              <div class="price">
                <span class="symbol">￥</span>
                <span class="int">8</span>
                <span class="decimal">.8</span>
              </div>
            </div>
            <div class="item">
              <img :src="_checkImgUrl('/goods/g2-0.webp')" alt="" class="avatar" />
              <div class="name">森马t恤男2023男士纯棉上衣白色情侣装凉感短袖打底衫纯色体恤潮</div>
              <div class="price">
                <span class="symbol">￥</span>
                <span class="int">8</span>
                <span class="decimal">.8</span>
              </div>
            </div>
            <div class="item">
              <img :src="_checkImgUrl('/goods/g3-0.jpg')" alt="" class="avatar" />
              <div class="name">ins潮牌长袖t恤男宽松纯色内搭上衣潮牌百搭秋冬季潮流帅气打底衫</div>
              <div class="price">
                <span class="symbol">￥</span>
                <span class="int">8</span>
                <span class="decimal">.8</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="img-list">
      <header>
        <div class="l"></div>
        <span class="gray">商品详情</span>
        <div class="r"></div>
      </header>

      <div class="imgs">
        <img
          v-lazy="_checkImgUrl('goods/' + i)"
          alt=""
          class="avatar"
          :key="j"
          v-for="(i, j) in state.detail.imgs"
        />
      </div>
    </div>

    <div class="p">
      <div class="card other-desc">
        <div
          class="item"
          :class="activeIndexs.includes(i) && 'active'"
          @click="toggle(i)"
          :key="i"
          v-for="(item, i) in 3"
        >
          <header>
            <div class="l">价格说明</div>
            <Icon class="arrow" icon="mingcute:right-line" />
          </header>
          <div class="text">
            价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明
          </div>
        </div>
      </div>

      <div class="other-recommend">
        <header>你可以还会喜欢</header>

        <ScrollList class="Scroll" :api="recommendedShop">
          <template v-slot="{ list }">
            <WaterfallList :list="list">
              <template v-slot="{ item }">
                <div class="goods" @click="nav('/shop/detail', {}, item)">
                  <div class="item">
                    <img class="poster" v-lazy="_checkImgUrl('goods/' + item.cover)" />
                    <div class="bottom">
                      <div class="desc">
                        {{ item.name }}
                      </div>
                      <div class="discounts" v-if="item.discount">
                        {{ item.discount }}
                      </div>
                      <div class="info">
                        <div class="price">
                          ￥
                          <div class="big">{{ item.price }}</div>
                        </div>
                        <div class="num">已售{{ item.sold }}件</div>
                      </div>
                      <div class="low" v-if="item.isLowPrice">近30天低价</div>
                    </div>
                  </div>
                </div>
              </template>
            </WaterfallList>
          </template>
        </ScrollList>
      </div>
    </div>

    <div class="toolbar">
      <div class="options">
        <div class="option">
          <Icon icon="iconoir:shop-window" />
          <div class="text">进店</div>
        </div>
        <div class="option">
          <Icon icon="icon-park-outline:message-emoji" />
          <div class="text">客服</div>
        </div>
        <div class="option">
          <Icon icon="icon-park-outline:shopping" />
          <div class="text">购物车</div>
        </div>
      </div>
      <div class="btns">
        <div class="btn">加入购物车</div>
        <div class="btn">领券购买</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SlideHorizontal from '@/components/slide/SlideHorizontal.vue'
import SlideItem from '@/components/slide/SlideItem.vue'
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { useNav } from '@/utils/hooks/useNav'
import { _checkImgUrl } from '@/utils'
import { useBaseStore } from '@/store/pinia'
import { recommendedShop } from '@/api/user'
import WaterfallList from '@/components/WaterfallList.vue'
import ScrollList from '@/components/ScrollList.vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'GoodsDetail'
})

const router = useRouter()
let activeIndexs = ref([])
const nav = useNav()
const store = useBaseStore()
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
  detail: {
    price: '',
    name: '',
    sold: '',
    real_price: '',
    imgs: []
  },
  index: 0,
  listEl: null,
  fixed: false
})

function toggle(i) {
  let rIndex = activeIndexs.value.findIndex((v) => v === i)
  if (rIndex > -1) {
    activeIndexs.value.splice(rIndex, 1)
  } else {
    activeIndexs.value.push(i)
  }
}

onMounted(() => {
  console.log('r', store.routeData.imgs)
  state.detail = store.routeData
})

onUnmounted(() => {
  console.log('onUnmounted')
})
</script>

<style scoped lang="less">
@import '@/assets/less/index.less';

.goods-detail {
  background: #f5f5f5;
  color: black;
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

    .top {
      height: var(--common-header-height);
      display: flex;
      align-items: center;
      padding: 0 10rem;

      svg {
        font-size: 22rem;
        background: rgba(176, 176, 176, 0.4);
        padding: 5rem;
        color: white;
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
          visibility: hidden;

          svg {
            padding: 0;
            background: unset;
          }
        }

        .option {
          margin-left: 15rem;
          display: flex;
          align-items: center;
          gap: 8rem;
        }
      }
    }

    .bottom {
      display: flex;
      display: none;

      .tab {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #646464;

        .text {
          padding: 10rem 0;
          padding-bottom: 15rem;
        }
      }

      .active {
        color: black;

        .text {
          border-bottom: 2.5rem solid black;
        }
      }
    }
  }

  .shadow {
    opacity: 0;
    background: white;

    svg {
      background: unset !important;
      color: black !important;
    }

    .search {
      svg {
        color: gray !important;
      }

      visibility: unset !important;
    }

    .bottom {
      display: flex;
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

  .p {
    padding: 8rem;
  }

  .gray {
    color: @c;
  }

  .c2 {
    color: @c2;
    font-size: 13rem;
  }

  .card {
    margin: 5rem;
    margin-bottom: 10rem;
    background: white;
    border-radius: 10rem;
    padding: 10rem 15rem;
  }

  .arrow {
    font-size: 18rem;
    color: @c;
  }

  .content {
    //background: rgb(247, 247, 249);
    background: #f5f5f5;
    padding-bottom: 0;
    border-radius: 16rem 16rem 0 0;
    transform: translateY(-20rem);

    .price {
      color: red;
      font-weight: 900;

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

    .info {
      padding: 0 8rem;
      margin-bottom: 20rem;

      .price-wrap {
        margin-bottom: 20rem;
        display: flex;
        align-items: flex-end;

        .discount {
          margin-left: 10rem;
          //color: rgb(248, 38, 74);
          color: white !important;
          display: flex;
          align-items: flex-end;
          padding: 2rem 15rem;
          padding-bottom: 4rem;
          //background: rgb(255 167 183 / 25%);
          background: rgb(248, 38, 74);
          border-radius: 20rem;

          .text {
            font-size: 13rem;
          }

          .price {
            color: white !important;
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
        font-weight: 900;
        letter-spacing: 1rem;
      }

      .num {
        font-size: 12rem;
        color: gray;
      }
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
          font-size: 16rem;
          font-weight: 900;
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

          .d {
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

    .shop {
      & > header {
        display: flex;
        align-items: center;
        gap: 10rem;

        img {
          width: 60rem;
          height: 60rem;
          border-radius: 50%;
        }

        .right {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .l {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 4rem;

            .name {
              font-size: 16rem;
              font-weight: 900;
            }

            .tags {
              display: flex;
              font-size: 10rem;
              font-weight: 900;
              gap: 10rem;

              .tag {
                padding: 2rem 3rem;
                background: rgb(253, 245, 243);
                color: rgb(217, 143, 80);
              }
            }

            .gray {
              font-size: 12rem;
            }
          }

          .r {
            border-radius: 4rem;
            padding: 5rem 14rem;
            font-weight: 900;
            background: var(--primary-btn-color);
            color: white;
          }
        }
      }

      .desc {
        margin-top: 16rem;
        display: flex;
        align-items: center;
        gap: 3rem;

        .grid {
          width: 33%;
          text-align: center;
          font-size: 13rem;
          font-weight: bold;

          .c2 {
            font-weight: normal;
            font-size: 12rem;
            margin-bottom: 6rem;
          }
        }

        .line {
          width: 1px;
          height: 30rem;
          background: lightgrey;
        }
      }

      .recommend {
        margin-top: 16rem;

        & > header {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .left {
            font-weight: 900;
          }

          .right {
            display: flex;
            align-items: center;
          }
        }

        .wrap {
          margin-top: 16rem;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          //grid-template-rows: repeat(3, 1fr);
          gap: 10rem;

          .item {
            img {
              border-radius: 12rem;
              object-fit: cover;
              height: 28vw;
              width: 100%;
            }

            .name {
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box; //作为弹性伸缩盒子模型显示。
              -webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
              -webkit-line-clamp: 2; //显示的行
            }

            .price {
              .symbol {
                font-size: 14rem;
              }

              .int {
                font-size: 18rem;
              }

              .decimal {
                letter-spacing: 2px;
                font-size: 14rem;
              }
            }
          }
        }
      }
    }
  }

  .img-list {
    background: #f5f5f5;

    & > header {
      font-size: 16rem;
      padding-bottom: 20rem;
      display: flex;
      justify-content: center;
      gap: 10rem;
      align-items: center;

      .l {
        width: 0;
        height: 0;
        border-right: 40px solid @c;
        border-top: 1px solid transparent;
        border-bottom: 1px solid transparent;
      }

      .r {
        .l;
        border-left: 40px solid @c;
        border-right: unset;
      }
    }

    .imgs {
      img {
        width: 100%;
        display: block;
      }
    }
  }

  .other-desc {
    .item {
      & > header {
        padding: 15rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .text {
        display: none;
      }

      &.active {
        .text {
          display: block;
        }
      }

      &:last-child {
        & > header {
          padding-bottom: 10rem;
        }
      }

      &:first-child {
        & > header {
          padding-top: 10rem;
        }
      }
    }
  }

  .other-recommend {
    margin-bottom: 60rem;

    & > header {
      padding: 15rem;
      font-weight: 900;
      font-size: 15rem;
    }

    @fColor: #f1f1f1;

    .fixed {
      background: @fColor;
    }

    @p: 5rem;

    .Scroll {
      padding: 5rem;
    }

    .goods {
      box-sizing: border-box;
      margin-bottom: 10rem;

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
                font-weight: 900;
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

  .toolbar {
    position: fixed;
    bottom: 0;
    width: 100vw;
    left: 0;
    background: white;
    display: flex;
    padding: 10rem;
    box-sizing: border-box;
    gap: 6rem;

    .options {
      flex: 1;
      display: flex;

      .option {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-size: 11rem;
        color: #646464;

        svg {
          font-size: 18rem;
        }

        &:first-child {
          svg {
            color: red;
          }
        }
      }
    }

    .btns {
      width: 60%;
      display: flex;
      font-size: 15rem;
      font-weight: bold;
      background: @red;
      color: white;
      border-radius: 12rem;
      overflow: hidden;
      height: 45rem;

      .btn {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;

        &:first-child {
          color: @red;
          background: rgb(255, 233, 237);
        }
      }
    }
  }
}
</style>
