<template>
    <div id="home">
        <div class="bg-video" v-for="(item,index) in data">
            <!--<video :src="data[0].videoUrl">-->
            <video src="../../assets/video/吴三二的光年之外.mp4" >
                您的浏览器不支持 video 标签。
            </video>
            <div class="float" @click="togglePlayVideo($event)">
                <transition name="pause">
                    <img src="../../assets/img/play.svg" class="pause" v-show="!isPlaying"
                         @click.stop="togglePlayVideo($event)">
                </transition>
                <div class="toolbar mb10p">
                    <img src="../../assets/img/head-image.jpeg" alt="" class="head-image mb15p">
                    <div class="love mb15p" @click.stop="loved($event,index)">
                        <div>
                            <transition name="love">
                                <img src="../../assets/img/love.svg" class="love-image" v-if="!item.isLoved">
                                <img src="../../assets/img/loved.svg" class="love-image" v-if="item.isLoved">

                            </transition>
                            <transition name="loved">
                            </transition>
                        </div>
                        <span class="f14">{{item.loves}}</span>
                    </div>
                    <div class="message mb15p" @click.stop="isCommenting=!isCommenting">
                        <img src="../../assets/img/message.svg" alt="" class="message-image">
                        <span class="f14">{{item.comments}}</span>
                    </div>
                    <div class="share mb35p" @click.stop="isSharing=!isSharing">
                        <img src="../../assets/img/share.svg" alt="" class="share-image">
                        <span class="f14">{{item.shared}}</span>
                    </div>
                    <img src="../../assets/img/head-image.jpeg" alt="" class="music">
                </div>
                <div class="content ml10p">
                    <div class="name mb10p">@TTentau</div>
                    <div class="description mb10p">
                        吴三二的光年之外, 您的浏览器不支持 video 标签。 您的浏览器不支持 video 标签。
                    </div>
                    <div class="music mb10p">
                        <img src="../../assets/img/music.svg" alt="" class="music-image">
                        <marquee behavior=scroll direction=left align=middle scrollamount=4> 吴三二 - 光年之外</marquee>
                    </div>
                </div>
            </div>
        </div>
        <Comment v-bind:is-commenting="isCommenting" v-on:showComment='isCommenting=!isCommenting'/>
        <Share v-bind:is-sharing="isSharing"/>
        <Footer v-bind:init-tab="1"/>
    </div>
</template>

<script>
    import Comment from './Comment';
    import Share from './Share';
    import Footer from '../common/Footer';

    export default {
        name: "Home",
        components: {
            Comment,
            Share,
            Footer
        },
        data() {
            return {
                isPlaying: true,
                isCommenting: false,
                isSharing: false,
                data: [
                    {
                        videoUrl: '../assets/video/吴三二的光年之外.mp4',
                        isLoved: false,
                        loves: 1234,
                        comments: 666,
                        shared: 999
                    },
                    {
                        videoUrl: '../assets/video/吴三二的光年之外.mp4',
                        isLoved: false,
                        loves: 1234,
                        comments: 666,
                        shared: 999
                    }
                ]
            }
        },
        methods: {
            togglePlayVideo(e) {
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
            },
            loved(e, index) {
                let img = e.target.parentNode.childNodes[0];
                console.log(img);
                console.log(index);
                this.data[index].isLoved = !this.data[index].isLoved;

            }

        },
        created() {
            // console.log(55)
        },
        mounted() {
        }
    }
</script>

<style scoped lang="scss">
    #home {
        .bg-video {
            position: relative;
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
