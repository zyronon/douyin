// vue.config.js
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
    // 选项...
    publicPath: isProduction ? '' : '',
    assetsDir: isProduction ? './' : './',
    // configureWebpack: config => {
    //     config.externals = {
    //         "vue": "Vue",
    //         "vue-router": "VueRouter",
    //     }
    // },
    // 是否为生产环境构建生成 source map
    productionSourceMap: false,
    css: {},
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: 8863,
        https: false,
        hotOnly: false,
    },
}
