<template>
  <div id="TestOne">
<!--    <SlideUser/>-->
    <SlideImgs/>
  </div>
</template>
<script>
import SlideUser from "../../components/slide/SlideUser";
import SlideImgs from "../../components/slide/SlideImgs";

export default {
  name: "TestOne",
  components: {
    SlideUser,
    SlideImgs
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
