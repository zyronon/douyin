<template>
  <div id="Test">
    <ul>
      <li v-for="item in list" @click="go">{{ item }} -- Test1</li>
    </ul>
    <button @click="$router.push('TestKeepAlivePage1')">go2</button>
  </div>
</template>
<script>
export default {
  name: "Test",
  components: {},
  props: {
    modelValue: false
  },
  data() {
    return {
      list: 0
    }
  },
  computed: {},
  watch: {},
  created() {
    setTimeout(() => {
      this.list = 50
    }, 1000)
  },
  methods: {
    go(){
      // this.$router.push('TestKeepAlivePage1')
      this.$router.push('/message/all')
    }
  }
}
</script>
<style lang="less">
#Test {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  color: white;
  font-size: 1.6rem;
  overflow: auto;

  li {
    padding: 1rem;
  }
}
</style>
