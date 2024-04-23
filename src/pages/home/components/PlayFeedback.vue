<template>
  <transition name="fade">
    <div class="play-feedback" v-if="modelValue">
      <div class="feedback-header">
        <span>&nbsp;</span>
        <div class="title">播放反馈</div>
        <dy-back mode="dark" img="close" @click="cancel"></dy-back>
      </div>
      <div class="content">
        <div class="notice">请选择要反馈的问题</div>
        <div
          class="l-row"
          @click="
            falseOther(() => {
              this.type1 = true
            })
          "
        >
          <Check
            mode="red"
            :modelValue="type1"
            @change="
              falseOther(() => {
                this.type1 = true
              })
            "
          />
          <span>网络正常无法播放视频</span>
        </div>
        <div
          class="l-row"
          @click="
            falseOther(() => {
              this.type2 = true
            })
          "
        >
          <Check
            mode="red"
            :modelValue="type2"
            @change="
              falseOther(() => {
                this.type2 = true
              })
            "
          />
          <span>视频画面正常没声音</span>
        </div>
        <div
          class="l-row"
          @click="
            falseOther(() => {
              this.type3 = true
            })
          "
        >
          <Check
            mode="red"
            :modelValue="type3"
            @change="
              falseOther(() => {
                this.type3 = true
              })
            "
          />
          <span>播放几秒/中途卡信</span>
        </div>
        <div
          class="l-row"
          @click="
            falseOther(() => {
              this.type4 = true
            })
          "
        >
          <Check
            mode="red"
            :modelValue="type4"
            @change="
              falseOther(() => {
                this.type4 = true
              })
            "
          />
          <span>画面内容不全</span>
        </div>
        <div
          class="l-row"
          @click="
            falseOther(() => {
              this.type5 = true
            })
          "
        >
          <Check
            mode="red"
            :modelValue="type5"
            @change="
              falseOther(() => {
                this.type5 = true
              })
            "
          />
          <span>播放过程中闪退回桌面</span>
        </div>
        <div
          class="l-row"
          @click="
            falseOther(() => {
              this.type6 = true
            })
          "
        >
          <Check
            mode="red"
            :modelValue="type6"
            @change="
              falseOther(() => {
                this.type6 = true
              })
            "
          />
          <span>画面模糊不清晰</span>
        </div>
        <div
          class="l-row"
          @click="
            falseOther(() => {
              this.type7 = true
            })
          "
        >
          <Check
            mode="red"
            :modelValue="type7"
            @change="
              falseOther(() => {
                this.type7 = true
              })
            "
          />
          <span>视频播放其他问题或建议</span>
        </div>
        <div v-if="type7" class="other">
          <div class="textarea-ctn">
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              v-model="desc"
              placeholder="详输入内容"
            ></textarea>
          </div>
          <div class="text-num">{{ desc.length }}/300</div>
        </div>
        <dy-button type="primary" :disabled="!disabled" @click="submit">提交</dy-button>
      </div>
    </div>
  </transition>
</template>
<script>
import Check from '../../../components/Check'
import { _hideLoading, _notice, _showLoading, _sleep } from '@/utils'

export default {
  name: 'Test',
  props: {
    modelValue: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  components: {
    Check
  },
  watch: {
    modelValue() {
      this.type1 = false
      this.type2 = false
      this.type3 = false
      this.type4 = false
      this.type5 = false
      this.type6 = false
      this.type7 = false
      this.desc = ''
    }
  },
  data() {
    return {
      type1: false,
      type2: false,
      type3: false,
      type4: false,
      type5: false,
      type6: false,
      type7: false,
      desc: ''
    }
  },
  computed: {
    disabled() {
      if (this.type7 && this.desc) return true
      return this.type1 || this.type2 || this.type3 || this.type4 || this.type5 || this.type6
    }
  },
  created() {},
  methods: {
    falseOther(cb) {
      this.type1 = false
      this.type2 = false
      this.type3 = false
      this.type4 = false
      this.type5 = false
      this.type6 = false
      this.type7 = false
      cb()
    },
    cancel() {
      this.$emit('update:modelValue', false)
    },
    async submit() {
      this.cancel()
      _showLoading()
      await _sleep(1000)
      _hideLoading()
      _notice('感谢你的反馈，我们会尽快答复！')
    }
  }
}
</script>

<style scoped lang="less">
@import '../../../assets/less/index';

.play-feedback {
  max-height: 490rem;
  overflow: auto;
  background: #fff;
  color: black;
  position: fixed;
  bottom: 50rem;
  left: 0;
  right: 0;

  .feedback-header {
    position: fixed;
    left: 0;
    right: 0;
    background: white;
    height: 30rem;
    padding: 15rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    font-weight: bold;
    font-size: 18rem;
  }

  .content {
    padding: 60rem 15rem 15rem 15rem;
  }

  .notice {
    font-size: 12rem;
    color: var(--second-text-color);
  }

  .l-row {
    display: flex;
    align-items: center;
    min-height: 50rem;
    font-size: 14rem;
    border-bottom: 1px solid #f1f1f1;

    .check {
      width: 20rem;
      height: 20rem;
      margin-right: 10rem;
    }
  }

  .no-border {
    border-bottom: none;
  }

  .other {
    .textarea-ctn {
      width: 100%;
      background: #eae8e8;
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
        color: black;

        &::placeholder {
          color: var(--second-text-color);
        }
      }
    }

    .text-num {
      margin-top: 8rem;
      margin-bottom: 8rem;
      font-size: 10rem;
      color: var(--second-text-color);
      text-align: right;
    }
  }
}
</style>
