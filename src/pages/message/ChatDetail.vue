<template>
  <div id="ChatDetail">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">聊天详情</span>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="peoples">
        <People v-for="item in list " :people="item"></People>
      </div>
      <div class="setting">
        <div class="row">
          <div class="left">消息免打扰</div>
          <div class="right">
            <switches v-model="noMessage" theme="bootstrap" color="success"></switches>
          </div>
        </div>
        <div class="row">
          <div class="left">置顶聊天</div>
          <div class="right">
            <switches v-model="top" theme="bootstrap" color="success"></switches>
          </div>
        </div>
        <div class="row" @click="$nav('/set-remark')">
          <div class="left">设备备注</div>
          <div class="right">
            <back direction="right" scale="1.2" ></back>
          </div>
        </div>
        <!-- TODO 没做        -->
        <div class="row">
          <div class="left">举报</div>
          <div class="right">
            <back direction="right" scale="1.2" ></back>
          </div>
        </div>
        <div class="row" @click="blockDialog = true">
          <div class="left">拉黑</div>
          <div class="right">
            <back direction="right" scale="1.2" ></back>
          </div>
        </div>
      </div>
    </div>
    <BlockDialog v-model="blockDialog"/>
  </div>
</template>
<script>
import Switches from './components/swtich/switches';
import People from "../people/components/People";
import FromBottomDialog from "../../components/dialog/FromBottomDialog";
import BlockDialog from "./components/BlockDialog";

export default {
  name: "ChatDetail",
  components: {
    Switches,
    People,
    FromBottomDialog,
    BlockDialog
  },
  data() {
    return {
      noMessage: false,
      top: false,
      blockDialog: false,
      list: [
        {
          type: 1,
          name: 'A'
        },
        {
          type: 6,
          name: '多人聊天'
        },
      ]
    }
  },
  computed: {},
  created() {
  },
  methods: {
    t() {
      this.enabled = !this.enabled
    }
  }
}
</script>

<style scoped lang="less">
@import "../../assets/less/index";

#ChatDetail {
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

    .peoples {
      padding: 0 2rem;

      .People {
        border-bottom: 1px solid @second-btn-color-tran;
      }
    }

    .setting {
      .row {
        padding-left: 2rem;
        padding-right: 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 4rem;

        .right {
          img {
            height: 2rem;
          }
        }
      }
    }
  }


}
</style>
