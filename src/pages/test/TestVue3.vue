<template>
  <div id="Test6">
    <p>第{{year}}年</p>
  </div>


</template>
<script>
import {ref} from "vue";

export default {
  name: "Test6",
  components: {},
  props: {
    modelValue: false
  },
  setup() {
    const year = ref(0)
    setInterval(() => {
      year.value++
    }, 1000)
    return {
      year
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {
  },
  methods: {}
}
</script>

<style scoped lang="less">
@import "@/assets/less/index";

#Test6 {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 1.4rem;

  .content {
    padding-top: 6rem;
  }
}
</style>
