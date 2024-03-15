<script setup>

</script>

<template>
  <div class="page">
    <div class="item"
         :class="[
             i % 5 === 0 && 'big',
              i % 5 === 0 ? '' : (i % 2 === 1 && 'l'),
              i % 5 === 0 ? '' : (i % 2 === 0 && 'r'),
         ]"
         v-for="(item,i) in 100">
      <video
          controls
          src="@/assets/video/0.mp4"></video>
      <img v-lazy="`https://cdn.seovx.com/ha/?mom=302&d=${i}`" alt="" class="poster">
      <div class="title">
        哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
      </div>
      <div class="bottom">
        <div class="l">
          <img v-lazy="`https://cdn.seovx.com/ha/?mom=302&d=${i}`" alt="" class="avatar">
          <div class="name">哈哈哈哈</div>
        </div>
        <div class="r">
          <Icon icon="icon-park-outline:like"/>
          <div class="num">9.2万</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/assets/less/index";

.page {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 15rem;
  height: calc(100vh - @header-height - @footer-height);
  margin-top: @header-height;
  overflow: auto;
  box-sizing: border-box;

  .item {
    margin: 0 10rem;
    display: flex;
    flex-direction: column;
    gap: 8rem;

    .poster {
      border-radius: 12rem;
      width: 100%;
      height: 140rem;
      object-fit: cover;
    }

    video {
      display: none;
      height: 220rem;
      object-fit: cover;
    }

    .title {
      height: 36rem;
      color: white;
      font-size: 14rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box; //作为弹性伸缩盒子模型显示。
      -webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
      -webkit-line-clamp: 2; //显示的行
    }

    .f {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 5rem;
    }

    .bottom {
      color: gray;
      .f;
      font-size: 13rem;

      .l {
        .f;

        .avatar {
          @w: 20rem;
          width: @w;
          height: @w;
          object-fit: cover;
          border-radius: 50%;
        }
      }

      .r {
        .f;

        svg {
          font-size: 16rem;
        }

      }
    }

    &.big {
      grid-column-start: 1;
      grid-column-end: 3;
      margin: 0;

      .poster {
        display: none;
      }

      video {
        display: block;
      }

      .title {
        height: unset;
        -webkit-line-clamp: 1;
      }

      .title, .bottom {
        padding: 0 10rem;
      }
    }

    &.l {
      margin-right: 5rem;
    }

    &.r {
      margin-left: 5rem;
    }
  }
}
</style>