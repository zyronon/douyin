<template>
    <div class="message">
        <div class="container p15p">
            <div class="header">
                <div class="title">
                    <p class="tac fb c-white ">消息</p>
                    <span>联系人</span>
                </div>
            </div>
            <div class="toolbar mt20p">
                <div>
                    <img src="../../assets/img/icon/msg-icon1.png" alt="">
                    <span>粉丝</span>
                </div>
                <div>
                    <img src="../../assets/img/icon/msg-icon2.png" alt="">
                    <span>赞</span>
                </div>
                <div>
                    <img src="../../assets/img/icon/msg-icon3.png" alt="">
                    <span>评论和@</span>
                </div>
                <div>
                    <img src="../../assets/img/icon/msg-icon4.png" alt="">
                    <span>随拍互动</span>
                </div>
            </div>
            <div class="messages mt20p">
                <div class="message oh mt15p">
                    <div class="content pull-left ">
                        <img src="../../assets/img/icon/head-image.jpeg" alt="" class="head-image pull-left">
                        <div class="pull-right comment-container">
                            <div class="name">游戏小助手</div>
                            <div class="detail">抖出好游戏</div>
                        </div>
                    </div>
                    <div class="love pull-right">
                        <span class="f14 block">20:54</span>
                    </div>
                </div>
                <div class="message oh mt15p">
                    <div class="content pull-left ">
                        <img src="../../assets/img/icon/head-image.jpeg" alt="" class="head-image pull-left">
                        <div class="pull-right comment-container">
                            <div class="name">抖音小助手</div>
                            <div class="detail">抖音美好奇妙夜小贴士</div>
                        </div>
                    </div>
                    <div class="love pull-right">
                        <span class="f14 block">20:54</span>
                    </div>
                </div>
                <div class="message oh mt15p">
                    <div class="content pull-left ">
                        <img src="../../assets/img/icon/head-image.jpeg" alt="" class="head-image pull-left">
                        <div class="pull-right comment-container">
                            <div class="name">TTentau</div>
                            <div class="detail">其实我也不知道评论点什么啊啊啊看吧看吧看吧</div>
                        </div>
                    </div>
                    <div class="love pull-right">
                        <span class="f14 block">20:54</span>
                    </div>
                </div>
            </div>
            <p class="tac">无更多消息</p>
        </div>
        <Footer v-bind:init-tab="4" />
    </div>
</template>

<script>
    import Footer from '../../components/Footer'

    export default {
        name: "Message",
        components: {
            Footer
        },
        data() {
            return {
            }
        },
        created() {

        },
        mounted() {
        }
    }
</script>

<style scoped lang="scss">
    .message {
        font-size: 1.6rem;
        background: #2e3244;
        color: #b8b9c1;
        height: 100%;

        .header {
            .title {
                position: relative;

                span {
                    position: absolute;
                    right: 10px;
                    top: 0;
                }
            }
        }

        .toolbar {
            display: flex;
            justify-content: space-around;

            div {
                text-align: center;

                img {
                    border-radius: 3px;
                    width: 45px;
                    height: 45px;

                }

                span {
                    display: block;
                }
            }

        }

        .messages {
            border-top: 1px solid #494950;

            .message {
                .content {
                    float: left;
                    width: 85%;

                    .head-image {
                        width: 40px;
                        border-radius: 50%;
                        float: left;
                    }

                    .comment-container {
                        width: 85%;

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
</style>
