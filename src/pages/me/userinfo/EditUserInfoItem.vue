<template>
  <div class="edit-item">
    <BaseHeader @back="back">
      <template v-slot:center>
        <span v-if="type === 1" class="f16">修改名字</span>
        <span v-if="type === 2" class="f16">修改抖音号</span>
        <span v-if="type === 3" class="f16">修改简介</span>
      </template>
      <template v-slot:right>
        <div>
          <span class="f16" :class="isChanged ? 'save-yes' : 'save-no'" @click="save">保存</span>
        </div>
      </template>
    </BaseHeader>

    <div class="content">
      <div v-if="type === 1">
        <div class="notice">我的名字</div>
        <div class="input-ctn" style="margin-bottom: 1rem">
          <input type="text" v-model="localUserinfo.nickname" placeholder="记得填写名字哦" />
          <img
            v-if="localUserinfo.nickname"
            style="transform: scale(2)"
            class="close"
            src="../../../assets/img/icon/newicon/close-and-bg.png"
            alt=""
            @click="localUserinfo.nickname = ''"
          />
        </div>
        <div class="num">{{ localUserinfo.nickname.length }}/20</div>
      </div>
      <div class="l-row" v-if="type === 2">
        <div class="notice">我的抖音号</div>
        <div class="input-ctn" style="margin-bottom: 10rem">
          <input type="text" v-model="localUserinfo.unique_id" />
          <img
            v-if="localUserinfo.unique_id"
            style="transform: scale(2)"
            class="close"
            src="../../../assets/img/icon/newicon/close-and-bg.png"
            alt=""
            @click="localUserinfo.unique_id = ''"
          />
        </div>
        <div class="num">最多16个字，只允许包含字母、数字、下划线和点，30天内仅能修改一次</div>
      </div>
      <div class="l-row" v-if="type === 3">
        <div class="notice">个人简介</div>
        <div class="textarea-ctn">
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            v-model="localUserinfo.signature"
            placeholder="你可以填写兴趣爱好、心情愿望，有趣的介绍能让被关注的概率变高噢！"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//TODO 1、数据变了后，保存按钮变亮；2、数据变了，点返回，弹窗是否确认

import { mapState } from 'pinia'
import { useBaseStore } from '@/store/pinia'
import { cloneDeep } from '@/utils'

export default {
  name: 'EditUserInfo',
  setup() {
    const baseStore = useBaseStore()
    return { baseStore }
  },
  data() {
    return {
      type: 1,
      localUserinfo: {}
    }
  },
  computed: {
    isChanged() {
      if (this.type === 1) if (!this.localUserinfo.nickname) return false
      if (this.type === 2) if (!this.localUserinfo.desc) return false
      if (this.userinfo.nickname !== this.localUserinfo.nickname) return true
      if (this.userinfo.desc !== this.localUserinfo.desc) return true
      return this.userinfo.unique_id !== this.localUserinfo.unique_id
    },
    ...mapState(useBaseStore, ['userinfo'])
  },
  created() {
    this.localUserinfo = cloneDeep(this.userinfo)
    this.type = Number(this.$route.query.type)
  },
  methods: {
    back() {
      if (this.isChanged) {
        this.$showSimpleConfirmDialog('是否保存修改', this.save, this.$back)
      } else {
        this.$back()
      }
    },
    async save() {
      if (!this.isChanged) return
      if (this.type === 1) {
        if (!this.localUserinfo.nickname) return this.$notice('名字不能为空')
      }
      this.$showLoading()
      this.baseStore.setUserinfo(this.localUserinfo)
      await this.$sleep(500)
      this.$hideLoading()
      this.$back()
      if (this.type === 3) return this.$notice('新签名保存成功')
    }
  }
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
