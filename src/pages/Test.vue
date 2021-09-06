<template>
  <div class="Test">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">申报学校信息</span>
      </template>
    </BaseHeader>
    <div class="content">
      <ConfirmDialog
          title="设置备注名"
          ok-text="确认"
          v-model:visible="showFollowSetting"
      >
        <Search mode="light" v-model="t" :isShowSearchIcon="false"/>
      </ConfirmDialog>
    </div>
  </div>
</template>
<script>

import ConfirmDialog from "../components/dialog/ConfirmDialog";
import Search from "../components/Search";

export default {
  name: "Test",
  components: {
    ConfirmDialog,
    Search
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
@import "../assets/scss/index";


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
