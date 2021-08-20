<template>
    <div id="MyCollect">
        <BaseHeader title="我的收藏" ref="baseHeader"></BaseHeader>
        <BaseSlideList :style="{height:slideListHeight+'px'}">
            <BaseSlideItem>
                <p>12</p>
                <p>12</p>
                <p>12</p>
                <p>12</p>
                <p>12</p>
                <p>12</p>
                <p>12</p>
                <p>12</p>
                <p>12</p>
                <p>12</p>
                <p>12</p>
            </BaseSlideItem>
            <BaseSlideItem>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
                <p>2</p>
            </BaseSlideItem>
            <BaseSlideItem>
                <p>3</p>
                <p>3</p>
                <p>3</p>
                <p>3</p>
                <p>3</p>
                <p>3</p>
                <p>3</p>
                <p>3</p>
                <p>3</p>
                <p>3</p>
                <p>3</p>
            </BaseSlideItem>
            <BaseSlideItem>
                <p>4</p>
                <p>4</p>
                <p>4</p>
                <p>4</p>
                <p>4</p>
                <p>4</p>
                <p>4</p>
                <p>4</p>
                <p>4</p>
                <p>4</p>
                <p>4</p>
                <p>4</p>
                <p>4</p>
                <p>4</p>
                <p>4</p>
                <p>4</p>
                <p>4</p>
                <p>4</p>
                <p>4</p>
            </BaseSlideItem>
        </BaseSlideList>
    </div>
</template>

<script>
    export default {
        name: "MyCollect",
        data() {
            return {
                slideListHeight: 812
            }
        },
        created(){
            // console.log(this.slideListHeight)
        },
        mounted() {
            let screenHeight = document.body.clientHeight
            let baseHeader = this.$refs.baseHeader
            this.slideListHeight = screenHeight - baseHeader.$el.clientHeight
        }
    }
</script>

<style scoped lang="less">
    #MyCollect {
        width: 100vw;
        height: 100%;
        position: fixed;
    }
</style>