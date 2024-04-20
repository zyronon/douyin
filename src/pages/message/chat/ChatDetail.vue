<template>
  <div id="ChatDetail">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">聊天详情</span>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="peoples">
        <People
          @follow="follow(index)"
          @unfollow="unfollow(index)"
          mode="normal-add-button"
          :key="index"
          v-for="(item, index) in data.list"
          :people="item"
        />
        <div class="add-people" @click="nav('/message/share-to-friend')">
          <img src="../../../assets/img/icon/message/chat/add.png" alt="" class="head-image" />
          <div class="name">多人聊天</div>
        </div>
      </div>
      <div class="setting">
        <div class="row">
          <div class="left">消息免打扰</div>
          <div class="right">
            <switches v-model="data.noMessage" theme="bootstrap" color="success"></switches>
          </div>
        </div>
        <div class="row">
          <div class="left">置顶聊天</div>
          <div class="right">
            <switches v-model="data.top" theme="bootstrap" color="success"></switches>
          </div>
        </div>
        <div class="row" @click="nav('/set-remark')">
          <div class="left">设备备注</div>
          <div class="right">
            <dy-back direction="right" scale=".7"></dy-back>
          </div>
        </div>
        <div class="row" @click="nav('/home/report', { mode: 'chat' })">
          <div class="left">举报</div>
          <div class="right">
            <dy-back direction="right" scale=".7"></dy-back>
          </div>
        </div>
        <div class="row" @click="data.blockDialog = true">
          <div class="left">拉黑</div>
          <div class="right">
            <dy-back direction="right" scale=".7"></dy-back>
          </div>
        </div>
      </div>
    </div>
    <BlockDialog v-model="data.blockDialog" />
  </div>
</template>
<script setup lang="ts">
import Switches from '../components/swtich/switches.vue'
import People from '../../people/components/People.vue'
import BlockDialog from '../components/BlockDialog.vue'
import CONST_VAR from '../../../utils/const_var'
import { onMounted, reactive } from 'vue'
import { useNav } from '@/utils/hooks/useNav'
import { _showConfirmDialog } from '@/utils'

defineOptions({
  name: 'ChatDetail'
})

const nav = useNav()
const data = reactive({
  noMessage: false,
  top: false,
  blockDialog: false,
  list: [
    {
      id: '224e9a00-ffa0-4bc1-bb07-c318c7b02fa5',
      avatar: new URL('../../../assets/img/icon/avatar/1.png', import.meta.url).href,
      name: '何以为家',
      sex: '',
      age: null,
      idCard: null,
      phone: '',
      address: null,
      wechat: '',
      password: null,
      lastLoginTime: '1629993515',
      createTime: '1630035089',
      isDelete: 0,
      account: '234',
      pinyin: 'M',
      select: false,
      type: CONST_VAR.RELATE_ENUM.FOLLOW_EACH_OTHER
    }
  ]
})

onMounted(() => {})

function follow(index) {
  if (data.list[index].type === CONST_VAR.RELATE_ENUM.FOLLOW_ME) {
    data.list[index].type = CONST_VAR.RELATE_ENUM.FOLLOW_EACH_OTHER
  }
}

function unfollow(index) {
  _showConfirmDialog(
    '正在与对方相互关注，是否不再关注该用户',
    null,
    'gray',
    () => {
      data.list[index].type = CONST_VAR.RELATE_ENUM.FOLLOW_ME
    },
    () => {},
    '取消关注',
    '返回'
  )
}
</script>

<style scoped lang="less">
@import '../../../assets/less/index';

#ChatDetail {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 14rem;

  .content {
    padding-top: 60rem;

    .peoples {
      padding: 0 20rem;

      .People {
        border-bottom: 1px solid var(--second-btn-color-tran);
      }

      .add-people {
        transition: all 0.3s ease;
        width: 100%;
        height: 70rem;
        display: flex;
        align-items: center;
        position: relative;
        border-bottom: 1px solid var(--second-btn-color-tran);

        .head-image {
          margin-right: 15rem;
          width: 45rem;
          height: 45rem;
          border-radius: 50%;
        }
      }
    }

    .setting {
      .row {
        padding-left: 20rem;
        padding-right: 20rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 40rem;

        .right {
          img {
            height: 20rem;
          }
        }
      }
    }
  }
}
</style>
