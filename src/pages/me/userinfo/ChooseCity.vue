<template>
  <div class="choose-location">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">成都</span>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="schools">
        <div class="row" @click="save()" :key="i" v-for="(item, i) in list">
          <span>{{ item }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { _hideLoading, _showLoading, _sleep } from '@/utils'
import { useBaseStore } from '@/store/pinia'

defineOptions({
  name: 'ChooseCity'
})

const store = useBaseStore()
const list = ref([
  '河北',
  '山西',
  '辽宁',
  '吉林',
  '黑龙江',
  '江苏',
  '浙江',
  '安徽',
  '福建',
  '江西',
  '山东',
  '河南',
  '湖北',
  '湖南',
  '广东',
  '海南',
  '四川',
  '贵州',
  '云南',
  '陕西',
  '甘肃',
  '青海',
  '台湾',
  '内蒙古',
  '广西',
  '西藏',
  '宁夏',
  '新疆',
  '北京',
  '天津',
  '上海',
  '重庆',
  '香港',
  '澳门'
])

async function save() {
  _showLoading()
  store.userinfo = { ...store.userinfo, ...{ location: '中国-四川-成都' } }
  await _sleep(500)
  _hideLoading()
  history.go(-3)
}
</script>

<style scoped lang="less">
@import '../../../assets/less/index';

.choose-location {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  color: white;
  overflow: auto;

  .content {
    padding-top: 60rem;

    .nearby {
      .title {
        padding: 10rem 20rem;

        img {
          width: 10rem;
          height: 10rem;
          margin-right: 2rem;
        }
      }
    }

    .row {
      padding: 0 15rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50rem;
      font-size: 14rem;
      transition: all 0.1s;
      background: var(--main-bg);

      .right {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--second-text-color);

        img {
          margin-left: 10rem;
          width: 15px;
        }
      }

      &:active {
        background: var(--active-main-bg);
        color: var(--second-text-color);
      }
    }
  }
}
</style>
