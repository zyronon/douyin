<template>
  <div id="Shop">
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
      <div class="goods-list">
        <div class="goods" v-for="item in state.list">
          <!--                <img class="poster" v-lazy="Utils.$imgPreview(item.src)"/>-->
          <img class="poster" :src="Utils.$imgPreview(item.src)"/>
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
  list: []
})

function loadData() {
  console.log('loadData')
  for (let i = 1; i < 12; i++) {
    let temp = {
      src: new URL(`../../assets/img/poster/${i}.jpg`, import.meta.url).href,
      author: new URL(`../../assets/img/avatar.png`, import.meta.url).href,
    }
    state.list.push(temp)
  }
}

onMounted(() => {
  for (let i = 1; i < 12; i++) {
    let temp = {
      src: new URL(`../../assets/img/poster/${i}.jpg`, import.meta.url).href,
      author: new URL(`../../assets/img/avatar.png`, import.meta.url).href,
    }
    state.list.push(temp)
  }
  setTimeout(() => {
    // var $grid = $('.goods-list').imagesLoaded( function() {
    //   // init Isotope after all images have loaded
    //   $grid.isotope({
    //     itemSelector: '.goods',
    //   });
    // });
    let $grid = $('.goods-list').isotope({
      // options...
      itemSelector: '.goods',
    });
    console.log('$grid', $grid)
    $grid.imagesLoaded().progress(function () {
      $grid.isotope('layout');
    });
  })

})
</script>

<style scoped lang="less">
@import "@/assets/less/index";

#Shop {
  font-size: 14rem;
  color: white;

  .search {
    display: flex;
    align-items: center;
    padding: 20rem;

    img {
      width: 20rem;
    }

    .search-input {
      border: 3rem solid rgb(140, 48, 74);
      border-radius: 8rem;
      padding: 10rem 20rem;
      flex: 1;
      display: flex;

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
    padding: 0 20rem;

    img {
      width: 20rem;
      margin-right: 10rem;
    }

    .option {
      flex: 1;
      display: flex;
      background: rgb(63, 58, 78);
      padding: 8rem;
      border-radius: 8rem;
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
      padding-bottom: 10rem;
      word-break: keep-all;
      //border-bottom: 2rem solid white;
    }
  }

  .Scroll {
    //height: calc(100vh - @header-height) !important;
    height: calc(100vh - 90rem) !important;
  }

  .goods-list {
    .goods {
      width: 50%;
      overflow: hidden;

      img {
        width: 100%;
      }
    }
  }
}
</style>