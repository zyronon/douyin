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
        <input type="text" v-model="data.remark" placeholder="请输入备注名" />
        <img
          v-if="data.remark.length"
          class="close"
          src="../../assets/img/icon/close.svg"
          alt=""
          @click="data.remark = ''"
        />
      </div>
      <div class="num">{{ data.remark.length }}/20</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { _hideLoading, _showLoading, _showSimpleConfirmDialog, _sleep } from '@/utils'

defineOptions({
  name: 'SetRemark'
})

const router = useRouter()
const data = reactive({
  remark: '',
  oldRemark: ''
})

const isChanged = computed(() => {
  return data.remark !== data.oldRemark
})
onMounted(() => {})

function back() {
  if (isChanged.value) {
    _showSimpleConfirmDialog('是否保存修改', save, router.back)
  } else {
    router.back()
  }
}

async function save() {
  if (!isChanged.value) return
  _showLoading()
  await _sleep(500)
  _hideLoading()
  router.back()
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
