<h1 align="center">
  Douyin-Vue
</h1>

<p align="center">
 <a href="README.en.md">English</a> | <a href="README.es.md">Spanish</a> | <a href="README.de.md">German</a> | 
<a href="README.fr.md">French</a> | <a href="README.md">简体中文</a> |  <a href="README.ja.md">日本語</a> 
</p>

<p align="center">
  <a href="https://github.com/zyronon/douyin/blob/master/LICENSE"><img src="https://img.shields.io/github/license/zyronon/douyin" alt="License"></a>
  <a><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg"/></a>
  <a><img src="https://img.shields.io/badge/Powered%20by-Vue-blue"/></a>
</p>

`douyin-vue` 是一个模仿 `抖音|TikTok` 的移动端短视频项目，完全度90%。使用了最新的 `Vue` 全家桶技术栈，它基于 [`Vue3`](https://cn.vuejs.org/)、[`Vite5`](https://cn.vitejs.dev/)
、[`Pinia`](https://pinia.vuejs.org/)实现。数据保存在项目本地，视频采集自`抖音|TikTok`，图集采集自`小红书|Xiaohongshu`，通过 [`axios-mock-adapter`](https://github.com/ctimmerm/axios-mock-adapter) 库拦截Api 并返回本地json数据，模拟真实后端请求

<div>
<img width="150px" src='docs/imgs/1.gif' />
<img width="150px" src='docs/imgs/2.gif' />
<img width="150px" src='docs/imgs/3.gif' />
<img width="150px" src='docs/imgs/4.gif' />
<img width="150px" src='docs/imgs/5.gif' />
<img width="150px" src='docs/imgs/img-1.jpg' />
<img width="150px" src='docs/imgs/img-2.jpg' />
<img width="150px" src='docs/imgs/img-3.jpg' />
<img width="150px" src='docs/imgs/img-4.jpg' />
<img width="150px" src='docs/imgs/img-5.jpg' />
</div>

## 在线访问

### 中国地区：
Gitee pages: [https://zyronon.gitee.io/douyin/](https://zyronon.gitee.io/douyin/)

### 中国以外地区
Github pages: [https://zyronon.github.io/douyin/](https://zyronon.github.io/douyin/)

~~Vercel:  [http://dy.ttentau.top/](http://dy.ttentau.top/)~~

~~Netlify: [https://douyins.netlify.app/](https://douyins.netlify.app/)~~

Vercel和Netlify分别送的100G免费流量已经用完了...🤣

Android Apk: https://github.com/zyronon/douyin/releases

**注意**：`PC` 必须将浏览器切到手机模式，先按 `F12` 调出控制台，再按 `Ctrl+Shift+M`才能正常预览

**注意**：手机请用  [Via 浏览器](https://viayoo.com/zh-cn/)  或 Chrome 浏览器预览。其它浏览器可能会强制将视频全屏，导致无法正常显示

## 免责声明

本项目仅适用于学习和研究，不得用于商业使用

## 运行

### 快速部署至Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/zyronon/douyin)

### 本地开发

```bash
git clone https://github.com/zyronon/douyin.git
cd douyin
npm install
npm run dev
```

打开浏览器并访问: [http://127.0.0.1:3000](http://127.0.0.1:3000)

**注意：PC 必须将浏览器切到手机模式，先按 `F12` 调出控制台，再按 `Ctrl+Shift+M` 才能正常预览**

## 链接

【douyin-vue】教程一: [200行代码实现类似Swiper.js的轮播组件](https://juejin.cn/post/7360512664317018146)  
后续教程再在准备中...

## 数据来源

视频来源于以下抖音网红

- `我是香秀 🐂🍺`: [https://v.douyin.com/iYRAPA2L/](https://v.douyin.com/iYRAPA2L/)
- `杨老虎 🐯（磕穿下巴掉牙版）`: [https://v.douyin.com/iYRA56de/](https://v.douyin.com/iYRA56de/)
- `条子`: [https://v.douyin.com/iYRAaqjr/](https://v.douyin.com/iYRAaqjr/)
- `达莎 Digi`：[https://v.douyin.com/iYRA6rwT/](https://v.douyin.com/iYRA6rwT/)
- `小橙子`: [https://v.douyin.com/iYRAnudw/](https://v.douyin.com/iYRAnudw/)
- `南恬`: [https://v.douyin.com/iYRAbKm3/](https://v.douyin.com/iYRAbKm3/)
- `小霸宠牛排 🥩`：[https://v.douyin.com/iYRSosVB/](https://v.douyin.com/iYRSosVB/)
- `奶茶妹 ◕🌱`: [https://v.douyin.com/iYRACKhP/](https://v.douyin.com/iYRACKhP/)
- `我才是岚岚`: [https://v.douyin.com/iYRAQM1C/](https://v.douyin.com/iYRAQM1C/)
- `周憬艺 ziran`: [https://v.douyin.com/iYRAQs4h/](https://v.douyin.com/iYRAQs4h/)
- `刘思瑶 nice`: [https://v.douyin.com/iYRAaERn/](https://v.douyin.com/iYRAaERn/)
- `彭十六 elf`: [https://v.douyin.com/iYRAHrVG/](https://v.douyin.com/iYRAHrVG/)
- `李子柒`: [https://v.douyin.com/iYRA5B88/](https://v.douyin.com/iYRA5B88/)

图片来自于小红书公开笔记

以上内容均是互联网公开信息

## 功能与建议

目前项目处于开发初期，新功能正在持续添加中，如果你对软件有任何功能与建议，欢迎在 `Issues` 中提出
如果你也喜欢本软件的设计思想，欢迎提交 `PR`，非常感谢你对我们的支持！

## 联系我

您可以联系我的邮箱 <a href="mailto:zyronon@163.com">zyronon@163.com</a>
> 分享我其他开源项目：
>
>_[**Typing Word
** - 可在网页上使用的背单词软件~](https://github.com/zyronon/typing-word) <img src="https://img.shields.io/github/stars/zyronon/typing-word.svg?style=flat-square&label=Star&color=4285dd&logo=github" height="16px" />_  
> _[**Web Scripts
** - 一些好用的油猴脚本~](https://github.com/zyronon/web-scripts) <img src="https://img.shields.io/github/stars/zyronon/web-scripts.svg?style=flat-square&label=Star&color=4285dd&logo=github" height="16px" />_

## 许可协议

[GPL](LICENSE)
