<template>
  <div id="Test2">
    <ul>
      <li v-for="item in list" >{{ item }} -- Test2</li>
    </ul>
    <button @click="$back()">返回</button>
  </div>
</template>
<script>
export default {
  name: "Test2",
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
    setTimeout(()=>{
      this.list = 50
    },1000)
  },
  methods: {}
}
</script>

<style lang="less">
#Test2 {
  color: white;
  font-size: 1.6rem;

  li {
    padding: 1rem;
  }
}
</style>
