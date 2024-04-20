<template>
  <div class="Share2Friend">
    <BaseHeader backImg="close" style="z-index: 7">
      <template v-slot:center>
        <span class="f16">私信给</span>
      </template>
      <template v-slot:bottom>
        <div class="search">
          <div class="search-select-friends" v-if="data.selectFriends.length">
            <div class="wrapper">
              <img
                :src="_checkImgUrl(item.avatar)"
                :key="i"
                v-for="(item, i) in data.selectFriends"
                @click="toggleSelect(item)"
              />
            </div>
          </div>
          <img v-else class="search-icon" src="../../assets/img/icon/search-gray.png" alt="" />
          <input type="text" placeholder="搜索" v-model="data.searchKey" />
          <img
            v-if="data.searchKey"
            @click="clear"
            class="clear"
            src="../../assets/img/icon/components/gray-close-full.png"
          />
        </div>
      </template>
    </BaseHeader>
    <div
      class="is-search"
      :style="{
        height:
          data.selectFriends.length && data.searchResult.length
            ? 'calc(100% - 272rem)'
            : 'calc(100% - 112rem)'
      }"
      v-show="data.searchKey"
    >
      <div class="list" v-if="data.searchResult.length">
        <div
          class="local-row"
          :key="i"
          v-for="(item, i) of data.searchResult"
          @click="handleClick(item)"
        >
          <Check mode="red" v-model="item.select" />
          <img :src="_checkImgUrl(item.avatar)" alt="" />
          <div class="desc">
            <span class="name">
              <span v-if="item.name.indexOf(data.searchKey) > -1">
                {{ item.name.substr(0, item.name.indexOf(data.searchKey))
                }}<span style="color: #ffd800">{{ data.searchKey }}</span
                >{{ item.name.substr(item.name.indexOf(data.searchKey) + data.searchKey.length) }}
              </span>
              <span v-else>{{ item.name }}</span>
            </span>
            <span class="account" v-if="item.account">
              抖音号：
              <span v-if="item.account.indexOf(data.searchKey) > -1">
                {{ item.account.substr(0, item.account.indexOf(data.searchKey))
                }}<span style="color: #ffd800">{{ data.searchKey }}</span
                >{{
                  item.account.substr(item.account.indexOf(data.searchKey) + data.searchKey.length)
                }}
              </span>
              <span v-else>{{ item.account }}</span>
            </span>
          </div>
        </div>
      </div>
      <div class="no-result" v-else>
        <img src="../../assets/img/icon/no-result.png" alt="" />
        <span class="n1">搜索结果为空</span>
        <span class="n2">没有搜索到相关的联系人</span>
      </div>
    </div>
    <div
      ref="list"
      :style="{ paddingBottom: data.selectFriends.length ? '160rem' : 0 }"
      class="content"
      @scroll="scroll"
    >
      <div class="list">
        <div class="row" @click="nav('/message/joined-group-chat')">
          <span>已加入的群聊</span>
          <dy-back :scale="0.7" direction="right"></dy-back>
        </div>
        <div class="title">最近聊天</div>
        <div
          class="local-row"
          :key="i"
          v-for="(item, i) of data.friends.recent"
          @click="toggleSelect(item)"
        >
          <Check mode="red" v-model="item.select" />
          <img :src="_checkImgUrl(item.avatar)" alt="" />
          <span>{{ item.name }}</span>
        </div>
        <div class="title">互关好友</div>
        <div
          class="local-row"
          :key="i"
          v-for="(item, i) of data.friends.eachOther"
          @click="toggleSelect(item)"
        >
          <Check mode="red" v-model="item.select" />
          <img :src="_checkImgUrl(item.avatar)" alt="" />
          <span>{{ item.name }}</span>
        </div>
        <div class="title">全部</div>
        <div :key="name" v-for="(value, name) of data.friendsSort">
          <div :class="name === '#' ? 'top' : name" class="title">
            <span>{{ name }}</span>
          </div>
          <div class="local-row" :key="i" v-for="(item, i) of value" @click="toggleSelect(item)">
            <Check mode="red" v-model="item.select" />
            <img :src="_checkImgUrl(item.avatar)" alt="" />
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
      <div class="share2friend" v-if="data.selectFriends.length && data.searchResult.length">
        <div class="comment">
          <textarea placeholder="有什么想和好友说的..."></textarea>
          <img class="poster" src="../../assets/img/poster/1.jpg" alt="" />
        </div>
        <div class="wrapper">
          <div class="create-chat" v-if="data.selectFriends.length > 1">
            <Check mode="red" v-model="data.isCreateChat" />
            <span>创建群聊</span>
          </div>
          <dy-button type="primary"
            >{{ data.selectFriends.length > 1 ? '分别发送' : '发送' }}
          </dy-button>
        </div>
      </div>
    </div>
    <div class="indicator-ctn">
      <div class="indicator">
        <div class="item" data-index="top">#</div>
        <div class="item">A</div>
        <div class="item">B</div>
        <div class="item">C</div>
        <div class="item">D</div>
        <div class="item">E</div>
        <div class="item">F</div>
        <div class="item">G</div>
        <div class="item">H</div>
        <div class="item">I</div>
        <div class="item">J</div>
        <div class="item">K</div>
        <div class="item">L</div>
        <div class="item">M</div>
        <div class="item">N</div>
        <div class="item">O</div>
        <div class="item">P</div>
        <div class="item">Q</div>
        <div class="item">R</div>
        <div class="item">S</div>
        <div class="item">T</div>
        <div class="item">U</div>
        <div class="item">V</div>
        <div class="item">W</div>
        <div class="item">X</div>
        <div class="item">Y</div>
        <div class="item">Z</div>
      </div>
    </div>
    <div
      class="hover"
      :style="{ top: data.currentFixedIndicatorTop }"
      ref="hover"
      v-if="data.currentFixedIndicator"
    >
      <img src="../../assets/img/icon/components/video/water.png" alt="" />
      <span>{{ data.currentFixedIndicator }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import Check from '../../components/Check.vue'
import { friends } from '@/api/user'
import { onMounted, reactive, ref, watch } from 'vue'
import { useNav } from '@/utils/hooks/useNav'
import { _checkImgUrl, cloneDeep } from '@/utils'

defineOptions({
  name: 'Share2Friend'
})

const nav = useNav()
const data = reactive({
  isCreateChat: false,
  searchKey: '',
  indexOffsetTop: {},
  currentFixedIndicator: '',
  currentFixedIndicatorTop: '0px',
  friends: {
    all: {},
    recent: [],
    eachOther: []
  },
  selectFriends: [],
  friendsSort: {},
  searchResult: []
})

onMounted(() => {
  getFriends()
  let indexs = document.querySelectorAll('.index')
  indexs.forEach((v) => {
    data.indexOffsetTop[v.children[0].innerText] = v.offsetTop
  })
  let items = document.querySelectorAll('.item')
  let item = document.querySelector(`.item:nth-child(2)`)
  let itemHeight = item.clientHeight
  let ul = document.querySelector('.indicator')
  let ulOffsetTop = ul.offsetTop
  let resetColor = 'rgb(143, 143, 158)'
  ul.addEventListener('touchstart', (e) => {
    let pageY = e.touches[0].pageY - ulOffsetTop
    let currentIndex = pageY / itemHeight
    currentIndex = Math.floor(currentIndex)
    render(currentIndex)
    data.currentFixedIndicatorTop = e.touches[0].pageY - 28 + 'px'
  })
  ul.addEventListener('touchmove', (e) => {
    let pageY = e.touches[0].pageY - ulOffsetTop
    data.currentFixedIndicatorTop = e.touches[0].pageY - 28 + 'px'

    let currentIndex = pageY / itemHeight
    currentIndex = Math.floor(currentIndex)
    if (currentIndex >= 0 && currentIndex < 27) {
      render(currentIndex)
    }
  })
  ul.addEventListener('touchend', () => {
    return (data.currentFixedIndicator = '')
  })
  let render = (currentIndex) => {
    items.forEach((el) => {
      el.style.color = resetColor
    })
    items[currentIndex].style.color = '#fff'
    data.currentFixedIndicator = items[currentIndex].innerText
    goto(items[currentIndex])
  }
})

watch(
  () => data.searchKey,
  (newVal) => {
    let temp = cloneDeep(data.friends.all)
    temp.map((v) => {
      if (data.selectFriends.find((w) => w.id === v.id)) v.select = true
    })
    data.searchResult = temp.filter((v) => {
      return v.name.includes(newVal) || v.account.includes(newVal)
    })
  }
)

function handleClick(item) {
  toggleSelect(item)
  data.searchKey = ''
}

function clear() {
  console.log('clear')
  data.searchKey = ''
}

function toggleSelect(item) {
  //减少判断次数，找到了就跳出循环
  for (let i = 0; i < data.friends.recent.length; i++) {
    let v = data.friends.recent[i]
    if (v.name === item.name) {
      v.select = !v.select
      break
    }
  }

  for (let i = 0; i < data.friends.eachOther.length; i++) {
    let v = data.friends.eachOther[i]
    if (v.name === item.name) {
      v.select = !v.select
      break
    }
  }

  let find = false
  let keys = Object.keys(data.friendsSort)
  for (let i = 0; i < keys.length; i++) {
    let k = keys[i]
    for (let j = 0; j < data.friendsSort[k].length; j++) {
      let value = data.friendsSort[k][j]
      if (value.name === item.name) {
        value.select = !value.select
        find = true
        break
      }
    }
    if (find) break
  }

  let resIndex = data.selectFriends.findIndex((v) => v.name === item.name)
  if (resIndex !== -1) {
    item.select = false
    data.selectFriends.splice(resIndex, 1)
  } else {
    item.select = true
    data.selectFriends.push(item)
  }
}

async function getFriends() {
  //TODO 这里的数据不对
  let res = await friends()
  console.log('getFriends', res)
  if (res.success) {
    data.friends = res.data
    data.friends.all = data.friends.all.sort((a, b) => {
      if (a.pinyin < b.pinyin) return -1
      if (a.pinyin > b.pinyin) return 1
      return 0
    })
    data.friends.all.map((v) => {
      if (data.friendsSort[v.pinyin]) {
        data.friendsSort[v.pinyin].push(v)
      } else {
        data.friendsSort[v.pinyin] = [v]
      }
    })
  }
}

const list = ref()

function goto(el) {
  let py
  if (el.dataset['index']) {
    py = 'top'
  } else {
    py = el.innerText
  }
  if (document.querySelector(`.${py}`)) {
    list.value.scrollTop = document.querySelector(`.${py}`).offsetTop - 100
  }
}

function scroll(e) {
  // let isFixed = document.querySelector(`.fixed`)
  // console.log(isFixed)
  // let listScrollTop = e.target.scrollTop + (isFixed ? 110 : 110)
  let listScrollTop = e.target.scrollTop + 110
  // console.log('listScrollTop', listScrollTop)
  let currentKey = null
  for (const key in data.indexOffsetTop) {
    // if (currentKey) break
    let offsetTop = data.indexOffsetTop[key]
    // console.log('offsetTop',offsetTop)
    if (offsetTop < listScrollTop) {
      currentKey = key
    }
  }
  data.currentFixedIndicator = currentKey
  // console.log('currentKey', currentKey)
}
</script>

<style scoped lang="less">
@import '../../assets/less/index';

.Share2Friend {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 14rem;

  .search {
    border-bottom: 1px solid #cccccc11;
    font-size: 14rem;
    padding: 0;
    padding-left: var(--page-padding);
    height: 50rem;
    border-radius: 2px;
    display: flex;
    align-items: center;

    .search-select-friends {
      .wrapper {
        display: flex;
        max-width: 70vw;
        overflow-x: auto;

        img {
          height: 30rem;
          width: 30rem;
          margin-right: 10rem;
          border-radius: 50%;
        }
      }
    }

    .search-icon {
      height: 20rem;
      width: 20rem;
      margin: 0 10rem;
    }

    input {
      //margin-top: 4rem;
      color: white;
      height: 50%;
      width: 100%;
      outline: none;
      border: none;
      padding: 0;
      background: transparent;

      &::-webkit-input-placeholder {
        color: var(--second-text-color);
      }
    }

    .clear {
      height: 18rem;
      width: 18rem;
      margin-left: 10rem;
      margin-right: 10rem;
    }
  }

  .indicator-ctn {
    width: 25rem;
    height: calc(var(--vh, 1vh) * 100);
    top: 0;
    position: fixed;
    z-index: 3;
    right: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    .indicator {
      width: 25rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      div {
        color: var(--second-text-color);
        //transition: all .3s;
        font-size: 10rem;
        padding: 1rem;
      }

      .arrow {
        padding: 0 0 3rem 0;
        width: 0;
        height: 0;
        border: 5rem solid transparent;
        border-bottom: 10rem solid var(--second-text-color);
      }
    }
  }

  .content {
    height: calc(100% - 112rem);
    margin-top: 112rem;
    box-sizing: border-box;
    width: 100%;
    overflow-y: scroll;

    .share2friend {
      position: fixed;
      z-index: 4;
      bottom: 0;
      box-sizing: border-box;
      width: 100vw;
      height: 160rem;
      background: var(--main-bg);
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .comment {
        padding: 0 20rem;
        display: flex;
        flex: 1;

        textarea {
          flex: 1;
          outline: none;
          border: none;
          background: transparent;
          color: #fff;
        }

        .poster {
          margin-left: 20rem;
          height: 40rem;
          width: 40rem;
        }
      }

      .wrapper {
        padding: 10rem;
      }

      .create-chat {
        margin: 10rem;
        display: flex;
        align-items: center;
        color: var(--second-text-color);

        .check {
          margin-right: 10rem;
          width: 16rem;
          height: 16rem;
          //transform: scale(1.2);
        }
      }

      .button {
      }
    }
  }

  .hover {
    position: absolute;
    right: 40rem;
    top: 200rem;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      position: absolute;
      margin-right: 10rem;
      font-size: 18rem;
    }

    img {
      height: 50rem;
    }
  }

  .is-search {
    background: var(--main-bg);
    position: fixed;
    z-index: 5;
    left: 0;
    height: calc(100% - 112rem);
    top: 112rem;
    box-sizing: border-box;
    width: 100%;
    overflow-y: scroll;

    .no-result {
      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        margin-top: 150rem;
        height: 150rem;
      }

      .n1 {
        margin-top: 40rem;
        font-size: 16rem;
      }

      .n2 {
        margin-top: 20rem;
        font-size: 12rem;
        color: var(--second-text-color);
      }
    }
  }

  .list {
    //padding-right: 25rem;

    .title {
      font-size: 12rem;
      color: var(--second-text-color);
      padding: 10rem 20rem;
    }

    .local-row {
      display: flex;
      align-items: center;
      padding: 10rem 20rem;

      &:active {
        background: rgb(35, 41, 58);
      }

      .check {
        height: 22rem;
        width: 22rem;
        margin-right: 15rem;
      }

      img {
        height: 45rem;
        width: 45rem;
        border-radius: 50%;
        margin-right: 15rem;
      }

      .desc {
        display: flex;
        flex-direction: column;

        .name {
        }

        .account {
          margin-top: 5rem;
          font-size: 12rem;
          color: var(--second-text-color);
        }
      }
    }
  }
}
</style>
