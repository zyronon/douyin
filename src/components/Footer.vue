<template>
    <div class="footer f16 ">
        <div class="button" @click="tab(1)"><span v-bind:class="{active:currentTab==1}">首页</span></div>
        <div class="button" @click="tab(2)"><span v-bind:class="{active:currentTab==2}">关注</span></div>
        <div class="button" @click="tab(3)"><img src="../assets/img/add.svg" alt=""></div>
        <div class="button" @click="tab(4)"><span v-bind:class="{active:currentTab==4}">消息</span></div>
        <div class="button" @click="tab(5)"><span v-bind:class="{active:currentTab==5}">我</span></div>
    </div>
</template>

<script>
    export default {
        name: "Footer",
        data() {
            return {
                currentTab: 1
            }
        },
        methods: {
            tab(index) {
                this.currentTab = index;
                console.log(index);
            }
        }
    }
</script>

<style scoped lang="scss">

    .footer {
        border-top: 1px solid #7b7878;
        position: absolute;
        z-index: 2;
        bottom: 0;
        width: 100%;
        background: #020202b3;
        color: white;
        .button {
            width: 20%;
            /*height: 35px;*/
            float: left;
            text-align: center;
            margin-top: 8px;
            span {
                border-bottom: 0px solid white;
                padding-bottom: 5px;
            }
            .active {
                border-bottom: 2px solid white;
            }
            img {
                height: 15px;
                background: white;
                padding: 5px 15px;
                border-radius: 5px;
            }
        }
    }
</style>
