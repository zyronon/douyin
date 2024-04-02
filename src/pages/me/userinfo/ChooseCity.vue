<template>
  <div class="choose-location">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">成都</span>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="schools">
        <div class="row" @click="save(item)" :key="i" v-for="(item, i) in list">
          <span>{{ item }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useBaseStore } from '@/store/pinia'

export default {
  name: 'ChooseProvince',
  setup() {
    const baseStore = useBaseStore()
    return { baseStore }
  },
  data() {
    return {
      list: [
        '成都',
        '自贡',
        '攀枝花',
        '泸州',
        '德阳',
        '绵阳',
        '广元',
        '遂宁',
        '内江',
        '乐山',
        '南充',
        '眉山',
        '宜宾',
        '广安',
        '达州',
        '雅安',
        '巴中',
        '资阳',
        '阿坝',
        '甘孜',
        '凉山'
      ]
    }
  },
  computed: {
    ...mapState(useBaseStore, ['userinfo'])
  },
  methods: {
    async save() {
      this.$showLoading()
      let data = { ...this.userinfo, ...{ location: '中国-四川-成都' } }
      this.baseStore.setUserinfo(data)
      await this.$sleep(500)
      this.$hideLoading()
      history.go(-3)
    }
  }
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
