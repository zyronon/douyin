<template>
  <div class="VideoCollect">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">视频收藏</span>
      </template>
    </BaseHeader>
    <div class="content">
      <Posters mode="normal" :list="videos"/>
      <NoMore/>
    </div>
  </div>
</template>
<script>
import resource from "../../../assets/data/resource";
import Posters from "../../../components/Posters";

export default {
  name: "VideoCollect",
  components: {
    Posters
  },
  props: {
    modelValue: false
  },
  data() {
    return {
      loading: false,
      videos: resource.my,
    }
  },
  computed: {},
  created() {
  },
  methods: {}
}
</script>

<style scoped lang="less">
@import "../../../assets/scss/index";

.VideoCollect {
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
