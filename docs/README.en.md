<h1 align="center">
  Douyin-Vue
</h1>

<p align="center">
 <a href="README.en.md">English</a> | <a href="README.es.md">Spanish</a> | <a href="README.de.md">German</a> | 
<a href="README.fr.md">French</a> | <a href="../README.md">简体中文</a> |  <a href="README.ja.md">日本語</a> 
</p>

<p align="center">
  <a href="https://github.com/zyronon/douyin/blob/master/LICENSE"><img src="https://img.shields.io/github/license/zyronon/douyin" alt="License"></a>
  <a><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg"/></a>
  <a><img src="https://img.shields.io/badge/Powered%20by-Vue-blue"/></a>
</p>

`douyin-vue`is a parody`抖音|TikTok`mobile short video project.`Vue`"Best practices" on the mobile side, comparable to native`App` 丝滑流畅的使用体验。使用了最新的 `Vue`technology stack, based on[`Vue3`](https://cn.vuejs.org/)、[`Vite5`](https://cn.vitejs.dev/)、[`Pinia`](https://pinia.vuejs.org/)accomplish. The data is saved locally in the project through[`axios-mock-adapter`](https://github.com/ctimmerm/axios-mock-adapter)The library intercepts the API and returns local json data to simulate real backend requests.

<div>
<img width="150px" src='docs/imgs/1.gif' />
<img width="150px" src='docs/imgs/2.gif' />
<img width="150px" src='docs/imgs/3.gif' />
<img width="150px" src='docs/imgs/4.gif' />
<img width="150px" src='docs/imgs/5.gif' />
</div>

## Online access

[//]: # "Gitee Pages: [https://zyronon.gitee.io/douyin/](https://zyronon.gitee.io/douyin/)(中国地区推荐访问这个地址)   "

[//]: # "注意：Gitee Pages现在无法更新，代码不是最新的。如果你能翻墙推荐访问下面地址  "

Github Pages:<https://dy.ttentau.top/>

[//]: # "Gitee pages: [https://dy.ttentau.top/](https://dy.ttentau.top/) (中国地区推荐访问这个地址)  "

[//]: # "Github pages: [https://zyronon.github.io/douyin/](https://zyronon.github.io/douyin/)  "

[//]: # "Netlify: [https://douyins.netlify.app/](https://douyins.netlify.app/)"

[//]: # "Vercel:  [https://douyins.vercel.app](https://douyins.vercel.app)"

[//]: # "Android Apk: https://github.com/zyronon/douyin/releases"

[//]: # "**注意**：`PC` 必须将浏览器切到手机模式，先按 `F12` 调出控制台，再按 `Ctrl+Shift+M`才能正常预览"

[//]: # "**注意**：手机请用  [Via 浏览器](https://viayoo.com/zh-cn/)  或 Chrome 浏览器预览。其它浏览器可能会强制将视频全屏，导致无法正常显示"

## Link

\[Imitation Douyin Series] 1:[200 lines of code to implement a carousel component similar to Swiper.js](https://juejin.cn/post/7360512664317018146)  
\[Imitation Douyin Series] 2:[Realize the "infinite sliding video" effect on Douyin](https://juejin.cn/post/7361614921519054883)  
\[Imitation Douyin Series] Three:[Introduction to using Vue routing and adding transition animations](https://juejin.cn/post/7362528152777130025)  
\[Imitation Douyin Series] Four:[Vue conditional route caching, just like traditional news sites](https://juejin.cn/post/7365334891473240101)  
\[Imitation Douyin Series] Five:[Github Actions deploy Pages, synchronize to Gitee, translate README, package docker image](https://juejin.cn/post/7365757742381957161)

## run

Note: This project is only suitable for study and research, not for commercial use

### Quickly deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/zyronon/douyin)

### Deploy to Docker

```bash
# pull Docker image
docker pull ghcr.io/zyronon/douyin-vue:latest

# start container, nginx reverse proxy custom port, for example: docker run -d -p 80:80 ghcr.io/zyronon/douyin-vue:latest
docker run -d -p 80:80 ghcr.io/zyronon/douyin-vue:latest
```

### local development

**Note: The git command must be cloned to run. Downloading the zip package cannot run. If the clone speed is too slow, it is recommended to use the gitee address**

```bash
git clone https://gitee.com/zyronon/douyin.git (中国使用)
          https://github.com/zyronon/douyin.git 
cd douyin
npm install
npm run dev
```

Open your browser and visit:<http://127.0.0.1:3000>

**注意：需要将浏览器切至手机模式，先按 `F12`To bring up the console, press`Ctrl+Shift+M`to preview normally**

## Data Sources

The video comes from the following Douyin celebrities

-   `我是香秀 🐂🍺`:<https://v.douyin.com/iYRAPA2L/>
-   `杨老虎 🐯（磕穿下巴掉牙版）`:<https://v.douyin.com/iYRA56de/>
-   `条子`:<https://v.douyin.com/iYRAaqjr/>
-   `达莎 Digi`：<https://v.douyin.com/iYRA6rwT/>
-   `小橙子`:<https://v.douyin.com/iYRAnudw/>
-   `南恬`:<https://v.douyin.com/iYRAbKm3/>
-   `小霸宠牛排 🥩`：<https://v.douyin.com/iYRSosVB/>
-   `奶茶妹 ◕🌱`:<https://v.douyin.com/iYRACKhP/>
-   `我才是岚岚`:<https://v.douyin.com/iYRAQM1C/>
-   `周憬艺 ziran`:<https://v.douyin.com/iYRAQs4h/>
-   `刘思瑶 nice`:<https://v.douyin.com/iYRAaERn/>
-   `彭十六 elf`:<https://v.douyin.com/iYRAHrVG/>
-   `李子柒`:<https://v.douyin.com/iYRA5B88/>

Picture from Xiaohongshu public notes

The above content is all public information on the Internet

## Features and suggestions

The project is currently in the early stages of development and new features are being added continuously. If you have any features or suggestions for the software, please feel free to contact us.`Issues`raised in
If you also like the design ideas of this software, please submit it`PR`, thank you very much for your support!

## contact me

You can contact my email<a href="mailto:zyronon@163.com">zyronon@163.com</a>

> Share my other open source projects:
>
> _[**Typing Word**- Vocabulary memorization software that can be used on the web~](https://github.com/zyronon/typing-word)<img src="https://img.shields.io/github/stars/zyronon/typing-word.svg?style=flat-square&label=Star&color=4285dd&logo=github" height="16px" />_  
> _[**Web Scripts**- Some useful Grease Monkey scripts~](https://github.com/zyronon/web-scripts)<img src="https://img.shields.io/github/stars/zyronon/web-scripts.svg?style=flat-square&label=Star&color=4285dd&logo=github" height="16px" />_

## agreement

[GPL](../LICENSE)
