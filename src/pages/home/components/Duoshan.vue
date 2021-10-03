<template>
  <from-bottom-dialog
      v-model="modelValue"
      @cancel="cancel"
      maskMode="light"
      mode="light">
    <div class="share-to-duoshan">
      <img src="../../../assets/img/icon/components/video/duoshan-logo2.png" class="logo">
      <div class="wrapper">
        <div class="title2">多闪</div>
        <div class="subtitle">开发者：北京拍拍看看科技有限公司；版本：6.8.0</div>
        <div class="subtitle mb2r">
          <span class="link" @click="$nav('/service-protocol',{type:'多闪权限申请与使用情况说明'})">应用权限</span>与
          <span class="link" @click="$nav('/service-protocol',{type:'“抖音”隐私政策'})">隐私政策</span>
        </div>
        <b-button type="dark2">
          <template v-slot:prefix>
            <img src="../../../assets/img/icon/components/video/duoshan-logo.webp">
          </template>
          下载多闪
        </b-button>
      </div>
    </div>
  </from-bottom-dialog>
</template>
<script>
import FromBottomDialog from "../../../components/dialog/FromBottomDialog";

export default {
  name: "Duoshan",
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
    },
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/less/index";

.share-to-duoshan {
  padding: 3rem 2rem;
  min-height: calc(50vh - 6rem);
  //min-height: 50vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;


  .logo {
    height: 12rem;
    width: 12rem;
  }

  .wrapper {
    width: 100%;
  }

  .title2 {
    margin-bottom: 2rem;
    text-align: center;
    font-size: 2rem;
    color: black;
  }

  .subtitle {
    text-align: center;
    font-size: 1.2rem;
    color: @second-text-color;
  }


  .button {
    width: 100%;

    img {
      height: 2.2rem;
      margin-right: .5rem;
    }
  }
}
</style>
