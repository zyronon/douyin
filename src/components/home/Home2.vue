<template>
    <div id="home">
        <div class="wrapper" :style="{left:wrapperLeft}"
             @touchstart="wrapperTouchstart($event)"
             @touchmove="wrapperTouchmove($event)"
             @touchend="wrapperTouchend($event)">
            <div class="left-container swiper-item">
                <div class="content-list" :style="{top:contentListTop}">
                    <div class="content-item" v-for="(item,index) of data"
                         @touchstart="contentItemTouchstart($event,index)"
                         @touchmove="contentItemTouchmove($event)"
                         @touchend="contentItemTouchend($event,index)">
                        <div class="bg-video" v-bind:style="{'height':height+'px'}">
                            <video :src="item.videoUrl" :poster="item.poster" ref="video" :autoplay="index === 0" loop>
                                <p> 您的浏览器不支持 video 标签。</p>
                            </video>
                            <div class="float" @click="togglePlayVideo($event)">
                                <transition name="pause">
                                    <img src="../../assets/img/icon/play.svg" class="pause" v-show="!isPlaying"
                                         @click.stop="togglePlayVideo($event)">
                                </transition>
                                <div class="toolbar mb10p">
                                    <img src="../../assets/img/icon/head-image.jpeg" alt="" class="head-image mb15p">
                                    <div class="love mb15p" @click.stop="loved($event,index)">
                                        <div>
                                            <transition name="love">
                                                <img src="../../assets/img/icon/love.svg" class="love-image"
                                                     v-if="!item.isLoved">
                                                <img src="../../assets/img/icon/loved.svg" class="love-image"
                                                     v-if="item.isLoved">

                                            </transition>
                                            <transition name="loved">
                                            </transition>
                                        </div>
                                        <span class="f14">{{item.loves}}</span>
                                    </div>
                                    <div class="message mb15p" @click.stop="showComment">
                                        <img src="../../assets/img/icon/message.svg" alt="" class="message-image">
                                        <span class="f14">{{item.comments}}</span>
                                    </div>
                                    <div class="share mb35p" @click.stop="showShare">
                                        <img src="../../assets/img/icon/share.svg" alt="" class="share-image">
                                        <span class="f14">{{item.shared}}</span>
                                    </div>
                                    <img src="../../assets/img/icon/head-image.jpeg" alt="" class="music">
                                </div>
                                <div class="content ml10p">
                                    <div class="name mb10p">@TTentau</div>
                                    <div class="description mb10p">
                                        吴三二的光年之外, 您的浏览器不支持 video 标签。 您的浏览器不支持 video 标签。
                                    </div>
                                    <div class="music mb10p">
                                        <img src="../../assets/img/icon/music.svg" alt="" class="music-image">
                                        <marquee behavior=scroll direction=left align=middle scrollamount=4> 吴三二 -
                                            光年之外
                                        </marquee>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Comment v-bind:is-commenting="isCommenting" v-on:showComment='isCommenting = !isCommenting' ref="comment"/>
                <Share v-bind:is-sharing="isSharing" ref="share"/>
                <Footer v-bind:init-tab="1"/>
            </div>
            <div class="right-container swiper-item">
                <Other ref="other"/>
            </div>
        </div>
    </div>
</template>

