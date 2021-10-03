<template>
  <div class="Test">
    <Uploader/>
  </div>
</template>
<script>

import ConfirmDialog from "../components/dialog/ConfirmDialog";
import Search from "../components/Search";
import Uploader from "./me/Uploader";

export default {
  name: "Test",
  components: {
    Uploader
  },
  props: {},
  data() {
    return {
      showFollowSetting: true,
      switches1: true,
      t: ''
    }
  },
  computed: {},
  created() {
  },
  methods: {}
}
</script>

<style scoped lang="less">
@import "../assets/less/index";


.Test {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  font-size: 1.4rem;

  .content {
    padding-top: 6rem;

    .private-chat {

    }
  }


}
</style>
