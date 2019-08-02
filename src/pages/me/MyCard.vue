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
                <div class="logo-ctn">
                    <img src="@/assets/img/icon/head-image.jpeg" alt="">
                </div>
                <span class="name">TTentau</span>
                <span class="notice">使用抖音扫码，加我好友</span>
                <img src="@/assets/img/icon/logo2.png" alt="" class="logo">
            </div>
        </div>
        <div class="notice-two">请使用最新版抖音扫描</div>
        <div class="footer">
            <div class="btn">
                <img src="@/assets/img/icon/download.png" alt="">
                <span>保存到相册</span>
            </div>
            <div class="btn">
                <img src="@/assets/img/icon/scan.png" alt="">
                <span>保存到相册</span>
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
        width: 100%;
        height: 100%;
        position: relative;

        .content {
            padding: 20px;

            .card {
                background: white;
                border-radius: 10px;
                display: flex;
                align-items: center;
                flex-direction: column;

                .logo-ctn {
                    margin: 20px 0;
                    width: 50vw;
                    height: 50vw;
                    background-image: url("../../assets/img/icon/logo-bg.png");
                    background-position: center;
                    background-size: 100% 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    img{
                        width: 50%;
                        height: 50%;
                        border-radius: 50%;
                    }
                }

                .notice {
                    margin-top: 80px;
                    opacity: .4;
                }

                .logo {
                    margin: 20px 0;
                    width: 40vw;
                }
            }

        }

        .notice-two {
            color: white;
            opacity: .4;
            text-align: center;
        }

        .footer {
            position: absolute;
            bottom: 30px;
            display: flex;
            justify-content: space-around;
            width: 100%;

            .btn {
                color: white;
                display: flex;
                flex-direction: column;
                align-items: center;

                img {
                    width: 30px;
                    margin-bottom: 10px;
                }
            }
        }
    }
</style>
