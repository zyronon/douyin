<template>
  <div class="Test">
    <!--    <Uploader/>-->
    <TestVideo class="vue"/>
  </div>
</template>
<script>

import ConfirmDialog from "../../components/dialog/ConfirmDialog";
import Search from "../../components/Search";
import Uploader from "../me/Uploader";
import TestVideo from "./TestVideo";

export default {
  name: "Test",
  components: {
    Uploader,
    TestVideo
  },
  props: {},
  data() {
    return {
      showFollowSetting: true,
      switches1: true,
    }
  },
  computed: {},
  created() {
  },
  methods: {}
}
</script>

<style scoped lang="less">
@import "../../assets/less/index";


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
