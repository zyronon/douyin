<template>
  <div id="Community">
    <Scroll class="Scroll"
            @pulldown="loadData">
      <div v-masonry class="goods-list"
           transition-duration="0s"
           item-selector=".goods">
        <div v-masonry-tile class="goods" v-for="(item, index) in  state.list">
          <div class="card">
            <!--          <img class="poster" v-lazy="Utils.$imgPreview(item.src)"/>-->
            <img class="poster" :src="Utils.$imgPreview(item.src)"/>
            <div class="bottom">
              <div class="title">
                2022新款Apple/苹果iPhone 14 Plus手机6.7
              </div>
              <div class="b2">
                <div class="user">
                  <img class="avatar" :src="Utils.$imgPreview(item.author)"/>
                  <div class="name">一二三</div>
                </div>
                <div class="star">
                  <img src="@/assets/img/icon/components/like-gray-small.png" alt="" class="love-image">
                  <div class="num">12312</div>
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
import {onMounted, reactive} from "vue";
import Utils from "@/utils";
import Scroll from "@/components/Scroll.vue";

const state = reactive({
  list: [],
  listEl: null
})

function loadData() {
  console.log('loadData')
  for (let i = 1; i < 12; i++) {
    let temp = {
      src: new URL(`../../../assets/img/poster/${i}.jpg`, import.meta.url).href,
      author: new URL(`../../../assets/img/avatar.png`, import.meta.url).href,
    }
    state.list.push(temp)
  }
}

onMounted(() => {
  for (let i = 1; i < 12; i++) {
    let temp = {
      src: new URL(`../../../assets/img/poster/${i}.jpg`, import.meta.url).href,
      author: new URL(`../../../assets/img/avatar.png`, import.meta.url).href,
    }
    state.list.push(temp)
  }
})
</script>

<style scoped lang="less">
@import "@/assets/less/index";

#Community {
  font-size: 14rem;
  color: white;
  padding-top: @header-height;
  background: rgb(21, 23, 36);

  .Scroll {
    height: calc(100vh - @header-height - @footer-height) !important;
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
      background: @main-bg;

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