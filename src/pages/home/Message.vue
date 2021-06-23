<template>
    <div id="Message">
        <div class="container">
            <div class="header pt15p">
                <div class="title">
                    <p class="tac fb c-white ">消息</p>
                    <span @click="nav('/myCard')">联系人</span>
                </div>
            </div>
            <div class="line mt20p"></div>
            <div class="toolbar mt30p">
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
            <div class="line mt20p"></div>
            <div class="messages  mt10p">
                <div class="message top">
                    <img src="../../assets/img/icon/head-image.jpeg" alt="" class="head-image pull-left">
                    <div class="content">
                        <div class="left">
                            <div class="name">游戏小助手</div>
                            <div class="detail">抖出好游戏</div>
                        </div>
                        <div class="right">
                            <div class="f14">20:54</div>
                            <div class="number">9</div>
                        </div>
                    </div>
                </div>
                <div class="message">
                    <img src="../../assets/img/icon/head-image.jpeg" alt="" class="head-image pull-left">
                    <div class="content">
                        <div class="left">
                            <div class="name">游戏小助手</div>
                            <div class="detail">抖出好游戏</div>
                        </div>
                        <div class="right">
                            <div class="f14">20:54</div>
                            <div class="number">9</div>
                        </div>
                    </div>
                </div>
            </div>
            <p class="tac mt18p f12">无更多消息</p>
        </div>
        <Footer v-bind:init-tab="4"/>
    </div>
</template>

<script>
    import Footer from '../../components/Footer.vue'

    export default {
        name: "Message",
        components: {
            Footer
        },
        data() {
            return {}
        },
        created() {

        },
        mounted() {
        }
    }
</script>

<style scoped lang="scss">
    #Message {
        position: fixed;
        font-size: 1.6rem;
        background: #2e3244;
        color: #b8b9c1;
        height: 100%;
        width: 100vw;

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

        .line {
            margin: 0 20px;
            border-top: 1px solid #494950;
        }

        .messages {

            .message {
                padding:13px 20px;
                display: flex;
                align-items: center;

                &.top{
                    background: #353a4f;
                }
                &:active{
                    background: #353a4f;
                }

                .head-image {
                    margin-right: 20px;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                }

                .content {
                    flex: 1;
                    display: flex;
                    justify-content: space-between;

                    .left {
                        .name {
                            color: white;
                        }

                        .detail {
                            margin-top: 5px;
                            font-size: 14px;
                        }
                    }

                    .right {
                        font-size: 14px;
                        text-align: center;

                        .number {
                            display: inline-block;
                            min-height: 20px;
                            min-width: 20px;
                            text-align: center;
                            color: black;
                            margin-top: 5px;
                            /*padding: 5px;*/
                            background: yellow;
                            border-radius: 50%;

                        }
                    }
                }

            }
        }
    }
</style>
