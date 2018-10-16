<template>
    <div id="home">
        <div class="bg-video">
            <video src="../assets/video/吴三二的光年之外.mp4">
                您的浏览器不支持 video 标签。
            </video>
            <div class="float" @click="togglePlayVideo($event)">
                <transition name="pause">
                    <img src="../assets/img/play.svg" class="pause" v-show="!isPlaying"
                         @click.stop="playVideo2($event)">
                </transition>
                <div class="toolbar mb10p">
                    <img src="../assets/img/head-image.jpeg" alt="" class="head-image mb15p">
                    <div class="love mb15p">
                        <img src="../assets/img/love.svg" alt="" class="love-image">
                        <span class="f14">3453</span>
                    </div>
                    <div class="message mb15p" @click.stop="showComment()">
                        <img src="../assets/img/message.svg" alt="" class="message-image">
                        <span class="f14">6666</span>
                    </div>
                    <div class="share mb35p">
                        <img src="../assets/img/share.svg" alt="" class="share-image">
                        <span class="f14">555</span>
                    </div>
                    <img src="../assets/img/head-image.jpeg" alt="" class="music">
                </div>
                <div class="content ml10p">
                    <div class="name mb10p">@TTentau</div>
                    <div class="description mb10p">
                        吴三二的光年之外, 您的浏览器不支持 video 标签。 您的浏览器不支持 video 标签。
                    </div>
                    <div class="music mb10p">
                        <img src="../assets/img/music.svg" alt="" class="music-image">
                        <marquee behavior=scroll direction=left align=middle scrollamount=4> 吴三二 - 光年之外</marquee>
                    </div>
                </div>
            </div>
        </div>
        <transition name="comment">
            <div class="comment f14" v-if="isComment">
                <div class="title">
                    <p>2.7w条评论</p>
                    <img src="../assets/img/close.svg" @click.stop="showComment()">
                </div>
                <div class="items">
                    <div class="item pl5p pr15p mb5p  oh">
                        <div class="content pull-left ">
                            <img src="../assets/img/head-image.jpeg" alt="" class="head-image pull-left">
                            <div class="pull-right comment-container">
                                <div class="name">@ttentau</div>
                                <div class="detail">其实我也不知道评论点什么啊啊啊看吧看吧看吧</div>
                                <div class="time mt10p">10-02</div>
                            </div>
                        </div>
                        <div class="love pull-right">
                            <img src="../assets/img/love-gray.svg" alt="" class="love-image">
                            <span class="f14 block">3453</span>
                        </div>
                    </div>
                    <div class="item pl5p pr15p mb5p  oh">
                        <div class="content pull-left ">
                            <img src="../assets/img/head-image.jpeg" alt="" class="head-image pull-left">
                            <div class="pull-right comment-container">
                                <div class="name">@ttentau</div>
                                <div class="detail">其实我也不知道评论点什么啊啊啊看吧看吧看吧</div>
                                <div class="time mt10p">10-02</div>
                            </div>
                        </div>
                        <div class="love pull-right">
                            <img src="../assets/img/love-gray.svg" alt="" class="love-image">
                            <span class="f14 block">3453</span>
                        </div>
                    </div>
                    <div class="item pl5p pr15p mb5p  oh">
                        <div class="content pull-left ">
                            <img src="../assets/img/head-image.jpeg" alt="" class="head-image pull-left">
                            <div class="pull-right comment-container">
                                <div class="name">@ttentau</div>
                                <div class="detail">其实我也不知道评论点什么啊啊啊看吧看吧看吧</div>
                                <div class="time mt10p">10-02</div>
                            </div>
                        </div>
                        <div class="love pull-right">
                            <img src="../assets/img/love-gray.svg" alt="" class="love-image">
                            <span class="f14 block">3453</span>
                        </div>
                    </div>
                    <div class="item pl5p pr15p mb5p  oh">
                        <div class="content pull-left ">
                            <img src="../assets/img/head-image.jpeg" alt="" class="head-image pull-left">
                            <div class="pull-right comment-container">
                                <div class="name">@ttentau</div>
                                <div class="detail">其实我也不知道评论点什么啊啊啊看吧看吧看吧</div>
                                <div class="time mt10p">10-02</div>
                            </div>
                        </div>
                        <div class="love pull-right">
                            <img src="../assets/img/love-gray.svg" alt="" class="love-image">
                            <span class="f14 block">3453</span>
                        </div>
                    </div>
                    <div class="item pl5p pr15p mb5p  oh">
                        <div class="content pull-left ">
                            <img src="../assets/img/head-image.jpeg" alt="" class="head-image pull-left">
                            <div class="pull-right comment-container">
                                <div class="name">@ttentau</div>
                                <div class="detail">其实我也不知道评论点什么啊啊啊看吧看吧看吧</div>
                                <div class="time mt10p">10-02</div>
                            </div>
                        </div>
                        <div class="love pull-right">
                            <img src="../assets/img/love-gray.svg" alt="" class="love-image">
                            <span class="f14 block">3453</span>
                        </div>
                    </div>
                    <div class="item pl5p pr15p mb5p  oh">
                        <div class="content pull-left ">
                            <img src="../assets/img/head-image.jpeg" alt="" class="head-image pull-left">
                            <div class="pull-right comment-container">
                                <div class="name">@ttentau</div>
                                <div class="detail">其实我也不知道评论点什么啊啊啊看吧看吧看吧</div>
                                <div class="time mt10p">10-02</div>
                            </div>
                        </div>
                        <div class="love pull-right">
                            <img src="../assets/img/love-gray.svg" alt="" class="love-image">
                            <span class="f14 block">3453</span>
                        </div>
                    </div>
                    <div class="item pl5p pr15p mb5p  oh">
                        <div class="content pull-left ">
                            <img src="../assets/img/head-image.jpeg" alt="" class="head-image pull-left">
                            <div class="pull-right comment-container">
                                <div class="name">@ttentau</div>
                                <div class="detail">其实我也不知道评论点什么啊啊啊看吧看吧看吧</div>
                                <div class="time mt10p">10-02</div>
                            </div>
                        </div>
                        <div class="love pull-right">
                            <img src="../assets/img/love-gray.svg" alt="" class="love-image">
                            <span class="f14 block">3453</span>
                        </div>
                    </div>
                </div>
                <div class="input-comment">
                    <input type="text" placeholder="留下你的精彩评论哦">
                    <span>@</span>
                </div>
            </div>
        </transition>

    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                isPlaying: true,
                isComment: false,
            }
        },
        methods: {
            togglePlayVideo(e) {
                console.log(e.target);
                let float = e.target;
                let video = float.previousSibling;
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
                this.isPlaying = !video.paused;
            },
            showComment() {
                this.isComment = !this.isComment;
            }
        },
        created() {
            console.log(55)
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
                    bottom: 20px;
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
                    bottom: 20px;
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
        .comment {
            position: absolute;
            bottom: 0;
            background: #fff;
            z-index: 2;
            border-radius: 10px;
            .title {
                position: relative;
                p {
                    text-align: center;
                }
                img {
                    width: 15px;
                    height: 15px;
                    position: absolute;
                    right: 20px;
                    top: 0;
                }
            }
            .input-comment {
                height: 30px;
                border-top: 1px solid #e2e1e1;
                input {
                    height: 100%;
                    width: 90%;
                }
                span {
                    color: #999;
                    font-size: 22px;
                }
            }
            .items {
                overflow-y: scroll;
                max-height: 300px;
                .item {
                    .head-image {
                        width: 40px;
                        border-radius: 50%;
                        float: left;
                    }
                    .content {
                        float: left;
                        width: 85%;
                        .head-image {
                            width: 15%;
                        }
                        .comment-container {
                            width: 80%;
                            .time {
                                color: gray;
                            }
                        }

                    }
                    .love {
                        text-align: center;
                        .love-image {
                            width: 30px;
                            border-radius: 50%;
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

    .comment-enter-active {
        transition: all .3s ease;
    }

    .comment-leave-active {
        transition: all .3s ease ;
    }

    .comment-enter, .comment-leave-to {
        transform: translateY(300px);
    }

</style>
