<template>
  <div class="choose-location">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">中国</span>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="schools">
        <div class="row" @click="nav('/me/choose-city')" :key="i" v-for="(item, i) in list">
          <span>{{ item }}</span>
          <div class="right">
            <dy-back scale=".8" direction="right"></dy-back>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useNav } from '@/utils/hooks/useNav.js'

defineOptions({
  name: 'ChooseProvince'
})

const nav = useNav()
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
  }
}
</style>
