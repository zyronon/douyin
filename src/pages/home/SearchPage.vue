<template>
  <div class="Search">
    <div class="header">
      <dy-back mode="light" @click="router.back" class="mr1r"></dy-back>
      <Search placeholder="搜索用户名字/抖音号" :isShowRightText="true" @notice="_no"></Search>
    </div>
    <div class="content">
      <div class="history">
        <div class="row" :key="index" v-for="(item, index) in lHistory">
          <div class="left">
            <img src="../../assets/img/icon/home/time-white.png" alt="" />
            <span> {{ item }}</span>
          </div>
          <dy-back
            img="close"
            mode="gray"
            @click="data.history.splice(index, 1)"
            scale=".7"
          ></dy-back>
        </div>
        <div v-if="data.history.length > 2" class="history-expand" @click="toggle">
          {{ data.isExpand ? '清除全部搜索记录' : '展开全部' }}
        </div>
      </div>
      <div class="guess">
        <div class="title">
          <div class="left">猜你想搜</div>
          <div class="right" @click.stop="refresh">
            <img class="scan" src="../../assets/img/icon/home/refresh-gray.png" />
            <span>换一换</span>
          </div>
        </div>
        <div class="keys">
          <div class="key" :key="index" v-for="(item, index) in data.randomGuess">
            <span class="desc">{{ item.name }}</span>
            <img
              v-if="item.type === 1"
              src="../../assets/img/icon/home/new.webp"
              alt=""
              class="type"
            />
          </div>
        </div>
      </div>
      <div class="rank-list">
        <div class="indicator">
          <div class="tab" :class="{ active: data.slideIndex === 0 }" @click="data.slideIndex = 0">
            抖音热榜
          </div>
          <div class="tab" :class="{ active: data.slideIndex === 1 }" @click="data.slideIndex = 1">
            直播榜
          </div>
          <div class="tab" :class="{ active: data.slideIndex === 2 }" @click="data.slideIndex = 2">
            音乐榜
          </div>
          <div class="tab" :class="{ active: data.slideIndex === 3 }" @click="data.slideIndex = 3">
            品牌榜
          </div>
        </div>
        <!--        TODO 滚动到下面的时候，应该禁止slide-move，因为每个slideitem的高度不一样，高的切到矮的，会闪屏-->
        <SlideHorizontal v-model:index="data.slideIndex" :style="slideListHeight">
          <SlideItem>
            <div class="slide0" ref="slide0">
              <div class="l-row">
                <div class="rank-wrapper">
                  <img src="../../assets/img/icon/home/to-top-yellow.png" class="rank" />
                </div>
                <div class="right">
                  <div class="center">
                    <div class="desc">专题：嘻嘻嘻哈哈瞄瞄嘻嘻嘻</div>
                  </div>
                </div>
              </div>
              <div class="l-row" :key="index" v-for="(item, index) in data.hotRankList">
                <div class="rank-wrapper">
                  <img
                    v-if="index === 0"
                    src="../../assets/img/icon/home/hot1.webp"
                    alt=""
                    class="rank"
                  />
                  <img
                    v-else-if="index === 1"
                    src="../../assets/img/icon/home/hot2.webp"
                    alt=""
                    class="rank"
                  />
                  <img
                    v-else-if="index === 2"
                    src="../../assets/img/icon/home/hot3.webp"
                    alt=""
                    class="rank"
                  />
                  <div v-else class="rank">{{ index + 1 }}</div>
                </div>
                <div class="right">
                  <div class="center">
                    <div class="desc">{{ item.name }}</div>
                    <img
                      v-if="item.type === 1"
                      src="../../assets/img/icon/home/new.webp"
                      alt=""
                      class="type"
                    />
                    <img
                      v-if="item.type === 0"
                      src="../../assets/img/icon/home/hot.webp"
                      alt=""
                      class="type"
                    />
                  </div>
                  <div class="count">999w</div>
                </div>
              </div>
              <div class="more" @click="_no">查看完整热点榜 ></div>
            </div>
          </SlideItem>
          <SlideItem>
            <div class="slide1" ref="slide1">
              <div class="l-row" :key="index" v-for="(item, index) in data.liveRankList">
                <div class="rank-wrapper">
                  <div class="rank" :class="{ top: index < 3 }">
                    {{ index + 1 }}
                  </div>
                </div>
                <div class="right">
                  <div class="center">
                    <div class="avatar-wrapper">
                      <img src="../../assets/img/icon/avatar/1.png" alt="" class="avatar" />
                    </div>
                    <div class="desc">{{ item.name }}</div>
                    <div v-if="item.type === 0" class="live-type">
                      <img class="type1" src="../../assets/img/icon/home/pk.webp" />
                      <span>PK</span>
                    </div>
                    <div v-if="item.type === 1" class="live-type">
                      <img class="type2" src="../../assets/img/icon/home/redpack.png" />
                      <span>红包</span>
                    </div>
                  </div>
                  <div class="count">999w人气</div>
                </div>
              </div>
              <div class="more" @click="_no">查看完整直播榜 ></div>
            </div>
          </SlideItem>
          <SlideItem>
            <div class="slide2" ref="slide2">
              <div
                class="l-row"
                :key="index"
                v-for="(item, index) in data.musicRankList"
                @click="nav('/home/music-rank-list')"
              >
                <div class="rank-wrapper">
                  <div class="rank" :class="{ top: index < 3 }">
                    {{ index + 1 }}
                  </div>
                </div>
                <div class="right">
                  <div class="center">
                    <div class="avatar-wrapper">
                      <img v-lazy="_checkImgUrl(item.cover)" alt="" class="avatar" />
                    </div>
                    <div class="desc">{{ item.name }}</div>
                  </div>
                  <div class="count">
                    <img src="../../assets/img/icon/home/hot-gray.png" alt="" />
                    <span>{{ _formatNumber(item.use_count) }}</span>
                  </div>
                </div>
              </div>
              <div class="more" @click="nav('/home/music-rank-list')">查看完整音乐榜 ></div>
            </div>
          </SlideItem>
          <SlideItem>
            <div class="slide3" ref="slide3">
              <div class="slide4-wrapper">
                <div class="brands">
                  <div
                    class="brand"
                    @click="toggleKey(key, i)"
                    :key="i"
                    :class="{ active: key === data.selectBrandKey }"
                    v-for="(key, i) in Object.keys(data.brandRankList)"
                  >
                    {{ key }}
                  </div>
                </div>
                <div class="l-row" :key="index" v-for="(item, index) in selectBrandList">
                  <div class="rank-wrapper">
                    <div class="rank" :class="{ top: index < 3 }">
                      {{ index + 1 }}
                    </div>
                  </div>
                  <div class="right">
                    <div class="center">
                      <div class="avatar-wrapper" :class="item.living ? 'living' : ''">
                        <div class="avatar-out-line"></div>
                        <img v-lazy="_checkImgUrl(item.logo)" alt="" class="avatar" />
                      </div>
                      <div class="desc">{{ item.name }}</div>
                    </div>
                    <div class="count">
                      <img src="../../assets/img/icon/home/hot-gray.png" alt="" />
                      <span>{{ _formatNumber(item.hot_count) }}</span>
                    </div>
                  </div>
                </div>
                <div class="more" @click="_no">查看完整品牌榜 ></div>
              </div>

              <SlideHorizontal v-model:index="data.adIndex" :autoplay="true" indicator>
                <SlideItem>
                  <div class="ad">AD1</div>
                </SlideItem>
                <SlideItem>
                  <div class="ad">AD2</div>
                </SlideItem>
                <SlideItem>
                  <div class="ad">AD3</div>
                </SlideItem>
                <SlideItem>
                  <div class="ad">AD4</div>
                </SlideItem>
                <SlideItem>
                  <div class="ad">AD5</div>
                </SlideItem>
                <SlideItem>
                  <div class="ad">AD6</div>
                </SlideItem>
                <SlideItem>
                  <div class="ad">AD7</div>
                </SlideItem>
                <SlideItem>
                  <div class="ad">AD8</div>
                </SlideItem>
              </SlideHorizontal>
            </div>
          </SlideItem>
        </SlideHorizontal>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Search from '../../components/Search.vue'
