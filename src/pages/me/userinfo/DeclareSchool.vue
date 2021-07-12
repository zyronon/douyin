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
        <input type="text" placeholder="请输入学校全称(必填)" v-model="form.name">
      </div>
      <div class="row">
        <div class="label">所在城市</div>
        <input type="text" placeholder="请输入学校所在城市(必填)" v-model="form.location">
      </div>
      <div class="notice">感谢你的反馈，我们将尽快核对信息</div>
      <div class="btn" @click="submit">提交</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeclareSchool",
  data() {
    return {
      form: {
        name: '',
        location: ''
      }
    }
  },
  methods: {
    submit() {
      if (!this.form.name) return this.$notice('请输入学校全称')
      if (!this.form.location) return this.$notice('请输入学校所在城市')
      this.$notice('申报成功')
      setTimeout(this.$back, 1000)
    },
    $notice(val) {
      let div = document.createElement('div')
      div.classList.add('global-notice')
      div.textContent = val
      document.body.append(div)
      setTimeout(() => {
        document.body.removeChild(div)
      }, 1000)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../assets/scss/index";

.declare-school {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;


  .content {
    padding: 7rem 2rem 0 2rem;

    .row {
      display: flex;
      align-items: center;

      .label {
        color: white;
        font-size: 1.6rem;
        margin-right: 3rem;
      }

      input {
        flex: 1;
        height: 4rem;
        background: transparent;
        outline: none;
        border-top: none;
        border-right: none;
        border-left: none;
        border-bottom: 1px solid $line-color;
        color: white;
      }
    }

    .notice {
      margin-top: 2rem;
      color: $second-text-color;
    }

    .btn {
      position: fixed;
      bottom: 2rem;
      left: 2rem;
      right: 2rem;
      color: white;
      font-size: 1.6rem;
      background: $primary-btn-color;
      text-align: center;
      padding: 1rem 0;
      border-radius: 2px;
    }
  }
}

</style>