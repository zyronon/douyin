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
          <div class="tab" :class="{active:slideIndex === 0}">抖音热榜</div>
          <div class="tab" :class="{active:slideIndex === 1}">直播榜</div>
          <div class="tab" :class="{active:slideIndex === 2}">音乐榜</div>
          <div class="tab" :class="{active:slideIndex === 3}">品牌榜</div>
        </div>
        <SlideRowList v-model:active-index="slideIndex">
          <SlideItem>
            <div class="slide1">
              <div class="l-row" v-for="(item,index) in 50">
                <div class="rank-wrapper">
                  <img v-if="index === 0" src="../../assets/img/icon/rank1.webp" alt="" class="rank">
                  <img v-else-if="index === 1" src="../../assets/img/icon/rank2.webp" alt="" class="rank">
                  <img v-else-if="index === 2" src="../../assets/img/icon/rank3.webp" alt="" class="rank">
                  <div v-else class="rank">{{ index + 1 }}</div>
                </div>
                <div class="right">
                  <div class="center">
                    <div class="desc">下撒打发手动阀手动阀压下撒打发手动阀手动阀压顶发撒打发打法顶发撒打发打法</div>
                    <div class="type">热</div>
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
              width: calc(100vw - 13rem);
              box-sizing: border-box;
              //padding: 0 1rem;
              //flex: 1;
              display: flex;
              font-size: 1.2rem;


              .desc {
                color: white;
                font-size: 1.4rem;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
              }
              .type{
                border-radius: .2rem;
                padding: .2rem;
                background: red;
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
