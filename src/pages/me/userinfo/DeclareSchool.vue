<template>
  <div class="declare-school">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">申报学校信息</span>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="row">
        <div class="label">学校全称</div>
        <input type="text" placeholder="请输入学校全称(必填)" v-model="data.form.name" />
      </div>
      <div class="row" v-if="data.type === 1">
        <div class="label">所在城市</div>
        <input type="text" placeholder="请输入学校所在城市(必填)" v-model="data.form.location" />
      </div>
      <div class="department-row" v-if="data.type === 2">
        <div class="label">信息问题</div>
        <div class="right">
          <span>点击选择(必选)</span>
          <img src="../../../assets/img/icon/back.png" alt="" />
        </div>
      </div>
      <div class="notice">感谢你的反馈，我们将尽快核对信息</div>
      <div class="btn" @click="submit">提交</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { _notice } from '@/utils'

defineOptions({
  name: 'DeclareSchool'
})

const router = useRouter()
const route = useRoute()
const data = reactive({
  form: {
    name: '',
    location: '',
    departmentInfoType: ''
  },
  type: 1
})

//TODO 院系点击那个弹窗没做
onMounted(() => {
  data.type = Number(route.query.type)
})

function submit() {
  if (!data.form.name) return _notice('请输入学校全称')
  if (data.type === 1 && !data.form.location) return _notice('请输入学校所在城市')
  if (data.type === 2 && !data.form.departmentInfoType) return _notice('请选择信息问题')
  _notice('申报成功')
  setTimeout(router.back, 1000)
}
</script>

<style scoped lang="less">
@import '../../../assets/less/index';

.declare-school {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  .content {
    padding: 70rem 20rem 0 20rem;

    .row {
      display: flex;
      align-items: center;

      .label {
        color: white;
        font-size: 16rem;
        margin-right: 30rem;
      }

      input {
        flex: 1;
        height: 40rem;
        background: transparent;
        outline: none;
        border-top: none;
        border-right: none;
        border-left: none;
        border-bottom: 1px solid var(--line-color);
        color: white;
      }
    }

    .department-row {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .label {
        color: white;
        font-size: 16rem;
        margin-right: 30rem;
      }

      .right {
        padding: 12rem 0;
        display: flex;
        align-items: center;
        color: var(--second-text-color);

        img {
          margin-left: 5px;
          width: 12rem;
        }
      }
    }

    .notice {
      margin-top: 20rem;
      color: var(--second-text-color);
    }

    .btn {
      position: fixed;
      bottom: 20rem;
      left: 20rem;
      right: 20rem;
      color: white;
      font-size: 16rem;
      background: var(--primary-btn-color);
      text-align: center;
      padding: 10rem 0;
      border-radius: 2px;
    }
  }
}
</style>
