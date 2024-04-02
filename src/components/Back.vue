<template>
  <img class="close" ref="img" :src="src" />
</template>
<script>
export default {
  name: 'Back',
  props: {
    mode: {
      type: String,
      default: 'gray'
    },
    img: {
      type: String,
      default: 'back'
    },
    direction: {
      type: String,
      default: 'left'
    },
    scale: {
      type: [Number, String],
      default: 1
    }
  },
  data() {
    return {}
  },
  computed: {
    src() {
      return new URL(`../assets/img/icon/components/${this.mode}-${this.img}.png`, import.meta.url)
        .href
    }
  },
  mounted() {
    this.$setCss(
      this.$refs.img,
      'transform',
      `rotate(${this.direction === 'left' ? '0' : '180'}deg) scale(${this.scale})`
    )
  },
  methods: {}
}
</script>

<style scoped lang="less">
img {
  width: 20rem;
}
</style>
