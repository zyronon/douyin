<template>
  <div class="Search">
    <div class="header">
      <back mode="light" @click="$back" class="mr1r"></back>
      <BSearch placeholder="搜索用户名字/抖音号"
               :isShowText="true"
               notice="gray"
      >
        <img class="scan" src="../../assets/img/icon/scan-gray.png" @click.stop="$nav('/scan')">
      </BSearch>
    </div>
    <div class="content">
      <div class="history">
        <div class="row" v-for="(item,index) in lHistory">
          <div class="left">
            <img src="../../assets/img/icon/home/time-white.png" alt="">
            <span> {{ item }}</span>
          </div>
          <back img="close" mode="gray" @click="history.splice(index,1)" scale=".7"></back>
        </div>
        <div v-if="history.length>2" class="history-expand" @click="toggle">
          {{ isExpand ? '清除全部搜索记录' : '展开全部' }}
        </div>
      </div>
      <div class="guess">
        <div class="title">
          <div class="left">猜你想搜</div>
          <div class="right">
            <img class="scan" src="../../assets/img/icon/home/refresh-gray.png" @click.stop="refresh">
            <span>换一换</span>
          </div>
        </div>
        <div class="keys">
          <div class="key" v-for="(item,index ) in randomGuess">{{ item }}</div>
        </div>
      </div>
      <div class="rank-list">
        <div class="indicator">
          <div class="tab" :class="{active:slideIndex === 0}" @click="slideIndex = 0">抖音热榜</div>
          <div class="tab" :class="{active:slideIndex === 1}" @click="slideIndex = 1">直播榜</div>
          <div class="tab" :class="{active:slideIndex === 2}" @click="slideIndex = 2">音乐榜</div>
          <div class="tab" :class="{active:slideIndex === 3}" @click="slideIndex = 3">品牌榜</div>
        </div>
        <SlideRowList v-model:active-index="slideIndex">
          <SlideItem>
            <div class="slide1">
              <div class="l-row" v-for="(item,index) in hotRankList">
                <div class="rank-wrapper">
                  <img v-if="index === 0" src="../../assets/img/icon/rank1.webp" alt="" class="rank">
                  <img v-else-if="index === 1" src="../../assets/img/icon/rank2.webp" alt="" class="rank">
                  <img v-else-if="index === 2" src="../../assets/img/icon/rank3.webp" alt="" class="rank">
                  <div v-else class="rank">{{ index + 1 }}</div>
                </div>
                <div class="right">
                  <div class="center">
                    <div class="desc">{{ item.name }}</div>
                    <div v-if="item.type !== -1" class="type" :class="item.type === 0 ?'hot':'new'">
                      {{ item.type === 0 ? '热' : '新' }}
                    </div>
                  </div>
                  <div class="hot-count">999w</div>
                </div>
              </div>
              <div class="more">查看完整热点榜 ></div>
            </div>
          </SlideItem>
          <SlideItem>
            <div class="slide1">
              <div class="l-row" v-for="(item,index) in 15">
                <div class="rank-wrapper">
                  <img v-if="index === 0" src="../../assets/img/icon/rank1.webp" alt="" class="rank">
                  <img v-else-if="index === 1" src="../../assets/img/icon/rank2.webp" alt="" class="rank">
                  <img v-else-if="index === 2" src="../../assets/img/icon/rank3.webp" alt="" class="rank">
                  <div v-else class="rank">{{ index + 1 }}</div>
                </div>
                <div class="center">
                  <span>下撒打发手动阀手动阀压顶发撒打发打法</span>
                  <div class="type">热</div>
                </div>
                <div class="hot-count">999w</div>
              </div>
            </div>
          </SlideItem>
        </SlideRowList>
      </div>
    </div>
  </div>
</template>
<script>
import Search from "../../components/Search";
import _ from 'lodash'

