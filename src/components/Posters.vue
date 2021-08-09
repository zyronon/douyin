<template>
  <div class="posters">
    <div class="poster-item" v-for="i in list" >
      <img class="poster" src="../assets/img/poster/2.jpg" alt="">
      <div class="num">
        <img class="love" src="../assets/img/icon/love.svg" alt="">
        <span>123.2w</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  /*@click="$nav('/video-detail')"*/
  name: "Posters",
  props: {
    list: {
      type: [Array, Number],
      default: () => {
        return 5
      }
    }
  }
}
</script>

<style scoped lang="scss">
.posters {
  display: grid;
  grid-template-columns: 33.33vw 33.33vw 33.33vw;
  grid-template-rows:calc(33.33vw * 1.2);
}

.poster-item {
  border: 1px solid black;
  overflow: hidden;
  position: relative;

  .poster {
    width: 100%;
    display: block;
  }

  .num {
    color: white;
    position: absolute;
    bottom: 5px;
    left: 5px;
    display: flex;
    align-items: center;
    font-size: 1.4rem;

    .love {
      width: 14px;
      height: 14px;
      margin-right: 5px;
    }
  }
}
</style>