// vue.config.js
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: isProduction ? '' : '',
  assetsDir: isProduction ? './' : './',
  // productionSourceMap: false,
  lintOnSave:false, //关闭eslint检查
  devServer:{
    open: true,
  }
}
