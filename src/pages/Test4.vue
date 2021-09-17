<template>
  <div class="Test">
    <base-button type="primary" @click="t = true">test</base-button>
    <ShareToFriend v-model="t"/>
  </div>
</template>
<script>
import ShareToFriend from "./home/components/ShareToFriend";
import BaseButton from "../components/BaseButton";
import Search from "../components/Search";

export default {
  name: "Test4",
  components: {
    BaseButton,
    ShareToFriend,
    Search
  },
  props: {
    text: {
      type: String,
      default: '@喵嗷污说电影创作的原声'
    }
  },
  data() {
    return {
      t: false,
    }
  },
  methods: {},
  mounted() {
  }
}
</script>

<style scoped lang="less">
@import "../assets/scss/index";

.Test {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  font-size: 1.4rem;
  color: white;
}
</style>
