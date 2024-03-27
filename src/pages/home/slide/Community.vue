<template>
  <div id="Community">
    <ScrollList class="Scroll"
                v-if="state.show"
                :api="recommendedPost"
    >
      <template v-slot="{list}">
        <div class="search" @click="nav('/home/search')">
          <div class="left">
            <Icon class="icon" icon="ion:search" @click.stop="$no()"/>
            <span>壁纸</span>
          </div>
          <div class="right">搜索</div>
        </div>
        <WaterfallList :list="list" class="list">
          <template v-slot="{item}">
            <div class="card"
                 @click="test"
            >
              <img class="poster" v-lazy="_checkImgUrl(item.note_card?.cover?.url_default)"/>
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
                    <Icon icon="solar:heart-linear"/>
                    <div class="num">{{ item.note_card?.interact_info?.liked_count }}</div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </WaterfallList>
      </template>
    </ScrollList>

    <div class="shadow">

    </div>
  </div>
</template>

<script setup>
import {reactive, watch} from "vue";
import {$no, _checkImgUrl} from "@/utils";
import {recommendedPost} from "@/api/user";
import {useNav} from "@/utils/hooks/useNav";
import {Icon} from "@iconify/vue";
import WaterfallList from "@/components/WaterfallList.vue";
import ScrollList from "@/components/ScrollList.vue";

//@click="nav('album-detail',{},item)"

const nav = useNav()
const props = defineProps({
  active: {
    type: Boolean,
    default: false
  }
})

const state = reactive({
  show: false
})

watch(() => props.active, n => {
  if (n && !state.show) {
    state.show = true
  }
}, {immediate: true})

function test(e) {
  let rect = e.currentTarget.getBoundingClientRect()
  console.log('e', rect)
  let s = $('.shadow')
  s.empty()
  s.append($(e.currentTarget).clone())
  s.css('transition', '0s')
  s.css('top', rect.top)
  s.css('left', rect.left)
  s.css('width', rect.width)

  setTimeout(() => {
    s.css('transition', 'all .3s')
    s.css('top', 0)
    s.css('left', 0)
    s.css('width', '100vw')
  })
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

  .search {
    margin-left: 2vw;
    width: 96vw;
    box-sizing: border-box;
    padding: 10rem;
    border: 1px solid #646464;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16rem;
    margin-bottom: 10rem;
    border-radius: 8rem;

    .left {
      display: flex;
      align-items: center;
      gap: 5rem;
      color: gray;

      svg {
        font-size: 16rem;
      }
    }
  }

  .list {
    margin-left: 2vw;
    width: 96vw;
  }

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
        font-size: 14rem;
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
            margin-right: 5rem;
          }
        }

        .star {
          display: flex;
          align-items: center;
          gap: 3rem;

          svg {
            font-size: 15rem;
          }

          .num {
            font-size: 12rem;
          }
        }
      }
    }
  }

  .shadow {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    transition: all .3s;
  }

}
</style>