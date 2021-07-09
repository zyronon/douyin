<template>
  <div class="edit-item">
    <BaseHeader>
      <template v-slot:center>
        <span v-if="type === 1" class="f16">修改名字</span>
        <span v-if="type === 2" class="f16">修改抖音号</span>
        <span v-if="type === 3" class="f16">修改简介</span>
      </template>
      <template v-slot:right>
        <div>
          <span class="f16" :class="isChanged?'save-yes':'save-no'">保存</span>
        </div>
      </template>
    </BaseHeader>

    <div class="content">
      <div v-if="type === 1">
        <div class="notice">我的名字</div>
        <div class="input-ctn" style="margin-bottom: 1rem;">
          <input type="text" v-model="name" placeholder="记得填写名字哦">
          <img class="close" src="../../assets/img/icon/close.svg" alt="">
        </div>
        <div class="num">{{ name.length }}/20</div>
      </div>
      <div class="row" v-if="type === 2">
        <div class="notice">我的抖音号</div>
        <div class="input-ctn" style="margin-bottom: 1rem;">
          <input type="text" v-model="name">
          <img class="close" src="../../assets/img/icon/close.svg" alt="">
        </div>
        <div class="num">最多16个字，只允许包含字母、数字、下划线和点，30天内仅能修改一次</div>
      </div>
      <div class="row" v-if="type === 3">
        <div class="notice">个人简介</div>
        <div class="textarea-ctn">
        <textarea name="" id="" cols="30" rows="10"
                  placeholder="填写个人简介更容易获得别人关注哦"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

//TODO 1、数据变了后，保存按钮变亮；2、数据变了，点返回，弹窗是否确认

export default {
  name: "EditUserInfo",
  data() {
    return {
      type: 1,
      name: 'B',
      isChanged: false,
    }
  },
  created() {
    this.type = Number(this.$route.query.type)
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/index";

.edit-item {

  .save-yes {
    color: $primary-btn-color;
  }

  .save-no {
    color: $disable-primary-btn-color;
  }

  .content {
    padding: 2rem;

    .notice, .num {
      font-size: 1.2rem;
      color: $second-text-color;
    }

    .input-ctn {
      position: relative;
      border-bottom: 1px solid $line-color;
      display: flex;
      align-items: center;

      input {
        margin: .5rem 0;
        color: white;
        height: 3rem;
        width: 100%;
        outline: none;
        border: none;
        background: transparent;

        &::placeholder {
          color: $second-text-color;
        }
      }

      .close {
        position: absolute;
        right: 0;
        top: 1.5rem;
        width: 1rem;
      }
    }

    .textarea-ctn {
      width: 100%;
      background: rgb(100, 114, 158);
      padding: 1.5rem;
      box-sizing: border-box;
      margin-top: 1rem;
      border-radius: 2px;


      textarea {
        font-family: "Microsoft YaHei UI";
        outline: none;
        width: 100%;
        border: none;
        background: transparent;
        color: white;

        &::placeholder {
          color: $second-text-color;
        }
      }
    }
  }


}
</style>