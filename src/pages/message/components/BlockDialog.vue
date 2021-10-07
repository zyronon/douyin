<template>
  <from-bottom-dialog
      page-id="home-index"
      v-model="modelValue"
      :show-heng-gang="false"
      height="20rem"
      @cancel='cancel'
      mode="white">
    <div class="block-dialog">
      <div class="notice">
        拉黑后，对方将无法搜索到你，也不能再给你发私信
      </div>
      <div class="row red">确认拉黑</div>
      <div class="row">不让 TA 看</div>
      <div class="space"></div>
      <div class="row" @click="cancel">取消</div>
    </div>
  </from-bottom-dialog>
</template>
<script>
import FromBottomDialog from "../../../components/dialog/FromBottomDialog";

export default {
  name: "BlockDialog",
  components: {
    FromBottomDialog
  },
  props: {
    modelValue: false
  },
  data() {
    return {}
  },
  computed: {},
  created() {
  },
  methods: {
    cancel() {
      this.$emit('update:modelValue', false)
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/less/index";

.block-dialog {
  color: black;

  .notice {
    color: @second-text-color;
    font-size: 1.2rem;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .row {
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid gainsboro;

    &:nth-last-child(1) {
      border-top: none;
    }

    &.red {
      color: @primary-btn-color;
    }
  }

  .space {
    height: 1rem;
    background: whitesmoke;
  }
}

</style>
