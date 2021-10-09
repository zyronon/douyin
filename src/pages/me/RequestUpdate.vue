<template>
  <div class="RequestUpdate" id="RequestUpdate">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">求更新</span>
      </template>
      <template v-slot:right>
        <div>
          <img src="../../assets/img/icon/menu-gray.png" style="width: 2rem;" @click="isShowOption = true">
        </div>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="none" v-if="false">
        <img src="../../assets/img/icon/none-bg1.webp" alt="">
        <div class="title">暂时还没有粉丝点击“求更新”</div>
        <div class="subtitle">当粉丝期待你的新作品时，会点击“求更新”提醒你</div>
      </div>
      <div class="request">
        <div class="title">近7天收到1次求更新</div>
        <div class="subtitle">上次发布作品：2020-08-01 上次开播：昨天23:12</div>
        <div class="list">
          <div class="item" v-for="item in friends.all">
            <div class="left">
              <img :src='$imgPreview(item.avatar)'>
              <span class="name">{{ item.name }}</span>
            </div>
            <span class="time">{{ $dateFormat(item.lastLoginTime,'D') }}</span>
          </div>
        </div>
        <no-more>最多展示100位粉丝的历史求更新记录</no-more>
      </div>
    </div>
    <div class="buttons">
      <b-button type="white" :border="false" :active="false" @click="$nav('/publish')">发布作品</b-button>
      <b-button type="primary" :active="false" @click="$no">去直播</b-button>
    </div>

    <from-bottom-dialog
        page-id="RequestUpdate"
        height="16rem"
        :show-heng-gang="false"
        mode="white"
        v-model="isShowOption">
      <div class="l-row" @click="toggleRequestUpdate">
        {{ openRequestUpdate ? '关闭' : '开启' }}求更新提醒
      </div>
      <div class="l-row" @click="$nav('/me/my-request-update')">
        我的求更新提醒
      </div>
      <div class="space"></div>
      <div class="l-row" @click="isShowOption = false">
        取消
      </div>
    </from-bottom-dialog>
  </div>
</template>
<script>
import {mapState} from "vuex";
import FromBottomDialog from "../../components/dialog/FromBottomDialog";

export default {
  name: "RequestUpdate",
  components: {FromBottomDialog},
  data() {
    return {
      isShowOption: false,
      openRequestUpdate: true,
    }
  },
  computed: {
    ...mapState(['friends'])
  },
  created() {
  },
  methods: {
    toggleRequestUpdate() {
      this.openRequestUpdate = !this.openRequestUpdate
      this.isShowOption = false
      if (this.openRequestUpdate) {
        this.$notice('提醒已开启，再次点击可关闭')
      } else {
        this.$notice('提醒已关闭，再次点击可开启')
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "../../assets/less/index";

.RequestUpdate {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 1.4rem;

  .content {
    padding: 6rem 1.5rem 6rem 1.5rem;

    .none {
      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        margin-top: 10rem;
        height: 12rem;
      }
    }

    .request {
      .list {
        margin-top: 2rem;
        border-top: 1px solid #cccccc11;

        .item {
          padding: 1rem 0;

          display: flex;
          justify-content: space-between;
          align-items: center;

          .left {
            display: flex;
            align-items: center;
            @width: 4.2rem;

            img {
              width: @width;
              height: @width;
              border-radius: 50%;
              margin-right: 1rem;
            }
          }

          .time{
            font-size: 1.2rem;
            color: @second-text-color;
          }
        }
      }
    }

    .title {
      margin-top: 1rem;
      font-size: 1.6rem;
    }

    .subtitle {
      margin-top: 1rem;
      font-size: 1.4rem;
      color: @second-text-color;
    }
  }

  .l-row {
    padding: 1.5rem;
    color: black;
    text-align: center;

    &:nth-child(2) {
      border-bottom: 1px solid gainsboro;
    }
  }

  .space {
    height: 1rem;
    background: whitesmoke;
  }

  .buttons {
    position: fixed;
    padding: 0 1.5rem 1.5rem 1.5rem;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    background: @main-bg;

    .button {
      flex: 1;

      &:nth-child(1) {
        margin-right: 0.5rem;
      }

      &:nth-child(2) {
        margin-left: 0.5rem;
      }
    }
  }

}
</style>
