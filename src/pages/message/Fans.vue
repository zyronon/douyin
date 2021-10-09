<template>
  <div class="Fans">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">粉丝</span>
      </template>
    </BaseHeader>
    <div class="content">
      <People v-for="item in friends.all" :people="item" mode="fans"></People>
      <div class="line mt1r"></div>
      <div class="title">
        <span>朋友推荐</span>
        <img src="../../assets/img/icon/about-gray.png" alt="">

      </div>
      <People v-for="item in friends.all" :people="item" mode="recommend"></People>
    </div>
  </div>
</template>
<script>
import {mapState} from "vuex";
import People from "../people/components/People";

export default {
  name: "Fans",
  components: {
    People
  },
  props: {
    modelValue: false
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['userinfo', 'friends'])
  },
  created() {
  },
  methods: {}
}
</script>

<style scoped lang="less">
@import "@/assets/less/index";

.Fans {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 1.4rem;

  .content {
    padding: @padding-page;
    padding-top: 6rem;

    .title {
      margin-top: 1.5rem;
      margin-bottom: 1rem;
      font-size: 1.2rem;
      display: flex;
      align-items: center;

      img {
        margin-left: .5rem;
        width: 1.3rem;
      }
    }
  }
}
</style>
