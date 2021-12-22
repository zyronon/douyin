<template>
  <div id="TestOne">
    <RecommendSlideUser/>
  </div>
</template>
<script>
import RecommendSlideUser from "../../components/RecommendSlideUser";

export default {
  name: "TestOne",
  components: {
    RecommendSlideUser
  },
  props: {
    modelValue: false
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

#TestOne {
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
