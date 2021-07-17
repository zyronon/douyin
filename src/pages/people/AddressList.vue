<template>
  <div class="AddressList">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">手机通讯录</span>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="recommend">
        <div class="title">
          <div class="left">
            已有20+位朋友加入抖音
          </div>
        </div>
        <div class="list">
          <People v-for="item in list " :people="item"></People>
        </div>
      </div>
      <div class="footer">
        为尊重用户选择，仅展示已授权用户
      </div>
    </div>
  </div>
</template>
<script>
import People from './components/People'

export default {
  name: "AddressList",
  components: {
    People,
  },
  data() {
    return {
      list: [
        {
          type: 5,
        },
      ]
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/index";

.AddressList {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;

  .content {
    padding-top: 6rem;

    .recommend {
      .title {
        padding: 20px 20px 10px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
          color: $second-text-color;

          img {
            width: 10px;
            height: 10px;
          }
        }

        .right {
          border-radius: 50%;
          background: $second-text-color;
          padding: 5px;
          width: 10px;
          height: 10px;
        }
      }
    }

    .footer {
      text-align: center;
      line-height: 6rem;
      height: 6rem;
      color: $second-text-color;

    }

  }
}
</style>
