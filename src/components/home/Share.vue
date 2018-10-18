<template>
    <transition name="comment">
        <div class="share" v-if="isSharing">
            <div class="friends oh p10p ">
                <div class="title tac pb10p">私信给</div>
                <div class="w200">
                    <div class="friend pr10p">
                        <img src="../../assets/img/head-image.jpeg" alt="">
                        <span>ttentau</span>
                    </div>
                    <div class="friend pr10p">
                        <img src="../../assets/img/head-image.jpeg" alt="">
                        <span>ttentau</span>
                    </div>
                    <div class="friend pr10p">
                        <img src="../../assets/img/head-image.jpeg" alt="">
                        <span>ttentau</span>
                    </div>
                    <div class="friend pr10p">
                        <img src="../../assets/img/head-image.jpeg" alt="">
                        <span>ttentau</span>
                    </div>
                    <div class="friend pr10p">
                        <img src="../../assets/img/head-image.jpeg" alt="">
                        <span>ttentau</span>
                    </div>
                    <div class="friend pr10p">
                        <img src="../../assets/img/head-image.jpeg" alt="">
                        <span>ttentau</span>
                    </div>
                    <div class="friend pr10p">
                        <img src="../../assets/img/head-image.jpeg" alt="">
                        <span>ttentau</span>
                    </div>
                    <div class="friend pr10p">
                        <img src="../../assets/img/ic_more.svg" alt="">
                        <span>更多</span>
                    </div>
                </div>
            </div>
            <div class="shares oh pl20p pr20p pt10p pb10p">
                <div class="title tac pb10p">分享到</div>
                <div class="w200">
                    <div class="share-to pr10p">
                        <img src="../../assets/img/friend_circle.svg" alt="">
                        <span>朋友圈</span>
                    </div>
                    <div class="share-to pr10p">
                        <img src="../../assets/img/wechat.svg" alt="">
                        <span>微信</span>
                    </div>
                    <div class="share-to pr10p">
                        <img src="../../assets/img/sq-share-qqzone-01.svg">
                        <span>QQ空间</span>
                    </div>
                    <div class="share-to pr10p">
                        <img src="../../assets/img/QQ.svg">
                        <span>QQ</span>
                    </div>
                    <div class="share-to pr10p">
                        <img src="../../assets/img/sina.svg">
                        <span>微博</span>
                    </div>
                    <div class="share-to pr10p">
                        <img src="../../assets/img/More.svg">
                        <span>更多</span>
                    </div>
                </div>

            </div>
            <div class="toolbar oh pl20p pr20p pt10p pb10p f11">
                <div class="w200">
                    <div class="tool pr10p ">
                        <img src="../../assets/img/举报.svg" alt="">
                        <span>举报</span>
                    </div>
                    <div class="tool pr10p ">
                        <img src="../../assets/img/download.svg" alt="">
                        <span>保存本地</span>
                    </div>
                    <div class="tool pr10p ">
                        <img src="../../assets/img/collect.svg" alt="">
                        <span>收藏</span>
                    </div>
                    <div class="tool pr10p ">
                        <img src="../../assets/img/qiangjing.svg" alt="">
                        <span>抢镜</span>
                    </div>
                    <div class="tool pr10p">
                        <img src="../../assets/img/qr_code.svg" alt="">
                        <span>二维码</span>
                    </div>
                    <div class="tool pr10p">
                        <img src="../../assets/img/dongtaibizhi.svg" alt="">
                        <span>动态壁纸</span>
                    </div>
                    <div class="tool pr10p">
                        <img src="../../assets/img/hepai.svg" alt="">
                        <span>合拍</span>
                    </div>
                    <div class="tool pr10p">
                        <img src="../../assets/img/dislike.svg" alt="">
                        <span>不感兴趣</span>
                    </div>
                    <div class="tool pr10p">
                        <img src="../../assets/img/href.svg" alt="">
                        <span>复制链接</span>
                    </div>
                </div>
            </div>
            <div class="dismiss">
                取消
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "Share",
        props:['isSharing']
    }
</script>

<style lang="scss" scoped>

    .share {
        position: absolute;
        bottom: 0;
        z-index: 2;
        background: #eaeaea;
        border-radius: 10px 10px 0 0;
        .friends {
            overflow-x: scroll;
            .friend {
                float: left;
                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                }
                span {
                    display: block;
                    text-align: center;
                }
            }
        }
        .shares {
            background: white;
            overflow-x: scroll;
            .share-to {
                float: left;
                width: 50px;
                img {
                    width: 27px;
                    height: 27px;
                    padding: 6px;
                    border-radius: 50%;
                    background: #1ace04;
                }
                span {
                    display: block;
                    text-align: center;
                }
            }
        }
        .toolbar {
            border-top: 1px solid #eaeaea;
            background: white;
            overflow-x: scroll;
            .tool {
                float: left;
                img {
                    width: 22px;
                    height: 22px;
                    padding: 10px;
                    border-radius: 50%;
                    background: #eaeaea;
                }
                span {
                    display: block;
                    text-align: center;
                }
            }
        }
        .dismiss {
            background: white;
            border-top: 1px solid #eaeaea;
            text-align: center;
            height: 30px;
            line-height: 30px;
        }
    }

    .comment-enter-active {
        transition: all .3s ease;
    }

    .comment-leave-active {
        transition: all .3s ease;
    }

    .comment-enter, .comment-leave-to {
        transform: translateY(300px);
    }
</style>
