<template>
  <div class="RequestUpdate" id="RequestUpdate">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">我的求更新记录</span>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="request">
        <div class="list">
          <div class="item" v-for="item in friends.all">
            <div class="left">
              <img :src='$imgPreview(item.avatar)'>
              <span class="name">{{ item.name }}</span>
            </div>
            <span class="time">{{ $dateFormat(item.lastLoginTime,'D') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from "vuex";
import FromBottomDialog from "../../components/dialog/FromBottomDialog";

export default {
  name: "RequestUpdate",
  components: {FromBottomDialog},
  data() {
    return {}
  },
  computed: {
    ...mapState(['friends'])
  },
  created() {
  },
  methods: {}
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


    .request {
      .list {

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

  }
}
</style>
