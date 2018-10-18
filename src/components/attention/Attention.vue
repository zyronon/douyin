<template>
    <div id="attention">
        <div class="items">
            <div class="item">

            </div>
        </div>
        <Footer v-bind:init-tab="2"/>
    </div>
</template>

<script>

    import Footer from '../common/Footer';

    export default {
        name: "Attention",
        components:{
            Footer
        }
    }
</script>

<style scoped>

</style>
