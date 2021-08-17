<template>
  <img ref="img" :src="src"/>
</template>
<script>
export default {
  name: "Back",
  props: {
    mode: {
      type: String,
      default: 'gray',//white
    },
    isClose: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: 'left',
    },
    scale: {
      type: [Number, String],
      default: 1,
    },
  },
  data() {
    return {
      // src: require(`../assets/img/icon/components/back-${this.mode}.png`)
    }
  },
  computed: {
    src() {
      if (this.isClose) {
        return require(`../assets/img/icon/components/close-${this.mode}.png`)
      }
      return require(`../assets/img/icon/components/back-${this.mode}.png`)
    }
  },
  mounted() {
    this.$setCss(this.$refs.img, 'transform', `rotate(${this.direction === 'left' ? '0' : '180'}deg) scale(${this.scale})`)
  },
  methods: {}
}
</script>

<style scoped lang="scss">
img {
  width: 2rem;
}
</style>
