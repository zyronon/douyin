<template>
    <div id="home">
        <swiper :options="swiperOptionh" :style="{'height':otherUserHeight+'px'}">
            <swiper-slide>
                <swiper :options="swiperOptionv">
                    <swiper-slide v-for="(item,index) in data">
                        <div class="bg-video" v-bind:style="{'height':height+'px'}">
                            <video :src="item.videoUrl" :poster="item.poster" ref="video" :autoplay="index == 0" loop>
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
                    </swiper-slide>
                </swiper>
                <Comment v-bind:is-commenting="isCommenting"
                         v-on:showComment='isCommenting = !isCommenting'
                         ref="comment"
                         :style="{'top':height-commentHeight+'px'}"/>
                <Share v-bind:is-sharing="isSharing" ref="share" :style="{'top':height-shareHeight+'px'}"/>
                <Footer v-bind:init-tab="1" ref="footer" :style="{'top':height-footerHeight+'px'}"/>
            </swiper-slide>
            <swiper-slide>
                <Other ref="other"/>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
    import Comment from './Comment';
    import Other from '../user/Other';
    import Message from '../message/Message';
    import Share from './Share';
    import Footer from '../common/Footer';
    import {swiper, swiperSlide} from 'vue-awesome-swiper';

    require('swiper/dist/css/swiper.css');    //注意这里


    let self = null;
    export default {
        name: "Home",
        components: {
            Comment,
            Share,
            Footer,
            Message,
            Other,
            swiper,
            swiperSlide
        },
        data() {
            return {
                currentPlayIndex: 0,
                isPlaying: true,
                isCommenting: false,
                isSharing: false,
                height: 0,
                width: 0,
                otherUserHeight: 0,
                footerHeight: 0,
                commentHeight: 0,
                shareHeight: 0,
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
                    }
                ],
                swiperOptionh: {
                    direction: 'horizontal',
                    height: document.body.clientHeight,
                    width: document.body.clientWidth,
                    // autoHeight: true, //高度随内容变化
                    on: {
                        slideChange: function () {
                            window.scrollTo(0, 0);
                            self.isCommenting = false;
                            self.isSharing = false;
                            if (self.isPlaying) {
                                let currentVideo = self.$refs.video[self.currentPlayIndex];
                                currentVideo.pause();
                                self.isPlaying = false;
                            }
                            if (this.activeIndex == 0 ) {
                                if (!self.isPlaying){
                                    let currentVideo = self.$refs.video[self.currentPlayIndex];
                                    currentVideo.play();
                                    self.isPlaying = true;
                                }
                            }
                        },
                    },
                },
                swiperOptionv: {
                    direction: 'vertical',
                    height: document.body.clientHeight,
                    width: document.body.clientWidth,
                    // autoHeight: true, //高度随内容变化
                    on: {
                        slideChange() {
                            self.isCommenting = false;
                            self.isSharing = false;


                            let dateLength = self.data.length;
                            let index = self.currentPlayIndex = this.activeIndex;
                            console.log(index);
                            console.log(dateLength)

                            let currentVideo = self.$refs.video[index];
                            self.isPlaying = true;
                            currentVideo.currentTime = 0;
                            // console.log(currentVideo);
                            currentVideo.play();
                            if (index == 0) {
                                let nextVideo = self.$refs.video[index + 1];
                                nextVideo.pause();
                            } else if (index == dateLength - 1) {
                                let preVideo = self.$refs.video[index - 1];
                                preVideo.pause();
                            } else {
                                let nextVideo = self.$refs.video[index + 1];
                                nextVideo.pause();
                                let preVideo = self.$refs.video[index - 1];
                                preVideo.pause();
                            }

                            if (index + 2 > dateLength) {
                                self.data.push(
                                    {
                                        videoUrl: require('../../assets/video/src1.mp4'),
                                        videoPoster: require('../../assets/img/poster/src1-bg.png'),
                                        isLoved: false,
                                        loves: 1234,
                                        comments: 666,
                                        shared: 999
                                    }
                                )
                            }
                            console.log(self.data);
                        },
                        touchStart(event) {
                            // console.log();
                            // event.stopPropagation();
                            // self.isCommenting = false;
                            // self.isSharing = false;
                        }
                    },

                }
            }
        },
        methods: {
            togglePlayVideo(e) {
                console.log('1');
                console.log(this.isCommenting)
                console.log(this.isSharing);
                // return;
                if (this.isSharing) {
                    this.isSharing = false;
                    return;
                }
                if (this.isCommenting) {
                    this.isCommenting = false;
                    return;
                }
                // console.log(e);
                let el = e.target;
                // console.log(el)
                // console.log(el.nodeName);
                let video = '';
                if (el.nodeName == 'IMG') {
                    video = el.parentNode.previousSibling;
                } else {
                    video = el.previousSibling;
                }
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
                this.isPlaying = !video.paused;

                // this.isPlaying = !this.isPlaying;
            },
            showComment() {
                this.isCommenting = !this.isCommenting;
                setTimeout(() => {
                    let comment = this.$refs.comment.$el;
                    this.commentHeight = comment.offsetHeight;
                    console.log(this.commentHeight);
                    console.log(this.height);
                }, 50);
            },
            showShare() {
                this.isSharing = !this.isSharing;
                setTimeout(() => {
                    let share = this.$refs.share.$el;
                    this.shareHeight = share.offsetHeight;
                    console.log(this.shareHeight);
                    console.log(this.height);
                }, 50);
            },
            loved(e, index) {
                let img = e.target.parentNode.childNodes[0];
                console.log(img);
                console.log(index);
                this.data[index].isLoved = !this.data[index].isLoved;

            }
        },
        created() {
            self = this;
            window.scrollTo(0, 0);
            this.height = document.body.clientHeight;
            this.width = document.body.clientWidth;
        },
        mounted() {
            window.scrollTo(0, 0);
            let other = this.$refs.other.$el;
            let footer = this.$refs.footer.$el;
            // let share = this.$refs.share.$el;
            this.otherUserHeight = other.offsetHeight;
            if (this.otherUserHeight < this.height) {
                this.otherUserHeight = this.height;
            }
            this.footerHeight = footer.offsetHeight;
        }
    }
</script>

<style scoped lang="scss">
    #home {
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
