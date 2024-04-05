<template>
  <div class="Share2Friend">
    <BaseHeader backMode="light" backImg="back" style="z-index: 7">
      <template v-slot:center>
        <span class="f16">已加入的群聊</span>
      </template>
      <template v-slot:right>
        <div>
          <span
            class="f16"
            :class="data.selectFriends.length ? 'save-yes' : 'save-no'"
            @click="save"
          >
            完成{{ data.selectFriends.length ? `(${data.selectFriends.length})` : '' }}
          </span>
        </div>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="list">
        <div
          class="local-row"
          :key="i"
          v-for="(item, i) of data.friends.all"
          @click="toggleSelect(item)"
        >
          <Check mode="red" v-model="item.select" />
          <img :src="_checkImgUrl(item.avatar)" alt="" />
          <div class="desc">
            <span class="name">{{
              item.name.length > 20 ? item.name.substr(0, 20) + '...' : item.name
            }}</span>
            <span class="num">(3)</span>
          </div>
        </div>
      </div>
      <NoMore></NoMore>
    </div>
  </div>
</template>
<script setup lang="ts">
import Check from '../../components/Check.vue'
import { friends } from '@/api/user'

import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { _checkImgUrl } from '@/utils'

defineOptions({
  name: 'JoinedGroupChat'
})

const router = useRouter()
const data = reactive({
  friends: {
    all: {},
    recent: [],
    eachOther: []
  },
  selectFriends: []
})

onMounted(() => {
  getFriends()
})

function save() {
  if (!data.selectFriends.length) return
  router.back()
}

function toggleSelect(item) {
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
  let res = await friends()
  if (res.success) {
    data.friends = res.data
    data.friends.all = data.friends.all.sort((a, b) => {
      if (a.pinyin < b.pinyin) return -1
      if (a.pinyin > b.pinyin) return 1
      return 0
    })
  }
}
</script>

<style scoped lang="less">
@import '@/assets/less/index';

.Share2Friend {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 14rem;

  .content {
    padding-top: 60rem;
  }

  .save-yes {
    color: var(--primary-btn-color);
  }

  .save-no {
    color: var(--disable-primary-btn-color);
  }

  .list {
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
        .num {
          margin-left: 5rem;
          color: var(--second-text-color);
        }
      }
    }
  }
}
</style>
