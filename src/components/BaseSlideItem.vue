<template>
    <div id="base-slide-item" ref="slideItem">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "BaseSlideItem"
    }
</script>

<style scoped lang="scss">
    #base-slide-item {
        width: 100%;
        height: 100%;
        /*flex: 1;*/
        /*flex-shrink: 1;*/
        overflow-y: scroll;
    }

</style>