// vue.config.js
const path = require('path')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: isProduction ? '' : '',
  assetsDir: isProduction ? './' : './',
  // productionSourceMap: false,
  lintOnSave: false, //关闭eslint检查
  devServer: {
    open: true,
  },
  // chainWebpack: config => {
  //   config.module
  //     .rule('txt')
  //     .test( /\.(txt|lrc)$/)
  //     .use('raw-loader')
  //     .loader('raw-loader')
  //     .end()
  // },
  configureWebpack: {
    module: {
      rules: [
        {
          //解析txt、lrc文件
          test: /\.(txt|lrc)$/,
          exclude: /node_modules/,
          include: path.join(__dirname, 'src'),
          use: ['raw-loader']
        }
      ]
    },
  }
}
