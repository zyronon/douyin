<template>
    <div class="message">
        <div class="container p15p">
            <div class="header">
                <div class="title">
                    <p class="tac">消息</p>
                    <span>联系人</span>
                </div>
            </div>
            <div class="toolbar mt20p">
                <div>
                    <img src="../../assets/img/icon/person.svg" alt="">
                    <span>粉丝</span>
                </div>
                <div>
                    <img src="../../assets/img/icon/love.svg" alt="">
                    <span>赞</span>
                </div>
                <div>
                    <img src="../../assets/img/icon/person.svg" alt="">
                    <span>@我的</span>
                </div>
                <div>
                    <img src="../../assets/img/icon/message.svg" alt="">
                    <span>评论</span>
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
        <Footer v-bind:init-tab="4" ref="footer" :style="{'top':height-footerHeight+'px'}"/>
    </div>
</template>

<script>
    import Footer from '../common/Footer';

    export default {
        name: "Message",
        components: {
            Footer
        },
        data() {
            return {
                height:0,
                width:0,
                footerHeight:0
            }
        },
        created() {
            self = this;
            this.height = document.body.clientHeight;
            this.width = document.body.clientWidth;
        },
        mounted() {
            let footer = this.$refs.footer.$el;
            this.footerHeight = footer.offsetHeight;

        }
    }
</script>

<style scoped lang="scss">
    .message {
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
                &:nth-child(1) {
                    img {
                        background: rgb(79, 136, 251);
                    }
                }
                &:nth-child(2) {
                    img {
                        background: rgb(248, 53, 95);
                    }
                }
                &:nth-child(3) {
                    img {
                        background: rgb(28, 194, 98);
                    }
                }
                &:nth-child(4) {
                    img {
                        background: rgb(195, 106, 250);
                    }
                }
                img {
                    padding: 10px;
                    border-radius: 3px;
                    width: 25px;
                    height: 25px;

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
