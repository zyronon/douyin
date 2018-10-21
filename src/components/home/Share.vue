<template>
    <transition name="comment">
        <div class="share" v-if="isSharing">
            <div class="friends oh p10p ">
                <div class="title tac pb10p">私信给</div>
                <div class="w200">
                    <div class="friend pr10p">
                        <img src="../../assets/img/icon/head-image.jpeg" alt="">
                        <span>ttentau</span>
                    </div>
                    <div class="friend pr10p">
                        <img src="../../assets/img/icon/head-image.jpeg" alt="">
                        <span>ttentau</span>
                    </div>
                    <div class="friend pr10p">
                        <img src="../../assets/img/icon/head-image.jpeg" alt="">
                        <span>ttentau</span>
                    </div>
                    <div class="friend pr10p">
                        <img src="../../assets/img/icon/head-image.jpeg" alt="">
                        <span>ttentau</span>
                    </div>
                    <div class="friend pr10p">
                        <img src="../../assets/img/icon/head-image.jpeg" alt="">
                        <span>ttentau</span>
                    </div>
                    <div class="friend pr10p">
                        <img src="../../assets/img/icon/head-image.jpeg" alt="">
                        <span>ttentau</span>
                    </div>
                    <div class="friend pr10p">
                        <img src="../../assets/img/icon/head-image.jpeg" alt="">
                        <span>ttentau</span>
                    </div>
                    <div class="friend pr10p">
                        <img src="../../assets/img/icon/next.svg" alt="">
                        <span>更多</span>
                    </div>
                </div>
            </div>
            <div class="shares oh pl20p pr20p pt10p pb10p">
                <div class="title tac pb10p">分享到</div>
                <div class="w200">
                    <div class="share-to pr10p">
                        <img src="../../assets/img/icon/friend_circle.svg" alt="">
                        <span>朋友圈</span>
                    </div>
                    <div class="share-to pr10p">
                        <img src="../../assets/img/icon/wechat.svg" alt="">
                        <span>微信</span>
                    </div>
                    <div class="share-to pr10p">
                        <img src="../../assets/img/icon/sq-share-qqzone-01.svg">
                        <span>QQ空间</span>
                    </div>
                    <div class="share-to pr10p">
                        <img src="../../assets/img/icon/QQ.svg">
                        <span>QQ</span>
                    </div>
                    <div class="share-to pr10p">
                        <img src="../../assets/img/icon/sina.svg">
                        <span>微博</span>
                    </div>
                    <div class="share-to pr10p">
                        <img src="../../assets/img/icon/more.svg">
                        <span>更多</span>
                    </div>
                </div>

            </div>
            <div class="toolbar oh pl20p pr20p pt10p pb10p f11">
                <div class="w200">
                    <div class="tool pr10p ">
                        <img src="../../assets/img/icon/举报.svg" alt="">
                        <span>举报</span>
                    </div>
                    <div class="tool pr10p ">
                        <img src="../../assets/img/icon/download.svg" alt="">
                        <span>保存本地</span>
                    </div>
                    <div class="tool pr10p ">
                        <img src="../../assets/img/icon/collect.svg" alt="">
                        <span>收藏</span>
                    </div>
                    <div class="tool pr10p ">
                        <img src="../../assets/img/icon/qiangjing.svg" alt="">
                        <span>抢镜</span>
                    </div>
                    <div class="tool pr10p">
                        <img src="../../assets/img/icon/qr_code.svg" alt="">
                        <span>二维码</span>
                    </div>
                    <div class="tool pr10p">
                        <img src="../../assets/img/icon/dongtaibizhi.svg" alt="">
                        <span>动态壁纸</span>
                    </div>
                    <div class="tool pr10p">
                        <img src="../../assets/img/icon/hepai.svg" alt="">
                        <span>合拍</span>
                    </div>
                    <div class="tool pr10p">
                        <img src="../../assets/img/icon/dislike.svg" alt="">
                        <span>不感兴趣</span>
                    </div>
                    <div class="tool pr10p">
                        <img src="../../assets/img/icon/href.svg" alt="">
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
        position: fixed;
        top: 200px;
        z-index: 5;
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
