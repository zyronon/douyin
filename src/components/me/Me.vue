<template>
    <div class="me">
        <Footer v-bind:init-tab="5"/>
    </div>
</template>

<script>
    import Footer from '../common/Footer';

    export default {
        name: "Me",
        components: {
            Footer
        }
    }
</script>

<style scoped>

</style>