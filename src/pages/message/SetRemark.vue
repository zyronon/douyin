<template>
  <div class="edit-item">
    <BaseHeader @back="back">
      <template v-slot:center>
        <span class="f16">修改备注名</span>
      </template>
      <template v-slot:right>
        <div>
          <span class="f16" :class="isChanged ? 'save-yes' : 'save-no'" @click="save">保存</span>
        </div>
      </template>
    </BaseHeader>

    <div class="content">
      <div class="notice">备注名</div>
      <div class="input-ctn" style="margin-bottom: 1rem">
        <input type="text" v-model="remark" placeholder="请输入备注名" />
        <img
          v-if="remark.length"
          class="close"
          src="../../assets/img/icon/close.svg"
          alt=""
          @click="remark = ''"
        />
      </div>
      <div class="num">{{ remark.length }}/20</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SetRemark',
  data() {
    return {
      remark: '',
      oldRemark: ''
    }
  },
  computed: {
    isChanged() {
      return this.remark !== this.oldRemark
    }
  },
  created() {},
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
      this.$showLoading()
      await this.$sleep(500)
      this.$hideLoading()
      this.$back()
    }
  }
}
</script>

<style scoped lang="less">
@import '../../assets/less/index';

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
  }
}
</style>
