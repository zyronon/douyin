<template>
  <div class="choose-location">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">选择地区</span>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="row" @click="save">暂不设置</div>
      <div class="line" style="width: calc(100% - 4rem);margin-left: 2rem;"></div>
      <div class="nearby">
        <div class="title">
          <img src="../../../assets/img/icon/location.svg" alt="">
          <span>当前位置</span>
        </div>
        <div class="row">无法获取</div>
      </div>
      <div class="line" style="width: calc(100% - 4rem);margin-left: 2rem;"></div>
      <div class="schools">
        <div class="row" @click="$nav('/choose-province')">
          <span>中国</span>
          <div class="right">
            <img src="../../../assets/img/icon/close-white.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {mapState} from "vuex";

export default {
  name: "ChooseLocation",
  computed: {
    ...mapState({
      userinfo: 'userinfo',
    })
  },
  methods: {
    async save(item) {
      this.$showLoading()
      let data = {...this.userinfo, ...{location: '暂不设置'}}
      this.$store.commit('setUserinfo', data)
      await this.$sleep(500)
      this.$hideLoading()
      this.$back()
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../assets/scss/index";

.choose-location {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  color: white;
  overflow: auto;

  .content {
    padding-top: 6rem;

    .nearby {

      .title {
        padding: 1rem 2rem;

        img {
          width: 1rem;
          height: 1rem;
          margin-right: .2rem;
        }
      }

    }

    .row {
      padding: 0 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 5rem;
      font-size: 1.4rem;
      transition: all .1s;
      background: $main-bg;

      .right {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: $second-text-color;

        img {
          margin-left: 1rem;
          width: 15px;
        }
      }

      &:active {
        background: $active-main-bg;
        color: $second-text-color;
      }
    }
  }
}

</style>