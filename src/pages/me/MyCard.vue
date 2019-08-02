<template>
    <div id='MyCard'>
        <BaseHeader @back="back">
            <svg t="1564765646732" class="icon" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg"
                 p-id="15320" width="32" height="32">
                <path d="M182.528 793.185a46.336 46.336 0 0 1-6.502-0.46c-25.196-3.533-43.06-26.942-39.819-52.168 16.533-152.612 70.907-266.071 161.639-337.362 65.428-51.405 147.963-80.18 245.325-85.52l5.626-0.312 0.01-84.772a54.792 54.792 0 0 1 15.228-36.956 55.66 55.66 0 0 1 39.91-17.075c14.659 0 28.385 5.652 38.728 15.923L862.5 418.816c35.625 36.526 35.645 93.737 0.036 130.237L642.6 773.13a54.856 54.856 0 0 1-37.212 15.836l-1.567 0.026c-30.034-0.005-54.241-23.593-55.014-53.704l-0.01-90.926-9.365-0.025c-84.751 0-238.802 16.706-318.428 128.604a46.669 46.669 0 0 1-38.446 20.244h-0.031z m356.89-200.955c13.204 0 23.67 0.374 29.926 0.594l0.62 0.026c2.222 0.082 3.865 0.138 4.884 0.138a26.086 26.086 0 0 1 26.06 26.056v122.178l224.385-228.608c15.687-16.076 15.657-41.272-0.057-57.374L600.91 226.299v116.567a26.076 26.076 0 0 1-26.05 26.05c-148.947 0-336.052 58.68-381.59 338.248l-3.153 19.349 13.373-14.336C300.861 607.816 455.757 592.23 539.418 592.23z"
                      fill="#8a8a8a" p-id="15321">
                </path>
            </svg>
        </BaseHeader>
        <div class="content">
            <div class="card">

            </div>
            <div class="footer">
                <div class="btn">
                    <img src="@/assets/img/icon/download.png" alt="" style="height: 50px;">
                    <span>保存到相册</span>
                </div>
                <div class="btn">
                    <img src="../../assets/img/icon/ahb.png" alt="" style="height: 50px;">
                    <span>保存到相册</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "MyCard",
        components: {},
        data() {
            return {}
        },
        created() {
            
        },
        computed: {},
        methods: {
            back() {
                window.history.back()
            }
        }
    }
</script>

<style scoped lang='scss'>
    #MyCard {

    }
</style>
