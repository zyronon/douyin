<template>
    <div id="base-slide-wrapper" ref="slideWrapper">
        <div id="base-slide-list" ref="slideList"
             @touchstart="touchStart($event)"
             @touchmove="touchMove($event)"
             @touchend="touchEnd($event)">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BaseSlideList",
        created() {
            // console.log('created',this.$refs)
        },
        data() {
            return {
                wrapperWidth: 0,

                startLocationX: 0,
                startLocationY: 0,

                lastLocationX: 0,
                lastLocationY: 0,

                moveXDistance: 0,
                moveYDistance: 0,

                judgeValue: 20,
                startTime: 0,

                currentSlideItemIndex: 0,
                isDrawRight: 0,
                isCanRightWiping: false,
                isCanDownWiping: false,
                isNeedCheck: true,

                slideList: null,
                slideItems: null,
            }
        },
        mounted() {
            this.slideList = this.$refs.slideList
            this.slideItems = this.slideList.children
            this.wrapperWidth = this.$getCss(this.slideList, 'width')
            console.log(this.wrapperWidth)
            this.slideList.style.width = this.slideItems.length * this.wrapperWidth + 'px'
        },
        methods: {
            touchStart(e) {
                this.slideList.style.transition = 'none'
                // indicator.style.transition = 'none'

                this.startLocationX = e.touches[0].pageX
                this.startLocationY = e.touches[0].pageY
                // console.log(' this.startLocationX', this.startLocationX)
                // console.log(' this.startLocationY', this.startLocationY)
                this.startTime = Date.now()
            },
            touchMove(e) {
                this.lastLocationX = e.touches[0].pageX
                this.lastLocationY = e.touches[0].pageY
                this.moveXDistance = this.lastLocationX - this.startLocationX
                this.moveYDistance = this.lastLocationY - this.startLocationY

                // console.log('moveXDistance', this.moveXDistance)
                // console.log('moveYDistance', this.moveYDistance)

                this.isDrawRight = this.moveXDistance < 0

                // console.log(this.isDrawRight)

                this.checkDirection()
                if (this.isCanRightWiping) {
                    //禁止在index=0页面的时候，向左划
                    if (this.currentSlideItemIndex === 0 && !this.isDrawRight) {
                        return
                    }
                    //禁止在最后页面的时候，向右划
                    if (this.currentSlideItemIndex === this.slideItems.length - 1 && this.isDrawRight) {
                        return
                    }
                    e.stopImmediatePropagation()
                    e.stopPropagation()

                    if (this.isDrawRight) {
                        this.slideList.style.left = -this.currentSlideItemIndex * this.wrapperWidth + this.moveXDistance + this.judgeValue + 'px'
                    } else {
                        this.slideList.style.left = -this.currentSlideItemIndex * this.wrapperWidth + this.moveXDistance - this.judgeValue + 'px'
                    }
                }
            },
            touchEnd(e) {
                if (this.currentSlideItemIndex === 0 && !this.isDrawRight) {
                    return
                }
                //禁止在最后页面的时候，向右划
                if (this.currentSlideItemIndex === this.slideItems.length - 1 && this.isDrawRight) {
                    return
                }

                this.slideList.style.transition = 'all .3s'

                let endTime = Date.now()
                let gapTime = endTime - this.startTime

                // 如果
                if (Math.abs(this.moveXDistance) < 20) {
                    gapTime = 1000
                }
                if (Math.abs(this.moveXDistance) > (this.wrapperWidth / 3)) {
                    gapTime = 100
                }

                if (gapTime < 150) {
                    if (this.isDrawRight) {
                        this.currentSlideItemIndex += 1
                    } else {
                        this.currentSlideItemIndex -= 1
                    }
                    this.slideList.style.left = -(this.currentSlideItemIndex) * this.wrapperWidth + 'px'

                } else {
                    this.slideList.style.left = -(this.currentSlideItemIndex) * this.wrapperWidth + 'px'
                }
                this.resetConfig()
            },
            resetConfig() {
                this.isCanDownWiping = false
                this.isCanRightWiping = false
                this.isNeedCheck = true
                this.moveXDistance = 0
                this.moveYDistance = 0
            },
            checkDirection() {
                if (!this.isNeedCheck) {
                    // console.log('不需要检测了')
                    return
                }
                if (Math.abs(this.moveXDistance) > this.judgeValue || Math.abs(this.moveYDistance) > this.judgeValue) {
                    // console.log((Math.abs(this.moveXDistance) * 10))
                    // console.log((Math.abs(this.moveYDistance) * 10))
                    // console.log((Math.abs(this.moveYDistance)))
                    //y移动距离为0 ，angle为Infinty
                    if (Math.abs(this.moveYDistance) === 0) {
                        //左右划
                        this.isCanDownWiping = false
                        this.isCanRightWiping = true
                        this.isNeedCheck = false
                        return;
                    }
                    //X 除以 Y
                    let angle = (Math.abs(this.moveXDistance) * 10) / (Math.abs(this.moveYDistance) * 10)
                    // console.log('angle', angle);
                    if (angle > 0.7 && angle < 1.3) {
                        this.isNeedCheck = false
                        return
                    }

                    // console.log('x------------', moveXDistance)
                    // console.log('y------------', moveYDistance)
                    // console.log('角度------------', angle)

                    if (angle < 0.6) {
                        //上下划
                        this.isCanDownWiping = true
                        this.isCanRightWiping = false
                        this.isNeedCheck = false
                        return
                    }
                    if (angle > 5) {
                        //左右划
                        this.isCanDownWiping = false
                        this.isCanRightWiping = true
                        this.isNeedCheck = false
                        return
                    }
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    #base-slide-wrapper {
        width: 100%;
        overflow: hidden;

        #base-slide-list {
            display: flex;
            left: 0;
            /*transition: all 0.3s ease 0s;*/
            height: 100%;
            width: 100%;
            position: relative;
        }
    }

</style>