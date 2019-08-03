<template>
    <div id="app">
        <transition   name="slide-fade">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                transitionName: 'fold-left'
            }
        },
        watch: {
            '$route'(to, from) {
                //此时假设从index页面跳转到pointList页面
                // console.log(to) // "/pointList"
                // console.log(from) // “/index”
                // if (to.path === '/me') {
                //     this.transitionName = 'fold-right'
                // } else {
                //     this.transitionName = 'fold-left'
                // }
            }
        },
    }
</script>

<style lang="scss">
    #app {
        background: #2e3244;
        height: 100%;
    }

    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */ {
        transform: translateX(10px);
        opacity: 0;
    }
</style>
