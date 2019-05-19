// vue.config.js
module.exports = {
    // 选项...
    publicPath: process.env.NODE_ENV === 'production' ? '' : '',
    assetsDir: './',//资源路径
    outputDir: process.env.outputDir,//打包输出路径
    configureWebpack: config => {
        config.externals = {
            "vue": "Vue",
            "vue-router": "VueRouter",
        }
    },
    // 是否为生产环境构建生成 source map
    productionSourceMap: false,
    css: {},
}
