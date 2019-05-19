<template>
    <div id="app" >
        <!--<Home/>-->
        <router-view></router-view>
    </div>
</template>

<script>
    // import Home from './components/home/Home.vue'

    export default {
        name: 'app'
    }
</script>

<style lang="scss">
    #app {
        background: #2e3244;
        height: 100%;
        font-size: 14px;
        padding: 0;
        margin: 0;
        font-family: "Microsoft Sans Serif";
    }
</style>
