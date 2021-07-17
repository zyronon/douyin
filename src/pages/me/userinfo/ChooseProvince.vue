<template>
  <div class="choose-location">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">中国</span>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="schools">
        <div class="row" @click="$nav('/choose-city')" v-for="item in list">
          <span>{{ item }}</span>
          <div class="right">
            <img src="../../../assets/img/icon/close-white.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "ChooseProvince",
  data() {
    return {
      list: [
        '河北', '山西', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '海南', '四川', '贵州', '云南', '陕西', '甘肃', '青海', '台湾',
        '内蒙古', '广西', '西藏', '宁夏', '新疆',
        '北京', '天津', '上海', '重庆',
        '香港', '澳门'
      ]
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