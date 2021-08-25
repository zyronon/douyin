<template>
  <div class="Test">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">申报学校信息</span>
      </template>
    </BaseHeader>
    <div class="content">
      <div ref="input"
           class="auto-input"
           contenteditable
           @input="changeText">
        <span contenteditable="false" class="link">test</span>
        <img src="../assets/img/icon/message/emoji/4.webp" class="emoji">
        <img src="../assets/img/icon/message/emoji/2.webp" class="emoji">
        {{ comment }}
        <img src="../assets/img/icon/message/emoji/3.webp" class="emoji">
      </div>

      <b-button class="mt1r" @click="call">@</b-button>
      <b-button class="mt1r" @click="emoji">emoji</b-button>
      <b-button class="mt1r" @click="get">get</b-button>
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
     console.log( this.$refs.input)

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
  font-size: 2rem;
  @emoji-width: 4rem;

  .emoji {
    width: @emoji-width;
    height: @emoji-width;
  }

  .content {
    padding-top: 6rem;


    .auto-input {
      width: 100%;
      overflow-y: scroll;
      padding: 0 .5rem;
      outline: none;
    }

    .auto-input::-webkit-scrollbar {
      width: 0 !important
    }

    .auto-input:empty::before {
      /*content: "留下你的精彩评论吧";*/
      content: attr(placeholder);
      color: #999999;
    }

    .auto-input:focus::before {
      content: none;
    }
  }
}
</style>
