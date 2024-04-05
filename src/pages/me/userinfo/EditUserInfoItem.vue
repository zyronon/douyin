<template>
  <div class="edit-item">
    <BaseHeader @back="back">
      <template v-slot:center>
        <span v-if="data.type === 1" class="f16">修改名字</span>
        <span v-if="data.type === 2" class="f16">修改抖音号</span>
        <span v-if="data.type === 3" class="f16">修改简介</span>
      </template>
      <template v-slot:right>
        <div>
          <span class="f16" :class="isChanged ? 'save-yes' : 'save-no'" @click="save">保存</span>
        </div>
      </template>
    </BaseHeader>

    <div class="content">
      <div v-if="data.type === 1">
        <div class="notice">我的名字</div>
        <div class="input-ctn" style="margin-bottom: 1rem">
          <input type="text" v-model="data.localUserinfo.nickname" placeholder="记得填写名字哦" />
          <img
            v-if="data.localUserinfo.nickname"
            style="transform: scale(2)"
            class="close"
            src="../../../assets/img/icon/newicon/close-and-bg.png"
            alt=""
            @click="data.localUserinfo.nickname = ''"
          />
        </div>
        <div class="num">{{ data.localUserinfo.nickname.length }}/20</div>
      </div>
      <div class="l-row" v-if="data.type === 2">
        <div class="notice">我的抖音号</div>
        <div class="input-ctn" style="margin-bottom: 10rem">
          <input type="text" v-model="data.localUserinfo.unique_id" />
          <img
            v-if="data.localUserinfo.unique_id"
            style="transform: scale(2)"
            class="close"
            src="../../../assets/img/icon/newicon/close-and-bg.png"
            alt=""
            @click="data.localUserinfo.unique_id = ''"
          />
        </div>
        <div class="num">最多16个字，只允许包含字母、数字、下划线和点，30天内仅能修改一次</div>
      </div>
      <div class="l-row" v-if="data.type === 3">
        <div class="notice">个人简介</div>
        <div class="textarea-ctn">
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            v-model="data.localUserinfo.signature"
            placeholder="你可以填写兴趣爱好、心情愿望，有趣的介绍能让被关注的概率变高噢！"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//TODO 1、数据变了后，保存按钮变亮；2、数据变了，点返回，弹窗是否确认

import { useBaseStore } from '@/store/pinia'
import {
  _hideLoading,
  _notice,
  _showLoading,
  _showSimpleConfirmDialog,
  _sleep,
  cloneDeep
} from '@/utils'
import { computed, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

defineOptions({
  name: 'EditUserInfo'
})
const store = useBaseStore()
const router = useRouter()
const route = useRoute()
const data = reactive({
  type: 1,
  localUserinfo: {
    nickname: '',
    signature: '',
    unique_id: '',
    desc: ''
  }
})
const isChanged = computed(() => {
  if (data.type === 1) if (!data.localUserinfo.nickname) return false
  if (data.type === 2) if (!data.localUserinfo.desc) return false
  if (store.userinfo.nickname !== data.localUserinfo.nickname) return true
  if (store.userinfo.desc !== data.localUserinfo.desc) return true
  return store.userinfo.unique_id !== data.localUserinfo.unique_id
})

onMounted(() => {
  data.localUserinfo = cloneDeep(store.userinfo)
  data.type = Number(route.query.type)
})

function back() {
  if (isChanged.value) {
    _showSimpleConfirmDialog('是否保存修改', save, router.back)
  } else {
    router.back()
  }
}

async function save() {
  if (!isChanged.value) return
  if (data.type === 1) {
    if (!data.localUserinfo.nickname) return _notice('名字不能为空')
  }
  _showLoading()
  store.setUserinfo(data.localUserinfo)
  await _sleep(500)
  _hideLoading()
  router.back()
  if (data.type === 3) return _notice('新签名保存成功')
}
</script>

<style scoped lang="less">
@import '../../../assets/less/index';

.edit-item {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;

  .save-yes {
    color: var(--primary-btn-color);
  }

  .save-no {
    color: var(--disable-primary-btn-color);
  }

  .content {
    padding: 20rem;
    padding-top: 70rem;

    .notice,
    .num {
      font-size: 12rem;
      color: var(--second-text-color);
    }

    .input-ctn {
      position: relative;
      border-bottom: 1px solid var(--line-color);
      display: flex;
      align-items: center;

      input {
        margin: 5rem 0;
        color: white;
        height: 30rem;
        width: 100%;
        outline: none;
        border: none;
        background: transparent;

        &::placeholder {
          color: var(--second-text-color);
        }
      }

      .close {
        position: absolute;
        right: 0;
        top: 15rem;
        width: 10rem;
      }
    }

    .textarea-ctn {
      width: 100%;
      background: var(--active-main-bg);
      padding: 15rem;
      box-sizing: border-box;
      margin-top: 10rem;
      border-radius: 2px;

      textarea {
        font-family: 'Microsoft YaHei UI';
        outline: none;
        width: 100%;
        border: none;
        background: transparent;
        color: white;

        &::placeholder {
          color: var(--second-text-color);
        }
      }
    }
  }
}
</style>
