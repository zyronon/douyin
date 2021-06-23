<template>
  <div className="Me">
    <SlideList key1="父" style="width: 100vw;">
      <SlideItem>

      </SlideItem>
    </SlideList>
  </div>
</template>
<script>
import Footer from '../../components/Footer.vue'
import Comment from "../../components/Comment";
import Share from "../../components/Share";
import Other from "../../components/Other";
import SlideList from "./SlideList";
import SlideItem from "./SlideItem";

export default {
  name: "Me",
  components: {Footer, Comment, Share, Other, SlideList, SlideItem},
  data() {
    return {
      serviceEl: {},
      serviceHeight: 0
    }
  },
  created() {
  },
  mounted() {
    !function () {
      let wrapper = document.querySelector('.wrapper')
      let leftEl = document.querySelector('.left')
      let header = document.querySelector('header')
      let headerHeight = getCss(header, 'height')
      let indicatorCtn = document.querySelector('.indicator-ctn')

      let indicatorCtnOffsetTop = indicatorCtn.offsetTop
      let startLocationX = 0
      let startLocationY = 0

      let lastLocationX = 0
      let lastLocationY = 0

      let moveXDistance = 0
      let moveYDistance = 0

      let judgeValue = 20

      let startTime
      let currentSwiperItemIndex
      let isDrawRight

      let isCanRightWiping = false
      let isCanDownWiping = false
      let isNeedCheck = true

      let width = document.body.clientWidth
      let rightWidth = width * 0.7

      wrapper.addEventListener('touchstart', function (e) {
        wrapper.style.transition = 'none'
        header.style.transition = 'none'

        let left = getCss(wrapper, 'left')

        if (left !== 0) {
          currentSwiperItemIndex = 1
        } else {
          currentSwiperItemIndex = 0
        }
        startLocationX = e.touches[0].pageX
        startLocationY = e.touches[0].pageY

        startTime = Date.now()
      })
      wrapper.addEventListener('touchmove', function (e) {
        lastLocationX = e.touches[0].pageX
        lastLocationY = e.touches[0].pageY
        moveXDistance = lastLocationX - startLocationX
        moveYDistance = lastLocationY - startLocationY
        checkDirection()
        if (isCanRightWiping) {
          if (currentSwiperItemIndex === 0) {
            if (moveXDistance > 0) {
              moveXDistance = 0
            }
            if (Math.abs(moveXDistance) > rightWidth) {
              moveXDistance = -rightWidth
            }
            isDrawRight = moveXDistance < 0
            if (isDrawRight) {
              wrapper.style.left = -(currentSwiperItemIndex + 0) * width + moveXDistance + judgeValue + 'px'
            } else {
              wrapper.style.left = -(currentSwiperItemIndex + 0) * width + moveXDistance + 'px'
            }
          }
          if (currentSwiperItemIndex === 1) {
            if (moveXDistance < 0) {
              moveXDistance = 0
            }
            isDrawRight = moveXDistance < 0
            if (isDrawRight) {
              wrapper.style.left = -(currentSwiperItemIndex + 0) * rightWidth + moveXDistance - judgeValue + 'px'
            } else {
              wrapper.style.left = -(currentSwiperItemIndex + 0) * rightWidth + moveXDistance + 'px'
            }
          }
        } else {
          if (moveYDistance > 0) {
            console.log('往下划')
            header.style.height = headerHeight + moveYDistance / 5 + 'px'
          } else {
            console.log('往上划')
          }
          // console.log('y', moveYDistance)
        }
      })
      wrapper.addEventListener('touchend', function (e) {
        //点击的是左边，并且是菜单展开状态，并且移动距离等于 0，那么就收起来
        let left = getCss(wrapper, 'left')
        if (e.path.includes(leftEl) && left !== 0 && moveXDistance === 0) {
          wrapper.style.transition = 'all .2s'
          wrapper.style.left = 0
          leftEl.style.opacity = 1
          resetConfig()
          e.stopImmediatePropagation()
          e.stopPropagation()
          return false
        }
        if (isCanRightWiping) {
          if (!moveXDistance) return
          wrapper.style.transition = 'all .2s'
          let endTime = Date.now()
          let gapTime = endTime - startTime

          // 如果
          if (Math.abs(moveXDistance) < 20) {
            gapTime = 1000
          }
          if (Math.abs(moveXDistance) > (width / 3)) {
            gapTime = 100
          }
          // console.log('是否向左划',isDrawRight)
          if (gapTime < 150) {
            // console.log('小于500', currentIndex)
            if (isDrawRight) {
              // console.log('往左划');
              wrapper.style.left = -rightWidth + 'px'
              leftEl.style.opacity = 0.5
            } else {
              wrapper.style.left = 0
              leftEl.style.opacity = 1
            }
          } else {
            if (currentSwiperItemIndex === 1) {
              wrapper.style.left = -rightWidth + 'px'
            } else {
              wrapper.style.left = 0
            }
          }
          resetConfig()
          isNeedCheck = true
          return
        } else {
          header.style.transition = 'all .3s'
          header.style.height = headerHeight + 'px'
          resetConfig()
        }
      })

      leftEl.addEventListener('scroll', function () {
        if (leftEl.scrollTop > indicatorCtnOffsetTop) {
          indicatorCtn.classList.add('fixed')
        } else {
          indicatorCtn.classList.remove('fixed')
        }
      })

      function resetConfig() {
        isCanDownWiping = false
        isCanRightWiping = false
        isNeedCheck = true
        moveXDistance = 0
        moveYDistance = 0
      }

      function checkDirection() {
        if (!isNeedCheck) {
          // console.log('不需要检测了')
          return
        }

        if (Math.abs(moveXDistance) > judgeValue || Math.abs(moveYDistance) > judgeValue) {
          //X 除以 Y
          let angle = (Math.abs(moveXDistance) * 10) / (Math.abs(moveYDistance) * 10)
          if (angle > 0.7 && angle < 1.3) {
            isNeedCheck = false
            return
          }

          // console.log('x------------', moveXDistance)
          // console.log('y------------', moveYDistance)
          // console.log('角度------------', angle)

          if (angle < 0.6) {
            //上下划
            isCanRightWiping = false
            isNeedCheck = false
            return
          }
          if (angle > 5) {
            //左右划
            isCanRightWiping = true
            isNeedCheck = false
            return
          }
        }
      }
    }()
    !function () {
      let tabsCtn = document.querySelector('.tabs-ctn')
      let tabs = document.querySelector('.tabs')
      let indicator = document.querySelector('.indicator')
      let tabsTextCtn = document.querySelector('.tabs-text-ctn')
      tabsCtn.style.height = getCss(tabs.children[0], 'height') + 'px'

      let startLocationX = 0
      let startLocationY = 0

      let lastLocationX = 0
      let lastLocationY = 0

      let moveXDistance = 0
      let moveYDistance = 0

      let judgeValue = 20

      let startTime
      let currentSwiperItemIndex
      let isDrawRight

      let isCanRightWiping = false
      let isCanDownWiping = false
      let isNeedCheck = true

      let width = document.body.clientWidth

      tabs.addEventListener('touchstart', function (e) {
        tabs.style.transition = 'none'
        indicator.style.transition = 'none'

        let left = getCss(tabs, 'left')
        if (Math.abs(left) === 0) {
          currentSwiperItemIndex = 0
        } else if (Math.abs(left) === width) {
          currentSwiperItemIndex = 1
        } else {
          currentSwiperItemIndex = 2
        }
        startLocationX = e.touches[0].pageX
        startLocationY = e.touches[0].pageY
        startTime = Date.now()
      })
      tabs.addEventListener('touchmove', function (e) {
        lastLocationX = e.touches[0].pageX
        lastLocationY = e.touches[0].pageY
        moveXDistance = lastLocationX - startLocationX
        moveYDistance = lastLocationY - startLocationY

        isDrawRight = moveXDistance < 0

        checkDirection()
        if (isCanRightWiping) {
          if (currentSwiperItemIndex === tabs.children.length - 1 && isDrawRight) {
            return
          }
          e.stopImmediatePropagation()
          e.stopPropagation()
          if (isDrawRight) {
            indicator.style.marginLeft = (1.5 + (currentSwiperItemIndex + 0) * 33 + Math.abs(moveXDistance) / width / 3 * 100) + '%'
            tabs.style.left = -(currentSwiperItemIndex + 0) * width + moveXDistance + judgeValue + 'px'
          } else {
            if (currentSwiperItemIndex === 0) {
              return tabs.style.left = 0
            }
            let marginLeft = (1.5 + (currentSwiperItemIndex + 0) * 33 - Math.abs(moveXDistance) / width / 3 * 100)
            if (marginLeft > 1.5) {
              indicator.style.marginLeft = marginLeft + '%'
            } else {
              indicator.style.marginLeft = '1.5%'
            }
            tabs.style.left = -(currentSwiperItemIndex + 0) * width + moveXDistance - judgeValue + 'px'
          }
        }
      })
      tabs.addEventListener('touchend', function (e) {
        if (isCanRightWiping) {
          if (currentSwiperItemIndex === tabs.children.length - 1 && isDrawRight) {
            return
          }
          e.stopImmediatePropagation()
          e.stopPropagation()
          if (!moveXDistance) return
          tabs.style.transition = 'all .3s'
          indicator.style.transition = 'all .3s'

          let endTime = Date.now()
          let gapTime = endTime - startTime

          // 如果
          if (Math.abs(moveXDistance) < 20) {
            gapTime = 1000
          }
          if (Math.abs(moveXDistance) > (width / 3)) {
            gapTime = 100
          }

          if (gapTime < 150) {
            // console.log('小于500', currentIndex)
            if (isDrawRight) {
              indicator.style.marginLeft = 1.5 + (currentSwiperItemIndex + 1) * 33 + '%'
              console.log('往左划')
              if (currentSwiperItemIndex === tabs.children.length - 1) {
                tabs.style.left = -(tabs.children.length - 1) * width + 'px'
                return
              }
              for (let item of tabsTextCtn.children) {
                item.classList.remove('active')
              }
              tabsTextCtn.children[currentSwiperItemIndex + 1].classList.add('active')
              tabs.style.left = -(currentSwiperItemIndex + 1) * width + 'px'
              tabsCtn.style.height = getCss(tabs.children[currentSwiperItemIndex + 1], 'height') + 'px'

            } else {

              let marginLeft = 1.5 + (currentSwiperItemIndex - 1) * 33
              if (marginLeft > 1.5) {
                indicator.style.marginLeft = marginLeft + '%'
              } else {
                indicator.style.marginLeft = '1.5%'
              }
              console.log('往右划')
              if (currentSwiperItemIndex === 0) {
                return tabs.style.left = 0
              }
              for (let item of tabsTextCtn.children) {
                item.classList.remove('active')
              }
              tabsTextCtn.children[currentSwiperItemIndex - 1].classList.add('active')
              tabs.style.left = -(currentSwiperItemIndex - 1) * width + 'px'
              tabsCtn.style.height = getCss(tabs.children[currentSwiperItemIndex - 1], 'height') + 'px'
            }
          } else {
            tabs.style.left = -(currentSwiperItemIndex) * width + 'px'
            indicator.style.marginLeft = 1.5 + currentSwiperItemIndex * 33 + '%'
          }
        } else {
          isNeedCheck = true
        }
        resetConfig()
      })

      for (let i = 0; i < tabsTextCtn.children.length; i++) {
        let textEl = tabsTextCtn.children[i]
        textEl.addEventListener('click', function () {
          indicator.style.marginLeft = 1.5 + i * 33 + '%'
          tabs.style.transition = 'all .3s'
          tabs.style.left = -i * width + 'px'
        })
      }

      function resetConfig() {
        isCanDownWiping = false
        isCanRightWiping = false
        isNeedCheck = true
        moveXDistance = 0
        moveYDistance = 0
      }

      function checkDirection() {
        if (!isNeedCheck) {
          // console.log('不需要检测了')
          return
        }

        if (Math.abs(moveXDistance) > judgeValue || Math.abs(moveYDistance) > judgeValue) {
          //X 除以 Y
          let angle = (Math.abs(moveXDistance) * 10) / (Math.abs(moveYDistance) * 10)
          // console.log(angle);
          if (angle > 0.7 && angle < 1.3) {
            isNeedCheck = false
            return
          }

          // console.log('x------------', moveXDistance)
          // console.log('y------------', moveYDistance)
          // console.log('角度------------', angle)

          if (angle < 0.6) {
            //上下划
            isCanDownWiping = true
            isCanRightWiping = false
            isNeedCheck = false
            return
          }
          if (angle > 5) {
            //左右划
            isCanDownWiping = false
            isCanRightWiping = true
            isNeedCheck = false
            return
          }
        }
      }
    }()

    function getCss(curEle, attr) {
      var val = null, reg = null
      if ("getComputedStyle" in window) {
        val = window.getComputedStyle(curEle, null)[attr]
      } else {   //ie6~8不支持上面属性
        //不兼容
        if (attr === "opacity") {
          val = curEle.currentStyle["filter"]   //'alpha(opacity=12,345)'
          reg = /^alphaopacity=(\d+(?:\.\d+)?)opacity=(\d+(?:\.\d+)?)$/i
          val = reg.test(val) ? reg.exec(val)[1] / 100 : 1
        } else {
          val = curEle.currentStyle[attr]
        }
      }
      reg = /^(-?\d+(\.\d)?)(px|pt|em|rem)?$/i
      return reg.test(val) ? parseFloat(val) : val
    }

    this.serviceEl = document.querySelector('.service')
    this.serviceHeight = this.getCss(this.serviceEl, 'height')
    this.serviceEl.style.height = this.serviceHeight + 'px'
  },
  computed: {},
  methods: {
    toggleService() {
      console.log(this.serviceEl.style.height)
      if (this.serviceEl.style.height === this.serviceHeight + 'px') {
        this.serviceEl.style.height = 0
      } else {
        this.serviceEl.style.height = this.serviceHeight + 'px'
      }
    }
  }
}
</script>

<style scoped lang='scss'>
$left-bg-color: #333;
$right-bg-color: #2e3244;
.Me {
  font-size: 1.6rem;
  height: 100%;
  width: 100%;
}
</style>
