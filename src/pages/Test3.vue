<template>
  <div class="test" v-top-love>
  </div>
</template>
<script>
import Dom from "../utils/dom";

export default {
  name: "Test",
  props: {},
  components: {},
  directives: {
    topLove: {
      beforeMount(el, binding, vNode) {
        let click = function (e) {
          let id = 'a' + Date.now()
          let elWidth = 80
          let rotate = randomNum(0, 1)
          let template = `<img class="${rotate ? 'left love-dbclick' : 'right love-dbclick'}" id="${id}" src="${require('../assets/img/icon/loved.svg')}" alt="">`
          let el = new Dom().create(template)
          el.css({top: e.y - elWidth, left: e.x - elWidth / 2,})
          new Dom().find('.test').append(el)

          setTimeout(() => {
            new Dom().find(`#${id}`).remove()
          }, 1000)
        }
        let randomNum = function (minNum, maxNum) {
          switch (arguments.length) {
            case 1:
              return parseInt(Math.random() * minNum + 1, 10);
            case 2:
              return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            default:
              return 0;
          }
        }
        el.addEventListener('click', click)
        // el.addEventListener('dblclick', click)
      }
    }
  },
  data() {
    return {
      showShareDialog: true,
    }
  },
  methods: {
    click(e) {
      let id = 'a' + Date.now()
      let elWidth = 80
      let rotate = this.randomNum(0, 1)
      let template = `<img class="${rotate ? 'left' : 'right'}" id="${id}" src="${require('../assets/img/icon/loved.svg')}" alt="">`
      let el = new Dom().create(template)
      el.css({top: e.y - elWidth, left: e.x - elWidth / 2,})
      new Dom().find('.test').append(el)

      setTimeout(() => {
        new Dom().find(`#${id}`).remove()
      }, 1000)
    },
    randomNum(minNum, maxNum) {
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * minNum + 1, 10);
        case 2:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        default:
          return 0;
      }
    }
  }
}
</script>

<style lang="less">
@import "../assets/less/index";

.test {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  font-size: 1.4rem;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    position: absolute;
    @width: 8rem;
    width: @width;
    height: @width;

    &.left {
      animation: loveLeft 1.1s linear;
    }

    &.right {
      animation: loveRight 1.1s linear;
    }

    @scale: scale(1.2);
    @rotate: 10deg;

    @keyframes loveLeft {
      0% {
        opacity: 0;
        transform: scale(2) rotate(0-@rotate);
      }
      10% {
        opacity: 1;
        transform: scale(1) rotate(0-@rotate);
      }
      15% {
        opacity: 1;
        transform: @scale rotate(0-@rotate);
      }
      40% {
        opacity: 1;
        transform: @scale rotate(0-@rotate);
      }
      100% {
        transform: translateY(-12rem) scale(2) rotate(0-@rotate);
        opacity: 0;
      }
    }
    @keyframes loveRight {
      0% {
        opacity: 0;
        transform: scale(2) rotate(0+@rotate);
      }
      10% {
        opacity: 1;
        transform: scale(1) rotate(0+@rotate);
      }
      15% {
        opacity: 1;
        transform: @scale rotate(0+@rotate);
      }
      40% {
        opacity: 1;
        transform: @scale rotate(0+@rotate);
      }
      100% {
        transform: translateY(-12rem) scale(2) rotate(0+@rotate);
        opacity: 0;
      }
    }
  }

}
</style>