<script>
    import Comment from './Comment'
    import Other from '../user/Other'
    import Share from './Share'
    import Footer from "../common/Footer"

    export default {
        name: "Home",
        components: {Footer, Comment, Share, Other},
        data() {
            return {
                data: [
                    {
                        videoUrl: require('../../assets/video/吴三二的光年之外.mp4'),
                        // videoUrl: 'http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ',
                        videoPoster: require('../../assets/img/poster/src1-bg.png'),
                        isLoved: false,
                        loves: 1234,
                        comments: 666,
                        shared: 999
                    },
                    {
                        videoUrl: require('../../assets/video/src1.mp4'),
                        videoPoster: require('../../assets/img/poster/src1-bg.png'),
                        isLoved: false,
                        loves: 1234,
                        comments: 666,
                        shared: 999
                    },
                    {
                        videoUrl: require('../../assets/video/src1.mp4'),
                        videoPoster: require('../../assets/img/poster/src1-bg.png'),
                        isLoved: false,
                        loves: 1234,
                        comments: 666,
                        shared: 999
                    }
                ],
                height: 0,
                width: 0,
                startLocationY: 0,
                startLocationX: 0,

                lastLocationY: 0,
                lastLocationX: 0,

                moveXDistance: 0,
                moveYDistance: 0,

                judgeValue: 30,

                startTime: 0,
                currentIndex: 0,
                currentSwiperItemIndex: 0,
                isDrawDown: false,
                isDrawRight: false,

                isCanDownWiping: false,
                isCanRightWiping: false,
                isNeedCheck: true,

                isPlaying: true,
                isCommenting: false,
                isSharing: false,

                wrapperLeft: 0,
                contentListTop: 0,

                commentHeight: 0,
                shareHeight: 0,
            }
        },
        mounted() {
            this.height = document.body.clientHeight
            this.width = document.body.clientWidth
        },
        methods: {
            checkDirection() {
                if (!this.isNeedCheck) {
                    return
                }
                if (Math.abs(this.moveXDistance) > this.judgeValue || Math.abs(this.moveYDistance) > this.judgeValue) {
                    //X 除以 Y
                    let angle = (Math.abs(this.moveXDistance) * 10) / (Math.abs(this.moveYDistance) * 10)
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
                    }
                }
            },
            resetConfig() {
                this.isCanDownWiping = false
                this.isCanRightWiping = false
                this.isNeedCheck = true
                this.moveXDistance = 0
                this.moveYDistance = 0
            },
            wrapperTouchstart(e) {
                if (this.isSharing || this.isCommenting) {
                    // this.isNeedCheck = this.isCommenting = this.isSharing = false
                    this.isNeedCheck = false
                    return
                }

                this.startLocationX = e.touches[0].pageX
                this.startTime = Date.now()
            },
            wrapperTouchmove(e) {
                this.lastLocationX = e.touches[0].pageX
                this.moveXDistance = this.lastLocationX - this.startLocationX
                this.isDrawRight = this.moveXDistance < 0
                this.checkDirection()
                if (this.isCanRightWiping) {
                    if (this.isDrawRight) {
                        this.wrapperLeft = -this.currentSwiperItemIndex * this.width + this.moveXDistance + this.judgeValue + 'px'
                    } else {
                        this.wrapperLeft = -this.currentSwiperItemIndex * this.width + this.moveXDistance - this.judgeValue + 'px'
                    }
                }
            },
            wrapperTouchend(e) {
                if (!this.isCanRightWiping) {
                    this.isNeedCheck = true
                    return
                }
                let endTime = Date.now()
                let gapTime = endTime - this.startTime

                if (Math.abs(this.moveXDistance) < 20) {
                    gapTime = 1000
                }
                if (Math.abs(this.moveXDistance) > (this.width / 3)) {
                    gapTime = 100
                }
                if (gapTime < 150) {
                    if (this.isDrawRight) {
                        // console.log('往左划');
                        if (this.currentSwiperItemIndex === 2 - 1) {
                            return this.wrapperLeft = -this.width + 'px'
                        }
                        this.wrapperLeft = -(this.currentSwiperItemIndex + 1) * this.width + 'px'
                        this.currentSwiperItemIndex += 1
                    } else {
                        // console.log('往右划');
                        if (this.currentSwiperItemIndex === 0) {
                            return this.wrapperLeft = 0 + 'px'
                        }
                        this.wrapperLeft = -(this.currentSwiperItemIndex - 1) * this.width + 'px'
                        this.currentSwiperItemIndex -= 1
                    }
                } else {
                    this.wrapperLeft = -(this.currentSwiperItemIndex) * this.width + 'px'
                }

                //暂停播放视频
                let videos = this.$refs.video
                if (this.currentSwiperItemIndex === 0) {
                    videos[this.currentIndex].play()
                } else {
                    videos[this.currentIndex].pause()
                }

                this.resetConfig()
            },
            contentItemTouchstart(e, index) {
                // this.currentIndex = index
                this.startLocationY = e.touches[0].pageY
                this.startTime = Date.now()
            },
            contentItemTouchmove(e) {
                this.lastLocationY = e.touches[0].pageY

                this.moveYDistance = this.lastLocationY - this.startLocationY
                this.isDrawDown = this.moveYDistance < 0

                this.checkDirection()
                if (this.isCanDownWiping) {
                    if (this.isDrawDown) {
                        this.contentListTop = -this.currentIndex * this.height + this.moveYDistance + this.judgeValue + 'px'
                        // contentList.css({top: -(currentIndex + 0) * height + moveYDistance + judgeValue})
                    } else {
                        this.contentListTop = -this.currentIndex * this.height + this.moveYDistance - this.judgeValue + 'px'
                        // contentList.css({top: -(currentIndex + 0) * height + moveYDistance - judgeValue})
                    }
                }
            },
            contentItemTouchend(e, index) {
                this.currentIndex = index

                if (!this.isCanDownWiping) {
                    this.isNeedCheck = true
                    return
                }
                let endTime = Date.now()
                let gapTime = endTime - this.startTime

                // 如果
                if (Math.abs(this.moveYDistance) < 20) {
                    gapTime = 1000
                }
                if (Math.abs(this.moveYDistance) > (this.width / 3)) {
                    gapTime = 100
                }
                if (gapTime < 150) {
                    if (this.isDrawDown) {
                        console.log('往下划')
                        if (this.data.length < this.currentIndex + 4) {
                            this.loadNewVideo()
                        }
                        this.contentListTop = -(this.currentIndex + 1) * this.height + 'px'
                        this.currentIndex += 1
                    } else {
                        console.log('往上划')
                        if (this.currentIndex === 0) {
                            return this.contentListTop = 0
                        }
                        this.contentListTop = -(this.currentIndex - 1) * this.height + 'px'
                        this.currentIndex -= 1
                    }
                    this.swipingVideo()
                } else {
                    this.contentListTop = -this.currentIndex * this.height + 'px'
                }

                this.resetConfig()
            },
            //加载新的视频
            loadNewVideo() {
                this.data.push({
                    videoUrl: require('../../assets/video/src1.mp4'),
                    videoPoster: require('../../assets/img/poster/src1-bg.png'),
                    isLoved: false,
                    loves: 1234,
                    comments: 666,
                    shared: 999
                })
            },

            //划动到下一个视频
            swipingVideo() {
                let videos = this.$refs.video
                if (this.currentIndex) {
                    videos[this.currentIndex - 1].pause()
                }
                videos[this.currentIndex].play()
                videos[this.currentIndex + 1].pause()


                this.isCommenting = false
                this.isSharing = false
                this.isPlaying = true
            },
            //切换视频状态
            togglePlayVideo(e) {
                if (this.isSharing) {
                    this.isSharing = false
                    return
                }
                if (this.isCommenting) {
                    this.isCommenting = false
                    return
                }
                let el = e.target
                let video = ''
                if (el.nodeName == 'IMG') {
                    video = el.parentNode.previousSibling
                } else {
                    video = el.previousSibling
                }
                if (video.paused) {
                    video.play()
                } else {
                    video.pause()
                }
                this.isPlaying = !video.paused
            },
            //展示评论
            showComment() {
                this.isCommenting = !this.isCommenting
                // setTimeout(() => {
                //     let comment = this.$refs.comment.$el;
                //     this.commentHeight = comment.offsetHeight;
                //     console.log(this.commentHeight);
                //     console.log(this.height);
                // }, 50);
            },
            showShare() {
                this.isSharing = !this.isSharing
                // setTimeout(() => {
                //     let share = this.$refs.share.$el;
                //     this.shareHeight = share.offsetHeight;
                //     console.log(this.shareHeight);
                //     console.log(this.height);
                // }, 50);
            },
            loved(e, index) {
                this.data[index].isLoved = !this.data[index].isLoved
            }
        },
        created() {

        },

    }
