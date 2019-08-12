<template>
    <div class="Me" >
        <div class="wrapper">
            <div class="left">
                <header>
                    <img src="../../assets/img/icon/next.svg" alt="" @click="$emit('back')">
                    <img src="../../assets/img/icon/more.svg" alt="">
                </header>
                <div class="detail">
                    <div class="head">
                        <img src="../../assets/img/icon/head-image.jpeg" class="head-image">
                        <div class="other-buttons" v-if="false">
                            <div class="attention">
                                关注
                            </div>
                            <div class="more-attention">
                                -
                            </div>
                        </div>
                        <div class="my-buttons ">
                            <div class="collect">
                                <img src="../../assets/img/icon/collect-white.svg" alt="">
                                <span class="mr5p">收藏</span>
                            </div>
                            <div class="add-friend">
                                <img src="../../assets/img/icon/add-friend-white.svg" alt="">
                            </div>
                            <div class="qr-code">
                                <img src="../../assets/img/icon/qr-code-white.svg" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="description">
                        <p class="name f22 mt5p mb5p">ttentau</p>
                        <div class="number mb10p">
                            <span>抖音号：605128307</span>
                            <div class="jrtt">
                                <img src="../../assets/img/icon/sina.svg" alt="">
                                <span>头条主页</span>
                                <img src="../../assets/img/icon/next.svg" alt="">
                            </div>
                        </div>
                        <div class="signature f12 mb10p">
                            <span>填写个性签名更容易获得别人关注哦</span>
                        </div>
                        <div class="info f10 mb10p">
                            <div class="age">
                                <img src="../../assets/img/icon/person.svg" alt="">
                                <span>22岁</span>
                            </div>
                            <div class="location">
                                <span>上海</span>
                            </div>
                            <div class="school">
                                四川理工大学
                            </div>
                        </div>
                        <div class="heat">
                            <span>8获赞</span>
                            <span>38关注</span>
                            <span>42粉丝</span>
                        </div>
                    </div>
                </div>
                <div class="indicator-ctn">
                    <div class="tabs-text-ctn">
                        <div class="tab-text active">作品1</div>
                        <div class="tab-text">作品1</div>
                        <div class="tab-text">作品1</div>
                    </div>
                    <div class="indicator"></div>
                </div>
                <div class="tabs-ctn">
                    <div class="tabs">
                        <div class="tab tab1">
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                        </div>
                        <div class="tab tab2">
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                        </div>
                        <div class="tab tab3">
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                            <p>12</p>
                        </div>
                    </div>
                </div>
                <my-footer v-bind:init-tab="5"></my-footer>
            </div>
            <div class="right">
                <ul>
                    <li @click="nav('MyCard')">
                        <img src="../../assets/img/icon/card-gray.png" alt="">
                        <span>个人名片</span>
                    </li>
                    <li @click="nav('MyCollect')">
                        <img src="../../assets/img/icon/collect-gray.png" alt="">
                        <span>我的收藏</span>
                    </li>
                    <div class="line"></div>
                    <li>
                        <img src="../../assets/img/icon/wallet-gray.png" alt="">
                        <span>钱包</span>
                    </li>
                    <li>
                        <img src="../../assets/img/icon/order-gray.png" alt="">
                        <span>订单</span>
                    </li>
                    <li class="exception" @click="toggleService()">
                        <div class="d-flex align-items-center">
                            <img src="../../assets/img/icon/category-gray.png" alt="">
                            <span>服务</span>
                        </div>
                        <div class="triangle"></div>
                    </li>
                    <div class="service">
                        <li>
                            <img src="../../assets/img/icon/order-gray.png" alt="" class="op0">
                            <span>购物助手</span>
                        </li>
                        <li>
                            <img src="../../assets/img/icon/order-gray.png" alt="" class="op0">
                            <span>生活服务订单</span>
                        </li>
                        <li>
                            <img src="../../assets/img/icon/order-gray.png" alt="" class="op0">
                            <span>DOU+ 上热门</span>
                        </li>
                        <li>
                            <img src="../../assets/img/icon/order-gray.png" alt="" class="op0">
                            <span>彩铃服务</span>
                        </li>
                        <li>
                            <img src="../../assets/img/icon/order-gray.png" alt="" class="op0">
                            <span>免流量看抖音</span>
                        </li>
                    </div>

                    <div class="line"></div>

                    <li>
                        <img src="../../assets/img/icon/link-gray.png" alt="">
                        <span>小程序</span>
                    </li>
                    <li>
                        <img src="../../assets/img/icon/juan-gray.png" alt="">
                        <span>卡卷</span>
                    </li>

                    <div class="line"></div>

                    <li>
                        <img src="../../assets/img/icon/umbrella-gray.png" alt="">
                        <span>未成年保护工具</span>
                    </li>

                    <div class="line"></div>

                    <li>
                        <img src="../../assets/img/icon/setting-gray.png" alt="">
                        <span>设置</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import Footer from '../../components/Footer'

    export default {
        name: "Me",
        components: { 'my-footer': Footer },
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
                }else {
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
        position: fixed;
        font-size: 1.6rem;
        width: 100%;
        height: 100%;
        overflow: hidden;

        .wrapper {
            position: relative;
            display: flex;
            width: 100%;
            height: 100%;

            .left {
                left: 0;
                top: 0;
                position: absolute;
                height: 100%;
                width: 100%;
                background: $left-bg-color;
                overflow-y: scroll;

                header {
                    height: 150px;
                    /* background-image: url('./imgs/header2.jpg'); */
                    background-image: url('data:image/jpeg;base64,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');
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    display: flex;
                    justify-content: space-between;
                    /*background: url("../../assets/img/icon/top-bg.jpg");*/
                    padding: 20px;

                    img {
                        border-radius: 50%;
                        padding: 5px;
                        background: #524a4a;
                        height: 20px;
                        width: 20px;

                        &:nth-child(1) {
                            transform: rotate(180deg);
                        }
                    }
                }


                .detail {
                    background: $left-bg-color;
                    padding: 0 20px;

                    .head {
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        box-sizing: border-box;
                        transform: translateY(-20px);

                        .head-image {
                            background: black;
                            padding: 5px;
                            border-radius: 50%;
                            width: 80px;
                            height: 80px;
                        }

                        .my-buttons {
                            div {
                                display: flex;
                                align-items: center;
                                float: left;
                                border-radius: 2px;
                                background: #676767;
                                margin-right: 5px;

                                img {
                                    padding: 6px;
                                    height: 20px;
                                }

                                span {
                                    color: #cdcdcd;
                                }
                            }

                        }
                    }

                    .description {
                        color: white;
                        transform: translateY(-20px);

                        .number {
                            padding-bottom: 10px;
                            border-bottom: 1px solid gray;

                            .jrtt {
                                float: right;

                                img {
                                    height: 10px;
                                    width: 10px;
                                }

                                span {
                                    margin: 0 5px;
                                }
                            }
                        }

                        .info {
                            display: flex;
                            align-items: center;

                            div {
                                display: flex;
                                align-items: center;
                                float: left;
                                border-radius: 2px;
                                background: #676767;
                                margin-right: 5px;
                                padding: 2px 4px;

                                img {
                                    height: 10px;
                                    margin-right: 3px;
                                }

                                span {
                                    color: #cdcdcd;
                                }
                            }
                        }

                        .heat {
                            span {
                                margin-right: 10px;
                            }
                        }
                    }
                }

                .tabs-ctn {

                    height: 100%;
                    width: 100%;
                    overflow: hidden;
                }

                .tabs {
                    left: 0;
                    transition: all 0.3s ease 0s;
                    height: 100%;
                    width: 100%;
                    position: relative;
                }

                .tab {
                    left: 0;
                    top: 0;
                    position: absolute;
                    width: 100%;
                    background: red;
                    overflow-y: scroll;
                }

                .tab:nth-child(2) {
                    left: 100%;
                    background: gold;
                }

                .tab:nth-child(3) {
                    left: 200%;
                    background: blue;
                }

                .indicator-ctn {
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 999;
                    background: #333;
                }

                .indicator-ctn.fixed {
                    position: fixed;
                }

                .indicator {
                    height: 2px;
                    background: gold;
                    width: 30%;
                    margin-left: 1.5%;
                    transition: all .3s;
                }

                .tabs-text-ctn {
                    height: 40px;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    color: gray;
                }

                .tab-text.active {
                    color: white;
                }

            }

            .right {
                top: 0;
                left: 100%;
                position: absolute;
                height: 100%;
                width: 70%;
                color: white;
                background: $right-bg-color;

                ul {
                    height: 100%;
                    overflow: auto;
                    padding: 0;

                    .line {
                        height: 1px;
                        background: #cccccc;
                        opacity: .1;
                        margin: 5px 20px;
                    }

                    .service {
                        transition: all .3s;
                        overflow: hidden;
                    }

                    li {
                        background: $right-bg-color;
                        padding: 20px;
                        list-style: none;
                        display: flex;
                        align-items: center;

                        &:active {
                            background: #454b65;
                        }

                        img {
                            height: 30px;
                            width: 30px;
                            margin-right: 20px;
                        }

                        &.exception {
                            justify-content: space-between;

                            .triangle {
                                transform: translateY(3px);
                                width: 0;
                                height: 0;
                                border-top: 7px solid #cccccc;
                                border-right: 7px solid transparent;
                                border-bottom: 7px solid transparent;
                                border-left: 7px solid transparent;
                            }
                        }
                    }
                }
            }

        }


    }
</style>
