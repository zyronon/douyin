<template>
  <div id="Community">
    <Scroll class="Scroll"
            @pulldown="loadData">
      <div v-masonry class="goods-list"
           transition-duration="0s"
           item-selector=".goods">
        <div v-masonry-tile class="goods"
             @click="nav('album-detail',{},item)"
             v-for="(item, index) in state.list">
          <div class="card">
            <!--          <img class="poster" v-lazy="Utils.$imgPreview(item.src)"/>-->
            <img class="poster" :src="_checkImgUrl(item.note_card?.cover?.url_default)"/>
            <div class="bottom">
              <div class="title">
                {{ item.note_card?.display_title }}
              </div>
              <div class="b2">
                <div class="user">
                  <img class="avatar" :src="_checkImgUrl(item.note_card?.user?.avatar)"/>
                  <div class="name">{{ item.note_card?.user?.nickname }}</div>
                </div>
                <div class="star">
                  <img src="@/assets/img/icon/components/like-gray-small.png" alt="" class="love-image">
                  <div class="num">{{ item.note_card?.interact_info?.liked_count }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script setup>
import {reactive, watch} from "vue";
import {_checkImgUrl, _notice} from "@/utils";
import Scroll from "@/components/Scroll.vue";
import {recommendedPost} from "@/api/user";
import {useNav} from "@/utils/hooks/useNav";

const nav = useNav()
const props = defineProps({
  active: {
    type: Boolean,
    default: false
  }
})

const state = reactive({
  list: [],
  listEl: null,
  total: 0,
  pageNo: 0,
  pageSize: 10,
})

watch(() => props.active, n => {
  if (n && !state.list.length) {
    getData(true, true)
  }
})

function loadData() {
  console.log('loadData')
  getData()
}

async function getData(loading = true, refresh = false) {
  if (refresh) {
    state.pageNo = 0
  }
  let res = await recommendedPost({pageNo: state.pageNo, pageSize: state.pageSize,})
  console.log('res', res)
  if (res.success) {
    if (refresh) {
      state.list = res.data.list
    } else {
      state.list = state.list.concat(res.data.list)
    }
    state.total = res.data.total
  } else {
    _notice('查询失败')
  }
}

</script>

<style scoped lang="less">


#Community {
  font-size: 14rem;
  color: white;
  padding-top: var(--common-header-height);
  background: rgb(21, 23, 36);

  .Scroll {
    height: calc(var(--vh, 1vh) * 100 - var(--common-header-height) - var(--footer-height)) !important;
  }

  @p: 1rem;

  .goods-list {
    padding: @p;
    box-sizing: border-box;
  }

  .goods {
    width: calc(50% - @p);
    padding: 3rem;
    box-sizing: border-box;

    .card {
      border-radius: 4rem;
      overflow: hidden;
      background: var(--main-bg);

      img {
        width: 100%;
      }

      .bottom {
        color: gainsboro;
        padding: 10rem;

        .title {
          font-size: 16rem;
          margin-bottom: 8rem;
        }

        .b2 {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .user {
            display: flex;
            font-size: 12rem;

            img {
              width: 15rem;
              border-radius: 50%;
              margin-right: 10rem;
            }
          }

          .star {
            display: flex;

            img {
              width: 15rem;
              margin-right: 5rem;
            }

            .num {
              font-size: 13rem;
            }
          }
        }
      }
    }
  }
}
</style>