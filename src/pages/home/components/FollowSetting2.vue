<template>
  <from-bottom-dialog
    page-id="home-index"
    :modelValue="modelValue"
    @update:modelValue="(e) => $emit('update:modelValue', e)"
    :show-heng-gang="false"
    maskMode="dark"
    @cancel="cancel()"
    height="330rem"
    mode="light"
  >
    <div class="follow-setting-dialog">
      <div class="dialog-header">
        <div class="title-wrapper">
          <span class="title">{{ currentItem.author.nickname }}</span>
          <span class="subtitle">抖音号：{{ _getUserDouyinId(currentItem) }}</span>
        </div>
        <dy-back mode="dark" img="close" direction="right" @click="cancel()"></dy-back>
      </div>
      <div class="l-rows">
        <div class="l-row">
          <div class="left">不让TA看</div>
          <div class="right">
            <switches v-model="switches1" theme="bootstrap" color="success"></switches>
          </div>
        </div>
        <div class="l-row">
          <div class="left">在关注列表中置顶</div>
          <div class="right">
            <switches v-model="switches1" theme="bootstrap" color="success"></switches>
          </div>
        </div>
        <div class="l-row" @click="cancel((e) => $emit('cancelFollow'))">
          <div class="left">取消关注</div>
          <div class="right">
            <img src="../../../assets/img/icon/components/follow/reduce.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </from-bottom-dialog>
</template>
<script>
import FromBottomDialog from '../../../components/dialog/FromBottomDialog'
import Switches from '../../message/components/swtich/switches'
import { DefaultUser } from '@/utils/const_var'
import { _getUserDouyinId } from '@/utils'

export default {
  name: 'FollowSetting',
  components: {
    FromBottomDialog,
    Switches
  },
  props: {
    currentItem: {
      type: Object,
      default() {
        return {
          user: DefaultUser,
          isRequest: false,
          post: []
        }
      }
    },
    modelValue: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      switches1: false,
      switches2: false
    }
  },
  computed: {},
  created() {},
  methods: {
    _getUserDouyinId,
    cancel(cb) {
      this.$emit('update:modelValue', false)
      cb && cb()
    }
  }
}
</script>

<style scoped lang="less">
@import '../../../assets/less/index';

.follow-setting-dialog {
  padding: 15rem;
  font-size: 14rem;

  .dialog-header {
    color: rgb(81, 81, 89);
    font-size: 14rem;
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    .title-wrapper {
      display: flex;
      flex-direction: column;
    }

    .title {
      font-size: 18rem;
    }

    .subtitle {
      margin-top: 5rem;
      color: var(--second-text-color);
      font-size: 13rem;
    }

    img {
      width: 14rem;
      height: 14rem;
      padding: 6rem;
      border-radius: 50%;
      background: rgba(187, 187, 194, 0.4);
    }
  }

  .options {
    margin-top: 20rem;
    display: flex;
    justify-content: space-between;

    .option {
      box-sizing: border-box;
      padding: 10rem;
      display: flex;
      background: white;
      flex-direction: column;
      align-items: center;
      width: 23%;
      font-size: 12rem;
      border-radius: 8rem;

      img {
        margin-top: 5rem;
        margin-bottom: 10rem;
        @width: 20rem;
        width: @width;
        height: @width;
      }
    }
  }

  .l-rows {
    margin-top: 20rem;

    .l-row {
      height: 45rem;
      padding: 0 20rem;
      background: white;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(222, 222, 222, 0.42);

      &:nth-child(1) {
        border-radius: 10rem 10rem 0 0;
      }

      &:nth-child(3) {
        border-bottom: none;
        border-radius: 0 0 10rem 10rem;
      }

      img {
        width: 20rem;
        height: 20rem;
      }
    }
  }
}
</style>
