<template>
  <div id="Peoples">
    <transition-group :name="loading ? '' : 'list-complete'" tag="div" class="people-wrapper">
      <People
        v-for="(item, index) in localList"
        :key="item.id"
        :people="item"
        @remove="remove(index)"
        @follow="follow(index)"
        @unfollow="unfollow(index)"
        @agree="agree(index)"
        @ignore="ignore(index)"
        :mode="mode"
      />
    </transition-group>
    <from-bottom-dialog
      page-id="Fans"
      v-model="isShowUnfollow"
      mode="white"
      mask-mode="dark"
      :show-heng-gang="false"
    >
      <div class="unfollow-dialog">
        <div class="notice">确认取消关注?</div>
        <div class="row" @click="noLook">不看TA</div>
        <div class="row red" @click="confirmUnfollow">取消关注</div>
        <div class="space"></div>
        <div class="row" @click="cancel">取消</div>
      </div>
    </from-bottom-dialog>
  </div>
</template>
<script>
import People from './People'
import FromBottomDialog from '../../../components/dialog/FromBottomDialog'
import { _notice, _showConfirmDialog } from '@/utils'

export default {
  name: 'Peoples',
  components: {
    FromBottomDialog,
    People
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    },
    mode: {
      type: String,
      default: 'fans'
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShowUnfollow: false,
      currentIndex: -1
    }
  },
  computed: {
    localList: {
      get() {
        return this.list
      },
      set(newVal) {
        this.$emit('update:list', newVal)
      }
    }
  },
  created() {},
  methods: {
    remove(index) {
      _notice('将不会再为你推荐该用户')
      this.localList.splice(index, 1)
    },
    follow(index) {
      if (this.mode === 'visitor') {
        this.localList[index].type = this.RELATE_ENUM.FOLLOW_HE
      }
      if (this.mode === 'recommend') {
        this.localList[index].type = this.RELATE_ENUM.FOLLOW_HE
      }
      if (this.mode === 'fans') {
        if (this.localList[index].type === this.RELATE_ENUM.FOLLOW_ME) {
          this.localList[index].type = this.RELATE_ENUM.FOLLOW_EACH_OTHER
        }
      }
    },
    unfollow(index) {
      if (this.mode === 'visitor') {
        this.localList[index].type = this.RELATE_ENUM.FOLLOW_ME
      }
      if (this.mode === 'recommend') {
        this.localList[index].type = this.RELATE_ENUM.RECOMMEND
      }

      if (this.mode === 'fans') {
        this.isShowUnfollow = true
        this.currentIndex = index
      }
    },
    agree(index) {
      this.localList[index].type = this.RELATE_ENUM.FOLLOW_ME
    },
    ignore(index) {
      this.localList.splice(index, 1)
    },
    confirmUnfollow() {
      this.localList[this.currentIndex].type = this.RELATE_ENUM.FOLLOW_ME
      this.cancel()
    },
    cancel() {
      this.isShowUnfollow = false
      this.currentIndex = -1
    },
    noLook() {
      this.isShowUnfollow = false
      _showConfirmDialog(
        '确认不看 TA?',
        '确认后，将不再为你推荐对方的作品，你可以在对方主页随时恢复。',
        'gray',
        () => {
          _notice('设置成功')
        },
        () => {},
        '不看 TA'
      )
    }
  }
}
</script>

<style scoped lang="less">
@import '../../../assets/less/index';

.list-complete-enter-from,
.list-complete-leave-to {
  opacity: 0;
}

.list-complete-leave-active {
  position: absolute;
}

.people-wrapper {
  position: relative;
}

.unfollow-dialog {
  color: black;

  .notice {
    color: var(--second-text-color);
    font-size: 12rem;
    height: 40rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .row {
    height: 50rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #f1f1f1;

    &:nth-last-child(1) {
      border-top: none;
    }

    &.red {
      color: var(--primary-btn-color);
    }
  }

  .space {
    height: 10rem;
    background: whitesmoke;
  }
}
</style>
