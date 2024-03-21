<template>
  <div>
    test
  </div>
</template>
<script>


export default {
  name: "Test",
  components: {},
  data() {
    return {
      src: '',
      rect: {x: 0, y: 0}
    }
  },
  methods: {
    wheel() {

    }
  },
  mounted() {

  }
}
</script>
<style scoped lang="less">
.body {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  height: calc(var(--vh, 1vh) * 100);
  width: 100vw;
  overflow: hidden;
  transform-origin: 0 0;
}

.wrapper {
  background: black;
  overflow: hidden;
}
</style>