import Dom from '../../utils/dom'
import { computed, nextTick, onMounted, reactive, watch } from 'vue'
import { _checkImgUrl, _formatNumber, _no, _showSimpleConfirmDialog, sampleSize } from '@/utils'
import { useRouter } from 'vue-router'
import { useNav } from '@/utils/hooks/useNav'

defineOptions({
  name: 'SearchPage'
})

const router = useRouter()
const nav = useNav()
const data = reactive({
  isExpand: false,
  adIndex: 0,
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
    '历史记录10'
  ],
  guess: [
    { name: '少年透明人', type: -1 },
    { name: '花呗分批次接入征信', type: -1 },
    { name: '新娘婚礼上跪求悔婚', type: -1 },
    { name: '当你想换iPhone13时', type: -1 },
    { name: 'Ling OS灵犀系统', type: -1 },
    { name: '桑塔纳2022款', type: -1 },
    { name: '透明人', type: -1 },
    { name: '恒大集团凌晨发公告', type: 0 },
    { name: '2022款日产GT-R', type: 1 },
    { name: '四川双一流大学名单', type: -1 },
    { name: '一公司放假通知走红', type: -1 },
    { name: '成都新全优教育倒闭', type: -1 },
    { name: '当代女生社交现状', type: -1 },
    { name: '恒大集团凌晨发公告', type: -1 }
  ],
  randomGuess: [],
  hotRankList: [
    { name: '国内手机厂商最大的软肋就是 android 系统！', type: 0 },
    { name: '大家的官网订单现在什么状态', type: -1 },
    { name: '库克不愧是供应链管理大师， A15 一鱼三吃', type: -1 },
    { name: '找到了 iOS 被怀疑淘宝窃听的可能原因', type: 1 },
    { name: 'rebase 还是 merge？', type: -1 },
    { name: '十一出游西安，西安的大佬们能给些建议吗？', type: 0 },
    { name: '领克 01，燃油还是 phev？', type: 1 },
    { name: '为什么要抢购新手机呢？', type: -1 },
    { name: '拼多多官方处理问题跟京东真的没法比', type: -1 },
    { name: '百度输入法 VS 搜狗输入法', type: -1 },
    { name: '关于 ios 上 app 检测代理', type: 0 },
    { name: 'iPadmini6 到货以后，要不要换路由器', type: 1 },
    { name: '现在有推荐的同步盘么？', type: -1 },
    { name: '大哥们， mac 电池鼓包你们都咋修的。。', type: -1 },
    { name: '发现一个特别赞的同步盘方案 Resilio Sync', type: -1 },
    { name: '得鼻炎了, 说下症状和应对吧', type: 1 },
    {
      name: '打翻了一瓶矿泉水在 MacBook Pro 上，赶紧用鼠标关机了，等多久可以尝试开机？',
      type: 0
    },
    { name: '筋膜枪哪个牌子好啊？', type: -1 },
    {
      name: '最近在学理财小白基础知识，然后请教大家办哪个证券账户比较好呀',
      type: -1
    },
    {
      name: '有没有长期使用 sidecar 功能的 V 友，这个东西长期的稳定性如何？',
      type: 0
    },
    { name: '犹豫是否要年年焕新', type: -1 },
    { name: '请问如何在国内给 AppStore HK/TW 区充值.', type: 0 },
    { name: '最近感觉一个妹子不错，不过我比她大 5 岁', type: 1 },
    {
      name: '12mini 1 月 20 号购入，现在电池健康 92%，正常现象？',
      type: -1
    },
    { name: '现在新 iphone12/128 啥价格比较合适啊？', type: -1 },
    { name: 'iOS 15 不改地区就能看到全球所有交通卡', type: -1 },
    { name: '求推荐拼车/打车软件', type: 1 },
    { name: '如何比较方便的杀死 nohup 起的进程及其所有子进程?', type: 0 },
    { name: '换了新工作，好像又掉坑里了。', type: 0 },
    { name: '有没有这样一款记账软件？', type: 1 }
  ],
  liveRankList: [
    { name: '毛三岁（收女徒弟）', type: 0 },
    { name: '广州表哥', type: -1 },
    { name: '一只扬儿', type: -1 },
    { name: '沈酒', type: -1 },
    { name: '客家婷子', type: 1 },
    { name: '三斤.（9237）', type: -1 },
    { name: '虎哥说车', type: -1 },
    { name: '爆笑三江锅（永不言败）', type: -1 },
    { name: '子豪(尊师胜仔）5点扛把子', type: 1 },
    { name: '琪琪', type: -1 },
    { name: '战神土牛（征战全网）', type: 0 },
    { name: '小鲁班下午5点直播', type: -1 },
    { name: '惠子ssica', type: -1 },
    { name: '大狼狗郑建鹏&言真夫妇', type: -1 },
    { name: '一条小团团', type: -1 },
    { name: '高火火', type: -1 },
    { name: '郭聪明', type: -1 },
    { name: '罗永浩', type: 1 },
    { name: '陈赫', type: 0 },
    { name: '摩登兄弟', type: -1 },
    { name: '浪老师', type: -1 },
    { name: '陈死狗cnh', type: -1 },
    { name: '杨驴驴y', type: -1 },
    { name: 'imxiaoxin', type: 0 },
    { name: '丶才子欧巴', type: -1 },
    { name: '旭旭宝宝', type: -1 },
    { name: 'pigff', type: -1 },
    { name: '正经人令北', type: -1 },
    { name: '雨神丶', type: -1 },
    { name: '智勋勋勋勋', type: 0 }
  ],
  musicRankList: [
    {
      name: '龙卷风',
      mp3: 'http://im5.tongbu.com/rings/singerring/zt_uunGo_1/5605.mp3',
      cover: new URL('../../assets/img/music-cover/1.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 99,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '爱在西元前',
      mp3: 'https://m3.8js.net:99/1916/501204165042405.mp3',
      cover: new URL('../../assets/img/music-cover/2.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '蜗牛',
      mp3: 'http://im5.tongbu.com/rings/singerring/zt_uunGo_1/3684.mp3',
      cover: new URL('../../assets/img/music-cover/3.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '半岛铁盒',
      mp3: 'https://m3.8js.net:99/2016n/46/94745.mp3',
      cover: new URL('../../assets/img/music-cover/4.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '轨迹',
      mp3: 'https://m3.8js.net:99/1832/411204324135934.mp3',
      cover: new URL('../../assets/img/music-cover/5.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '七里香',
      mp3: 'https://m3.8js.net:99/2016n/14/53717.mp3',
      cover: new URL('../../assets/img/music-cover/6.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '发如雪',
      mp3: 'https://m3.8js.net:99/2014/211204142150965.mp3',
      cover: new URL('../../assets/img/music-cover/7.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '霍元甲',
      mp3: 'https://m3.8js.net:99/1921/261204212643140.mp3',
      cover: new URL('../../assets/img/music-cover/8.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '千里之外(周杰伦/费玉清)',
      mp3: 'http://im5.tongbu.com/rings/singerring/zt_uunGo_1/121.mp3',
      cover: new URL('../../assets/img/music-cover/9.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '菊花台',
      mp3: 'http://im5.tongbu.com/rings/singerring/zt_uunGo_1/2022.mp3',
      cover: new URL('../../assets/img/music-cover/10.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '不能说的秘密',
      mp3: 'http://im5.tongbu.com/rings/singerring/zt_uunGo_1/165.mp3',
      cover: new URL('../../assets/img/music-cover/11.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '牛仔很忙',
      mp3: 'http://im5.tongbu.com/rings/singerring/zt_uunGo_1/219.mp3',
      cover: new URL('../../assets/img/music-cover/12.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '给我一首歌的时间',
      mp3: 'https://m3.8js.net:99/1938/041204380445445.mp3',
      cover: new URL('../../assets/img/music-cover/18.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '烟花易冷',
      mp3: 'https://m3.8js.net:99/1828/051204280535192.mp3',
      cover: new URL('../../assets/img/music-cover/14.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '惊叹号',
      mp3: 'https://m3.8js.net:99/20111103/150.mp3',
      cover: new URL('../../assets/img/music-cover/15.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '明明就',
      mp3: 'https://m3.8js.net:99/2016n/27/96537.mp3',
      cover: new URL('../../assets/img/music-cover/16.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '算什么男人',
      mp3: 'https://m3.8js.net:99/20150107/429.mp3',
      cover: new URL('../../assets/img/music-cover/17.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '告白气球',
      mp3: 'https://m3.8js.net:99/20161016/481.mp3',
      cover: new URL('../../assets/img/music-cover/18.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    }
  ],
  brandRankList: {
    汽车: [
      {
        name: '五菱汽车',
        logo: 'https://www.wuling.com/favicon.ico',
        hot_count: 1395,
        living: false
      },
      {
        name: '宝马',
        logo: 'https://www.bmw.com.cn/etc/clientlibs/digitals2/clientlib/media/img/BMW_Grey_Logo.svg',
        hot_count: 1395,
        living: true
      },
      {
        name: '吉利汽车',
        logo: 'http://www.cargc.com/uploads/allimg/200828/1401364511-2.jpg',
        hot_count: 1395,
        living: false
      },
      {
        name: '一汽大众-奥迪',
        logo: 'https://www.audi.cn/bin/nemo.static.20210916063431/cms4i-nemo/assets/icons/favicon/favicon-v4.ico',
        hot_count: 1395,
        living: false
      },
      {
        name: '一汽-大众',
        logo: 'https://www.vw.com.cn/favicon.ico',
        hot_count: 1395,
        living: false
      }
    ],
    手机: [
      {
        name: '华为',
        logo: 'https://isesglobal.com/wp-content/uploads/2021/01/Huawei.jpg',
        hot_count: 1395,
        living: false
      },
      {
        name: '小米',
        logo: 'https://s01.mifile.cn/favicon.ico',
        hot_count: 1395,
        living: true
      },
      {
        name: 'vivo',
        logo: 'http://wwwstatic.vivo.com.cn/vivoportal/web/dist/img/common/favicon_ecf768e.ico',
        hot_count: 1395,
        living: false
      },
      {
        name: 'oppo',
        logo: 'https://code.oppo.com/etc.clientlibs/global-site/clientlibs/clientlib-design/resources/icons/favicon.ico',
        hot_count: 1395,
        living: false
      },
      {
        name: '三星',
        logo: 'https://www.samsung.com/etc.clientlibs/samsung/clientlibs/consumer/global/clientlib-common/resources/images/Favicon.png',
        hot_count: 1395,
        living: false
      }
    ],
    美妆: [
      {
        name: '巴黎欧莱雅',
        logo: 'https://oap-cn-prd-cd.e-loreal.cn/-/media/project/loreal/brand-sites/oap/apac/cn/identity/image-2020-06-19-20-48-00-996.png',
        hot_count: 1395,
        living: false
      },
      {
        name: '花西子',
        logo: 'https://www.haoyunbb.com/img/allimg/210607/001I43462-0.png',
        hot_count: 1395,
        living: false
      },
      {
        name: '完美日记',
        logo: 'http://5b0988e595225.cdn.sohucs.com/images/20200412/9c6caafca79e438f98d98d3986ebce4d.png',
        hot_count: 1395,
        living: false
      },
      {
        name: '雅诗兰黛',
        logo: 'https://vipyidiancom.oss-cn-beijing.aliyuncs.com/vipyidian.com/article/1_150918143107_1.png',
        hot_count: 1395,
        living: false
      },
      {
        name: 'COLORKEY珂拉琪',
        logo: 'https://www.80wzbk.com/uploads/logo/20210129/20210129104015_541.jpg',
        hot_count: 1395,
        living: false
      }
    ]
  },
  selectBrandKey: '汽车',
  selectBrandKeyIndex: 0,
  slideIndex: 0,
  timer: null,
  slideItemHeight: null
})

const lHistory = computed(() => {
  if (data.isExpand) {
    if (data.history.length > 10) return data.history.slice(0, 10)
    return data.history
  } else {
    if (data.history.length > 2) return data.history.slice(0, 2)
    return data.history
  }
})

const selectBrandList = computed(() => {
  return data.brandRankList[data.selectBrandKey]
})

const brandListKeys = computed<string[]>(() => {
  return Object.keys(data.brandRankList)
})

const slideListHeight = computed(() => {
  return {
    height: data.slideItemHeight ? data.slideItemHeight + 'px' : '100%'
  }
})

watch(
  () => data.slideIndex,
  (newVal) => {
    nextTick(() => {
      // console.log(data.$refs[`slide${newVal}`])
      data.slideItemHeight = new Dom(`.slide${newVal}`).css('height')
      // console.log(data.slideItemHeight)
      data.slideItemHeight = parseFloat(data.slideItemHeight) + 50
    })
    if (newVal === 3) {
      data.timer = setInterval(() => {
        if (data.selectBrandKeyIndex === brandListKeys.value.length - 1) {
          data.selectBrandKeyIndex = 0
        } else {
          data.selectBrandKeyIndex++
        }
        data.selectBrandKey = brandListKeys.value[data.selectBrandKeyIndex]
      }, 3000)
    } else {
      clearInterval(data.timer)
    }
  },
  { immediate: true }
)

onMounted(() => {
  data.history = data.history.reverse()
  refresh()
})

function toggleKey(key: string, i: number) {
  data.selectBrandKey = key
  data.selectBrandKeyIndex = i
  clearInterval(data.timer)
}

function refresh() {
  data.randomGuess = sampleSize(data.guess, 6)
}

function toggle() {
  if (data.isExpand) {
    _showSimpleConfirmDialog(
      '是否清空历史记录？',
      () => {
        data.history = []
      },
      null,
      '确定',
      '取消'
    )
  } else {
    data.isExpand = true
  }
}
</script>

<style scoped lang="less">
@import '../../assets/less/index';

.Search {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 14rem;

  .type {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 16rem;
    width: 16rem;
    font-size: 12rem;
    margin-left: 5rem;
    border-radius: 2rem;

    &.hot {
      background: var(--primary-btn-color);
    }

    &.new {
      background: rgb(186, 51, 226);
    }
  }

  .header {
    z-index: 4;
    background: var(--main-bg);
    height: 60rem;
    font-size: 14rem;
    padding: 0 var(--page-padding);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--line-color);
    position: fixed;
    width: 100%;
    box-sizing: border-box;
    top: 0;

    .search-ctn {
      flex: 1;
    }

    .scan {
      transform: scale(2);
      height: 10rem;
      width: 10rem;
    }
  }

  .content {
    padding-top: 60rem;

    .history {
      .row {
        min-height: 40rem;
      }

      .history-expand {
        text-align: center;
        padding: 10rem;
        color: var(--second-text-color);
      }
    }

    .guess {
      padding: 0 var(--page-padding);

      .title {
        font-size: 14rem;
        padding: 10rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: var(--second-text-color);

        .right {
          display: flex;
          align-items: center;

          img {
            margin-right: 5rem;
            width: 13rem;
            height: 13rem;
          }
        }
      }

      .keys {
        font-size: 16rem;
        display: flex;
        flex-wrap: wrap;

        .key {
          box-sizing: border-box;
          padding: 8rem 0;
          width: 49%;
          display: flex;
          align-items: center;

          .desc {
            max-width: 80%;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
      }
    }

    .rank-list {
      .indicator {
        padding: 15rem;
        display: flex;
        align-items: center;
        font-size: 14rem;

        .tab {
          color: var(--second-text-color);
          margin-right: 20rem;

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

      .slide0 {
        box-sizing: border-box;
        margin: 0 var(--page-padding) 50rem var(--page-padding);
        background: linear-gradient(to right, rgb(32, 29, 36), rgb(50, 29, 38));
        padding: var(--page-padding);
        border-radius: 10rem;

        .l-row {
          font-size: 14rem;
          display: flex;
          margin-bottom: 16rem;
          align-items: center;
          color: var(--second-text-color);

          .rank-wrapper {
            display: flex;
            align-items: center;

            .rank {
              width: 18rem;
              height: 18rem;
              line-height: 18rem;
              text-align: center;
              margin-right: 15rem;
            }
          }

          .right {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-width: 0;

            .center {
              width: calc(100% - 140rem);
              box-sizing: border-box;
              //padding: 0 1rem;
              //flex: 1;
              display: flex;
              align-items: center;
              font-size: 14rem;
              color: white;

              .desc {
                max-width: 85%;
                font-size: 14rem;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
              }
            }

            .count {
              font-size: 12rem;
            }
          }
        }
      }

      .slide1 {
        box-sizing: border-box;
        margin: 0 var(--page-padding) 50rem var(--page-padding);
        background: rgb(20, 22, 34);
        border: 1px solid rgba(31, 34, 52, 0.5);
        padding: var(--page-padding);
        border-radius: 10rem;

        .l-row {
          font-size: 14rem;
          display: flex;
          margin-bottom: 10rem;
          align-items: center;
          color: var(--second-text-color);

          &:active {
            opacity: 0.5;
          }

          .rank-wrapper {
            display: flex;
            align-items: center;

            .rank {
              width: 18rem;
              height: 18rem;
              line-height: 18rem;
              text-align: center;
              margin-right: 15rem;

              &.top {
                color: yellow;
              }
            }
          }

          .right {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .center {
              width: calc(100% - 160rem);
              box-sizing: border-box;
              //padding: 0 1rem;
              //flex: 1;
              display: flex;
              align-items: center;
              font-size: 14rem;
              color: white;

              .avatar-wrapper {
                @width: 35rem;
                margin-right: 10rem;
                display: flex;
                align-items: center;
                justify-content: center;
                width: @width;
                height: @width;
                border-radius: 50%;
                background: var(--primary-btn-color);

                .avatar {
                  width: @width - 0.3;
                  border-radius: 50%;
                  padding: 1rem;
                  background: black;
                }
              }

              .desc {
                max-width: 55%;
                font-size: 14rem;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
              }

              .live-type {
                height: 22rem;
                padding: 0 5rem;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                font-size: 10rem;
                color: var(--second-text-color);
                margin-left: 5rem;
                border-radius: 2rem;
                background: var(--second-btn-color-tran);

                .type2 {
                  margin-right: 2rem;
                  width: 10rem;
                  height: 10rem;
                }

                .type1 {
                  margin-right: 2rem;
                  width: 15rem;
                  height: 10rem;
                }
              }
            }

            .count {
              font-size: 12rem;
            }
          }
        }
      }

      .slide2 {
        box-sizing: border-box;
        margin: 0 var(--page-padding) 50rem var(--page-padding);
        background: rgb(20, 22, 34);
        border: 1px solid rgba(31, 34, 52, 0.5);
        padding: var(--page-padding);
        border-radius: 10rem;

        .l-row {
          font-size: 14rem;
          display: flex;
          margin-bottom: 10rem;
          align-items: center;
          color: var(--second-text-color);

          &:active {
            opacity: 0.5;
          }

          .rank-wrapper {
            display: flex;
            align-items: center;

            .rank {
              width: 18rem;
              height: 18rem;
              line-height: 18rem;
              text-align: center;
              margin-right: 15rem;

              &.top {
                color: yellow;
              }
            }
          }

          .right {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .center {
              width: calc(100% - 150rem);
              box-sizing: border-box;
              //padding: 0 1rem;
              //flex: 1;
              display: flex;
              align-items: center;
              font-size: 14rem;
              color: white;

              .avatar-wrapper {
                margin-right: 10rem;

                .avatar {
                  width: 30rem;
                  height: 30rem;
                  border-radius: 2rem;
                }
              }

              .desc {
                max-width: 95%;
                font-size: 14rem;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
              }
            }

            .count {
              display: flex;
              align-items: center;
              font-size: 12rem;

              img {
                margin-right: 2rem;
                width: 15rem;
                height: 15rem;
              }
            }
          }
        }
      }

      .slide3 {
        box-sizing: border-box;
        margin: 0 var(--page-padding) 50rem var(--page-padding);
        border-radius: 10rem;

        .slide4-wrapper {
          padding: 5rem var(--page-padding);

          .brands {
            color: var(--second-text-color);
            font-size: 12rem;
            margin-bottom: 15rem;
            display: flex;

            .brand {
              border-radius: 2rem;
              margin-right: 10rem;
              padding: 5rem 10rem;
              background: var(--second-btn-color-tran);

              &.active {
                color: white;
                background: var(--second-btn-color);
              }
            }
          }

          .l-row {
            font-size: 14rem;
            display: flex;
            margin-bottom: 10rem;
            align-items: center;
            color: var(--second-text-color);

            &:active {
              opacity: 0.5;
            }

            .rank-wrapper {
              display: flex;
              align-items: center;

              .rank {
                width: 18rem;
                height: 18rem;
                line-height: 18rem;
                text-align: center;
                margin-right: 15rem;

                &.top {
                  color: yellow;
                }
              }
            }

            .right {
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: space-between;

              .center {
                width: calc(100% - 150rem);
                box-sizing: border-box;
                //padding: 0 1rem;
                //flex: 1;
                display: flex;
                align-items: center;
                font-size: 14rem;
                color: white;

                .avatar-wrapper {
                  @width: 35rem;
                  margin-right: 10rem;

                  &.living {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: @width;
                    height: @width;
                    border-radius: 50%;
                    background: var(--primary-btn-color);

                    .avatar-out-line {
                      width: @width;
                      height: @width;
                      position: absolute;
                      background: transparent;
                      border-radius: 50%;
                      border: 2rem solid var(--primary-btn-color);
                      animation: avatar-out-line 1s infinite;

                      @keyframes avatar-out-line {
                        from {
                          padding: 0;
                        }
                        to {
                          opacity: 0;
                          padding: 2rem;
                        }
                      }
                    }

                    .avatar {
                      padding: 1rem;
                      animation: avatar 1s infinite alternate;
                    }
                  }

                  .avatar {
                    position: relative;
                    z-index: 2;
                    width: @width - 0.3;
                    height: @width - 0.3;
                    border-radius: 50%;
                    background: black;
                    box-sizing: border-box;

                    @keyframes avatar {
                      from {
                        padding: 1rem;
                      }
                      to {
                        padding: 2rem;
                      }
                    }
                  }
                }

                .desc {
                  max-width: 95%;
                  font-size: 14rem;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                }
              }

              .count {
                display: flex;
                align-items: center;
                font-size: 12rem;

                img {
                  margin-right: 2rem;
                  width: 15rem;
                  height: 15rem;
                }
              }
            }
          }
        }

        .ad {
          background: var(--second-btn-color-tran);
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100rem;
        }
      }

      .more {
        margin-bottom: 20rem;
        font-size: 12rem;
        padding: 10rem 10rem 0 10rem;
        text-align: center;
        color: yellow;
      }
    }
  }
}
</style>
