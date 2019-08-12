<template>
    <div id="app">
        <transition :name="$store.state.pageAnim">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {}
        },
        watch: {
            $route(to, from) {
                let rootRouters = ['/', '/home', '/attention', '/message', '/me']
                if (rootRouters.indexOf(to.path) !== -1 && rootRouters.indexOf(from.path) !== -1) {
                    this.$store.commit('setPageAnim', 'none')
                    return
                }
                let routers = ['/', '/home', '/attention', '/message', '/me', '/MyCard','/MyCollect', '/chooseCountry']
                //根据路由层次来决定转场效果
                if (routers.indexOf(to.path) > routers.indexOf(from.path)) {
                    this.$store.commit('setPageAnim', 'go')
                } else {
                    this.$store.commit('setPageAnim', 'back')
                }
            }
        }
    }
</script>

<style lang="scss">
    #app {
        background: #2e3244;
        height: 100%;
    }


    .go-enter {
        left: 100%;
    }

    .go-enter-to {
        left: 0;
    }

    .go-leave {
        left: 0;
    }

    .go-leave-to {
        left: -100%;
    }

    .go-enter-active, .go-leave-active {
        transition: all .3s;
    }


    .back-enter {
        left: -100%;
    }

    .back-enter-to {
        left: 0;
    }

    .back-leave {
        left: 0;
    }

    .back-leave-to {
        left: 100%;
    }

    .back-enter-active, .back-leave-active {
        transition: all .3s;
    }


</style>
