<template>
    <transition name="comment">
        <div class="comment f14" v-if="isCommenting">
            <div class="title">
                <p>2.7w条评论</p>
                <img src="../assets/img/close.svg" @click.stop="$emit('showComment')">
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

</template>

<script>
    export default {
        name: "Comment",
        props: ['isCommenting'],
        methods: {
            // showComment() {
            //     this.isCommenting = !this.isCommenting;
            //     console.log(666)
            // }
        }
    }
</script>

<style lang="scss" scoped>
    .comment {
        position: absolute;
        bottom: 0;
        background: #fff;
        z-index: 2;
        border-radius: 10px 10px 0 0;
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
