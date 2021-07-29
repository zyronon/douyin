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
    direction: {
      type: String,
      default: 'left',
    },
    scale: {
      type: [Number,String],
      default: 1,
    },
  },
  data() {
    return {
      src: require(`../assets/img/icon/back-${this.mode}.png`)
    }
  },
  computed: {},
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
