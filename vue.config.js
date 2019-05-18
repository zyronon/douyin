// vue.config.js
module.exports = {
    // 选项...
    publicPath: process.env.NODE_ENV === 'production' ? '' : '',
    assetsDir: './',//资源路径
    outputDir: process.env.outputDir,//打包输出路径
}