</script>
<style scoped lang="scss">
    #home {
        width: 100%;
        height: 100%;
        overflow: hidden;

        .wrapper {
            /*transition: left 0.25s ease;*/
            transition: left 0.25s ease-out;
            position: relative;
            display: flex;
            width: 100%;
            height: 100%;

            .swiper-item {
                /*flex-shrink: 0;*/
                position: absolute;
                width: 100%;
                height: 100%;
            }

            .left-container {
                top: 0;
                left: 0;
                overflow: hidden;

                .content-list {
                    position: absolute;
                    transition: top 0.25s ease-out;
                    height: 100%;
                    width: 100%;

                    .content-item {
                        width: 100%;
                        height: 100%;
                        position: relative;

                        .bg-video {
                            position: relative;
                            background: black;

                            video {
                                width: 100%;
                                height: 100%;
                                /*position: absolute;*/
                            }

                            .float {
                                z-index: 1;
                                position: absolute;
                                top: 0;
                                width: 100%;
                                height: 100%;
                                justify-content: center;
                                align-items: center;

                                .pause {
                                    width: 60px;
                                    height: 60px;
                                    opacity: 0.5;
                                    position: absolute;
                                    margin: auto;
                                    left: 0;
                                    top: 0;
                                    bottom: 0;
                                    right: 0;
                                }

                                .toolbar {
                                    width: 40px;
                                    position: absolute;
                                    bottom: 35px;
                                    right: 20px;
                                    color: #fff;

                                    div {
                                        text-align: center;
                                    }

                                    img {
                                        width: 90%;
                                        height: 90%;
                                    }

                                    .head-image, .music {
                                        width: 100%;
                                        height: 100%;
                                        border-radius: 50%;
                                    }

                                    .love {
                                        img {

                                        }
                                    }

                                    .loved {
                                        background: red;
                                    }

                                    .music {
                                        animation: animations 4s linear forwards infinite;
                                    }

                                    @keyframes animations {
                                        0% {
                                            transform: rotate(0deg);;
                                        }
                                        100% {
                                            transform: rotate(360deg);
                                        }
                                    }
                                }

                                .content {
                                    color: #fff;
                                    position: absolute;
                                    bottom: 35px;
                                    width: 75%;

                                    .music {
                                        position: relative;
                                        width: 60%;

                                        .music-image {
                                            width: 20px;
                                            height: 20px;
                                            margin-top: 3px;
                                            position: absolute;
                                        }

                                        marquee {
                                            margin-left: 30px;
                                        }

                                    }
                                }
                            }
                        }
                    }
                }
            }

            .right-container {
                top: 0;
                left: 100%;
                overflow: auto;

                .user-videos {
                    height: 12000px;
                }
            }
        }
    }
</style>
<style scoped lang="scss">

    .pause-enter-active {
        transition: all .3s ease;
    }

    .pause-leave-active {
        /*transition: all 1s ease ;*/
    }

    .pause-enter, .pause-leave-to {
        transform: scale(2);
        opacity: 0;
    }

    .love-enter-active {
        transition: all .3s ease;
    }

    .love-leave-active {
        transition: all .3s ease;
    }

    .love-leave-to {
        transform: scale(2);
        opacity: 0;
    }

    .loved-enter-active {
        transition: all .3s ease;
    }

    .loved-leave-active {
        transition: all .3s ease;
    }

    .loved-leave-to {
        opacity: 0;
    }


</style>
