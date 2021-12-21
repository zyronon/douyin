<template>
  <div id="TestOne">
    <SlideUser class="vue"></SlideUser>
  </div>
</template>
<script>
import SlideUser from "../../components/SlideUser";

export default {
  name: "TestOne",
  components: {
    SlideUser
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
