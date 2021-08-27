<template>
  <div class="Test">
    <div class="content">
      <img class="top" src="../assets/img/icon/components/video/douyin-code-bg.png" alt="">
      <div class="desc">
        <div class="left">
          <div class="user">@名字</div>
          <div class="title">#窃书不能算偷……窃书！……读书人的事，能算偷么？</div>
        </div>
        <img class="code" src="../assets/img/icon/components/video/douyin-code.jpg" alt="">
      </div>
      <img class="bottom" src="../assets/img/icon/components/video/douyin-code-bottom.jpg" alt="">
    </div>
  </div>
</template>
<script>

export default {
  name: "Test",
  props: {},
  data() {
    return {
      comment: '12'
    }
  },
  computed: {},
  created() {
  },
  methods: {
    changeText(e) {
      console.log(e)
      console.log(this.$el.innerText)

    },
    get() {
      console.log(this.$refs.input)

    },
    call() {
      let span = document.createElement('span')
      span.setAttribute('contenteditable', false)
      span.classList.add('link')
      span.innerText = Date.now() + ' '
      this.$refs.input.append(span)
    },
    emoji() {
      let span = document.createElement('img')
      span.setAttribute('src', require('../assets/img/icon/message/emoji/4.webp'))
      span.classList.add('emoji')
      this.$refs.input.append(span)
    }
  }
}
</script>

<style scoped lang="less">
@import "../assets/scss/index";

.Test {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: #fff;
  overflow: auto;

  .content {
    padding-top: 6rem;

    .top {
      width: 100%;
    }

    .desc {
      display: flex;
      padding: 1rem;

      .left {
        font-size: 1.8rem;

        .title {
          font-size: 1.4rem;
          color: @second-text-color;
        }

      }

      .code {
        width: 12rem;
      }
    }

    .bottom {
      width: 100%;
    }
  }
}
</style>
