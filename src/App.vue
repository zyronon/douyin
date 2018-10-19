<template>
    <div id="app" v-bind:style="{'min-height':height + 'px'}">
        <!--<Home/>-->
        <router-view></router-view>
    </div>
</template>

<script>
    // import Home from './components/home/Home.vue'

    export default {
        name: 'app',
        components: {
            // Home
        },
        data() {
            return {
                height: 0,
                width: 0
            }
        },
        created() {
            this.height = window.screen.height;
            // this.width = window.screen.width;
            // let availWidth = window.screen.availWidth;
            // let clientWidth = document.body.clientWidth;
            // let offsetWidth = document.body.offsetWidth;
            // let scrollWidth = document.body.scrollWidth;
            // console.log(this.height);
            // console.log(this.width);
            // console.log(availWidth);
            // console.log(clientWidth);
            // console.log(offsetWidth);
            // console.log(scrollWidth);

        }
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
    p{
        padding: 0;
        margin: 0;
    }

    $width: 1000;
    @while $width > 0 {
        .w#{$width}p {
            width: #{$width}px !important;
        }
        $width: $width - 50;
    }

    $margin: 50;

    @while $margin > 0 {
        .ml#{$margin}p {
            margin-left: #{$margin}px !important;
        }
        $margin: $margin - 1;
    }

    $margin: 50;
    @while $margin > 0 {
        .mr#{$margin}p {
            margin-right: #{$margin}px !important;
        }
        $margin: $margin - 1;
    }

    $margin: 50;
    @while $margin > 0 {
        .mt#{$margin}p {
            margin-top: #{$margin}px !important;
        }
        $margin: $margin - 1;
    }

    $margin: 50;
    @while $margin > 0 {
        .mb#{$margin}p {
            margin-bottom: #{$margin}px !important;
        }
        $margin: $margin - 1;
    }

    $margin: 50;
    @while $margin > 0 {
        .m#{$margin}p {
            margin: #{$margin}px !important;
        }
        $margin: $margin - 1;
    }

    $padding: 50;
    @while $padding > 0 {
        .pl#{$padding}p {
            padding-left: #{$padding}px !important;
        }
        $padding: $padding - 1;
    }

    $padding: 50;
    @while $padding > 0 {
        .pr#{$padding}p {
            padding-right: #{$padding}px !important;
        }
        $padding: $padding - 1;
    }

    $padding: 50;
    @while $padding > 0 {
        .pt#{$padding}p {
            padding-top: #{$padding}px !important;
        }
        $padding: $padding - 1;
    }

    $padding: 50;
    @while $padding > 0 {
        .pb#{$padding}p {
            padding-bottom: #{$padding}px !important;
        }
        $padding: $padding - 1;
    }

    $padding: 50;
    @while $padding > 0 {
        .p#{$padding}p {
            padding: #{$padding}px !important;
        }
        $padding: $padding - 1;
    }

    $font: 30;
    @while $font > 0 {
        .f#{$font} {
            font-size: #{$font}px;
        }
        $font: $font - 1;
    }

    $width: 300;
    @while $width > 0 {
        .w#{$width} {
            width: percentage($width / 100);
        }
        $width: $width - 10;
    }

    .pull-left {
        float: left;
    }

    .pull-right {
        float: right;
    }

    .block {
        display: block;
    }

    .oh {
        overflow: hidden;
    }

    .tac {
        text-align: center;
    }
</style>
