<template>
  <div class="search">
    <img src="../assets/img/icon/pause.svg" alt="">
    <input type="text" placeholder="搜索">
  </div>
</template>

<script>
export default {
  name: "Search"
}
</script>

<style scoped lang="scss">
@import "../assets/scss/color";

.search {
  height: 36px;
  background: rgb(59, 59, 71);
  border-radius: 2px;
  display: flex;
  align-items: center;

  img {
    height: 15px;
    width: 15px;
    margin: 0 10px;
  }

  input {
    font-size: 1.6rem;
    color: white;
    height: 50%;
    width: 100%;
    outline: none;
    border: none;
    background: transparent;

    &::-webkit-input-placeholder {
      color: $second-text-color;
    }
  }
}

</style>