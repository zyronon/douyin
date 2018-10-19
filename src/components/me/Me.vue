<template>
    <div class="me">
        <div class="container">
            <div class="header" v-bind:style="{height:height/2+'px'}">
                <div class="top pt20p pl10p pr10p">
                    <img src="../../assets/img/next.svg" alt="">
                    <img src="../../assets/img/more.svg" alt="">
                </div>
                <div class="bottom">
                    <div class="container p10p">
                        <div class="head">
                            <img src="../../assets/img/head-image.jpeg" class="head-image">
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
                                    <img src="../../assets/img/collect-white.svg" alt="">
                                    <span class="mr5p">收藏</span>
                                </div>
                                <div class="add-friend">
                                    <img src="../../assets/img/add-friend-white.svg" alt="">
                                </div>
                                <div class="qr-code">
                                    <img src="../../assets/img/qr-code-white.svg" alt="">
                                </div>
                            </div>
                        </div>
                        <div class="description">
                            <p class="name f22 mt5p mb5p">ttentau</p>
                            <div class="number">
                                <span>抖音号：605128307</span>
                                <div class="jrtt">
                                    <img src="../../assets/img/sina.svg" alt="">
                                    <span>头条主页</span>
                                    <img src="../../assets/img/next.svg" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content">

            </div>
        </div>
        <Footer v-bind:init-tab="5"/>
    </div>
</template>

<script>
    import Footer from '../common/Footer';

    export default {
        name: "Me",
        components: {
            Footer
        },
        data() {
            return {
                height: 0
            }
        },
        created() {
            this.height = window.screen.height;
        }
    }
</script>

<style scoped lang="scss">
    .me {
        .header {
            background: gray;
            .top {
                height: 40%;
                display: flex;
                justify-content: space-between;
                background: url("../../assets/img/top-bg.jpg");
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
            .bottom {
                background-image: url("../../assets/img/head-image.jpeg");
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
                height: 60%;
                .container {
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.89);
                    .head {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .head-image {
                            background: black;
                            padding: 5px;
                            border-radius: 50%;
                            width: 60px;
                            height: 60px;
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
                                span{
                                    color: #cdcdcd;
                                }
                            }

                        }
                    }
                    .description{
                        color: white;
                        .number{
                            padding-bottom: 10px;
                            border-bottom: 1px solid gray;
                            .jrtt{
                                float: right;
                                img {
                                    height: 10px;
                                    width: 10px;
                                }
                                span {
                                    margin:0 5px;
                                }
                            }
                        }
                    }
                }

            }
        }
    }
</style>