export default {
  name: "SearchPage",
  components: {
    'BSearch': Search
  },
  data() {
    return {
      isShowText: false,
      isExpand: false,
      history: [
        '历史记录1',
        '历史记录2',
        '历史记录3',
        '历史记录4',
        '历史记录5',
        '历史记录6',
        '历史记录7',
        '历史记录8',
        '历史记录9',
        '历史记录10',
      ],
      guess: [
        '少年透明人',
        '花呗分批次接入征信',
        '新娘婚礼上跪求悔婚',
        '当你想换iPhone13时',
        'Ling OS灵犀系统',
        '桑塔纳2022款',
        '透明人',
        '恒大集团凌晨发公告',
        '2022款日产GT-R',
        '四川双一流大学名单',
        '一公司放假通知走红',
        '成都新全优教育倒闭',
        '当代女生社交现状',
        '恒大集团凌晨发公告',
      ],
      hotRankList: [
        {name: '国内手机厂商最大的软肋就是 android 系统！', type: 0},
        {name: '大家的官网订单现在什么状态', type: -1},
        {name: '库克不愧是供应链管理大师， A15 一鱼三吃', type: -1},
        {name: '找到了 iOS 被怀疑淘宝窃听的可能原因', type: 1},
        {name: 'rebase 还是 merge？', type: -1},
        {name: '十一出游西安，西安的大佬们能给些建议吗？', type: 0},
        {name: '领克 01，燃油还是 phev？', type: 1},
        {name: '为什么要抢购新手机呢？', type: -1},
        {name: '拼多多官方处理问题跟京东真的没法比', type: -1},
        {name: '百度输入法 VS 搜狗输入法', type: -1},
        {name: '关于 ios 上 app 检测代理', type: 0},
        {name: 'iPadmini6 到货以后，要不要换路由器', type: 1},
        {name: '现在有推荐的同步盘么？', type: -1},
        {name: '大哥们， mac 电池鼓包你们都咋修的。。', type: -1},
        {name: '发现一个特别赞的同步盘方案 Resilio Sync', type:-1},
        {name: '得鼻炎了, 说下症状和应对吧', type: 1},
        {name: '打翻了一瓶矿泉水在 MacBook Pro 上，赶紧用鼠标关机了，等多久可以尝试开机？', type: 0},
        {name: '筋膜枪哪个牌子好啊？', type: -1},
        {name: '最近在学理财小白基础知识，然后请教大家办哪个证券账户比较好呀', type: -1},
        {name: '有没有长期使用 sidecar 功能的 V 友，这个东西长期的稳定性如何？', type: 0},
        {name: '犹豫是否要年年焕新', type: -1},
        {name: '请问如何在国内给 AppStore HK/TW 区充值.', type: 0},
        {name: '最近感觉一个妹子不错，不过我比她大 5 岁', type: 1},
        {name: '12mini 1 月 20 号购入，现在电池健康 92%，正常现象？', type:-1},
        {name: '现在新 iphone12/128 啥价格比较合适啊？', type: -1},
        {name: 'iOS 15 不改地区就能看到全球所有交通卡', type: -1},
        {name: '求推荐拼车/打车软件', type: 1},
        {name: '如何比较方便的杀死 nohup 起的进程及其所有子进程?', type: 0},
        {name: '换了新工作，好像又掉坑里了。', type: 0},
        {name: '有没有这样一款记账软件？', type: 1},
        {name: '个人第二款 Flutter 应用今天终于上架了： 小声音', type: -1},
        {name: 'apple store 明天早上还会放货吗？', type: 0},
        {name: '有办法在 root 后的安卓设备上面运行 OpenWRT 吗？', type: 1},
      ],
      randomGuess: [],
      slideIndex: 0,
      list1: [],
      list2: [],
    }
  },
  computed: {
    lHistory() {
      if (this.isExpand) {
        if (this.history.length > 10) return this.history.slice(0, 10)
        return this.history
      } else {
        if (this.history.length > 2) return this.history.slice(0, 2)
        return this.history
      }
    }
  },
  created() {
    this.history = this.history.reverse()
    this.refresh()
  },
  methods: {
    refresh() {
      this.randomGuess = _.sampleSize(this.guess, 6)
    },
    toggle() {
      if (this.isExpand) {
        this.$showSimpleConfirmDialog('是否清空历史记录？', () => {
          this.history = []
        }, null, '确定', '取消')
      } else {
        this.isExpand = true
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "../../assets/scss/index";

.Search {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 1.4rem;

  .header {
    height: 6rem;
    font-size: 1.4rem;
    padding: 0 @padding-page;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid @line-color;
    position: fixed;
    width: 100vw;
    box-sizing: border-box;
    top: 0;

    .search-ctn {
      flex: 1;
    }

    .scan {
      transform: scale(2);
      height: 1rem;
      width: 1rem;
    }
  }

  .content {
    padding-top: 6rem;

    .history {
      .history-expand {
        text-align: center;
        padding: 1rem;
        color: @second-text-color;
      }
    }

    .guess {
      padding: 0 @padding-page;

      .title {
        font-size: 1.4rem;
        padding: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .right {
          color: @second-text-color;
          display: flex;
          align-items: center;

          img {
            margin-right: .5rem;
            width: 1.3rem;
            height: 1.3rem;
          }
        }
      }

      .keys {
        font-size: 1.6rem;
        display: flex;
        flex-wrap: wrap;

        .key {
          box-sizing: border-box;
          padding: .8rem 0;
          width: 49%;
        }
      }
    }

    .rank-list {
      .indicator {
        padding: 1.5rem;
        display: flex;
        align-items: center;
        font-size: 1.4rem;

        .tab {
          color: @second-text-color;
          margin-right: 2rem;

          &.active {
            transform: scale(1.2);
            color: white;
          }

          &:nth-child(1) {
            &.active {
              font-weight: bold;
              background: linear-gradient(to right, rgb(255, 165, 71), rgb(218, 77, 115));
              -webkit-background-clip: text;
              color: transparent;
            }
          }
        }
      }

      .slide1 {
        margin: 0 @padding-page 5rem @padding-page;
        background: linear-gradient(to right, rgb(32, 29, 36), rgb(50, 29, 38));
        padding: @padding-page;
        border-radius: 1rem;

        .l-row {
          font-size: 1.4rem;
          display: flex;
          margin-bottom: 1.5rem;
          align-items: center;
          color: @second-text-color;

          .rank-wrapper {
            .rank {
              width: 1.8rem;
              height: 1.8rem;
              line-height: 1.8rem;
              text-align: center;
              margin-right: 1.5rem;
            }
          }

          .right {
            flex: 1;
            display: flex;
            justify-content: space-between;

            .center {
              width: calc(100vw - 14rem);
              box-sizing: border-box;
              //padding: 0 1rem;
              //flex: 1;
              display: flex;
              font-size: 1.2rem;
              color: white;


              .desc {
                max-width: 85%;
                font-size: 1.4rem;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
              }

              .type {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 1.8rem;
                width: 1.8rem;
                line-height: 1.8rem;
                margin-left: 1rem;
                border-radius: .2rem;
                background: @primary-btn-color;
              }
            }

            .hot-count {
              font-size: 1.2rem;
            }
          }
        }

        .more {
          font-size: 1.2rem;
          padding: 1rem 1rem 0 1rem;
          text-align: center;
          color: yellow;
        }
      }
    }
  }
}
</style>
