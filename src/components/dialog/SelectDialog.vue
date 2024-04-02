<template>
  <div class="SelectDialog" @click="$emit('cancel')">
    <div class="content">
      <div class="item" :key="i" v-for="(item, i) in list" @click.stop="$emit('ok', item)">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SelectDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped lang="less">
.SelectDialog {
  z-index: 10;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #000000bb;
  display: flex;
  justify-content: center;
  align-items: center;

  .content {
    background: white;
    width: 80%;
    padding: 5rem 0;
    border-radius: 2px;
    box-sizing: border-box;

    .item {
      font-size: 15rem;
      padding: 15rem 20rem;
      transition: all 0.2s;

      &:active {
        background: darkgray;
      }
    }
  }
}
</style>
