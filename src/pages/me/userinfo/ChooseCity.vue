<template>
  <div class="choose-location">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">成都</span>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="schools">
        <div class="row" @click="save(item)" v-for="item in list">
          <span>{{ item }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {mapState} from "vuex";

export default {
  name: "ChooseProvince",
  data() {
    return {
      list: [
        '成都',
        '自贡',
        '攀枝花',
        '泸州',
        '德阳',
        '绵阳',
        '广元',
        '遂宁',
        '内江',
        '乐山',
        '南充',
        '眉山',
        '宜宾',
        '广安',
        '达州',
        '雅安',
        '巴中',
        '资阳',
        '阿坝',
        '甘孜',
        '凉山',
      ]
    }
  },
  computed: {
    ...mapState({
      userinfo: 'userinfo',
    })
  },
  methods: {
    async save(item) {
      this.$showLoading()
      let data = {...this.userinfo, ...{location: '中国-四川-成都'}}
      this.$store.commit('setUserinfo', data)
      await this.$sleep(500)
      this.$hideLoading()
      history.go(-3)
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