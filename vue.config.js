// vue.config.js
module.exports = {
    // 选项...
    baseUrl: process.env.NODE_ENV === 'production'
        ? '/'
        : '/'
}
