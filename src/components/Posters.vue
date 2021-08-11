<template>
  <div class="posters">
    <div class="poster-item" v-for="i in list">
      <img class="poster" :src="i.src" alt="">
      <div class="num">
        <img class="love" src="../assets/img/icon/love.svg" alt="">
        <span>{{ likeNum(i.like) }}</span>
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
        return []
      }
    }
  },
  methods: {
    likeNum(num) {
      if (num < 1000) {
        return num
      } else {
        return parseInt(num / 10000) + 'w'
      }
    }
  }
}
</script>

<style scoped lang="scss">
.posters {
  display: grid;
  grid-template-columns: 33.33vw 33.33vw 33.33vw;
}

.poster-item {
  height: calc(33.33vw * 1.2);
  border: 1px solid black;
  overflow: hidden;
  position: relative;

  .poster {
    width: 100%;
    height: 100%;
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