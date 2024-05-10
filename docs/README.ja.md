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

`douyin-vue`パロディです`抖音|TikTok`モバイルショートビデオプロジェクト。`Vue`ネイティブと同等のモバイル側の「ベスト プラクティス」`App`シルキーで滑らかな使い心地。最新のものを使用しました`Vue`テクノロジースタック、に基づく[`Vue3`](https://cn.vuejs.org/)、[`Vite5`](https://cn.vitejs.dev/)、[`Pinia`](https://pinia.vuejs.org/)成し遂げる。データはプロジェクト内でローカルに保存されます。[`axios-mock-adapter`](https://github.com/ctimmerm/axios-mock-adapter)ライブラリは API をインターセプトし、ローカルの JSON データを返して、実際のバックエンド リクエストをシミュレートします。

<div>
<img width="150px" src='docs/imgs/1.gif' />
<img width="150px" src='docs/imgs/2.gif' />
<img width="150px" src='docs/imgs/3.gif' />
<img width="150px" src='docs/imgs/4.gif' />
<img width="150px" src='docs/imgs/5.gif' />
</div>

## オンラインアクセス

[//]: # "Gitee Pages: [https://zyronon.gitee.io/douyin/](https://zyronon.gitee.io/douyin/)(中国地区推荐访问这个地址)   "

[//]: # "注意：Gitee Pages现在无法更新，代码不是最新的。如果你能翻墙推荐访问下面地址  "

Github ページ:[https://dy.ttentau.top/](https://dy.ttentau.top/)

[//]: # "Gitee pages: [https://dy.ttentau.top/](https://dy.ttentau.top/) (中国地区推荐访问这个地址)  "

[//]: # "Github pages: [https://zyronon.github.io/douyin/](https://zyronon.github.io/douyin/)  "

[//]: # "Netlify: [https://douyins.netlify.app/](https://douyins.netlify.app/)"

[//]: # "Vercel:  [https://douyins.vercel.app](https://douyins.vercel.app)"

[//]: # "Android Apk: https://github.com/zyronon/douyin/releases"

[//]: # "**注意**：`PC` 必须将浏览器切到手机模式，先按 `F12` 调出控制台，再按 `Ctrl+Shift+M`才能正常预览"

[//]: # "**注意**：手机请用  [Via 浏览器](https://viayoo.com/zh-cn/)  或 Chrome 浏览器预览。其它浏览器可能会强制将视频全屏，导致无法正常显示"

## リンク

【模倣同音シリーズ】 1:[Swiper.js に似たカルーセル コンポーネントを実装するための 200 行のコード](https://juejin.cn/post/7360512664317018146)  
【模倣同音シリーズ】 2：[Douyinで「無限スライドビデオ」効果を実現](https://juejin.cn/post/7361614921519054883)  
【模倣同音シリーズ】 3：[Vue ルーティングの使用とトランジション アニメーションの追加の概要](https://juejin.cn/post/7362528152777130025)  
【模倣同音シリーズ】 4：[従来のニュースサイトと同様に、Vue の条件付きルート キャッシュ](https://juejin.cn/post/7365334891473240101)  
【模倣同音シリーズ】 5：[Github Actions ページのデプロイ、Gitee への同期、README の翻訳、Docker イメージのパッケージ化](https://juejin.cn/post/7365757742381957161)  

## 実行

注: このプロジェクトは研究と研究のみに適しており、商業利用には適していません。

### Vercel への迅速な導入

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/zyronon/douyin)

### Dockerへのデプロイ

```bash
# pull Docker image
docker pull ghcr.io/zyronon/douyin-vue:latest

# start container, nginx reverse proxy custom port, for example: docker run -d -p 80:80 ghcr.io/zyronon/douyin-vue:latest
docker run -d -p 80:80 ghcr.io/zyronon/douyin-vue:latest
```

### 地域開発

**注: git コマンドを実行するには、クローンを作成する必要があります。zip パッケージのダウンロードは実行できません。クローン速度が遅すぎる場合は、gitee アドレスを使用することをお勧めします。**

```bash
git clone https://gitee.com/zyronon/douyin.git (中国使用)
          https://github.com/zyronon/douyin.git
cd douyin
npm install
npm run dev
```

ブラウザを開いて、以下にアクセスしてください。[http://127.0.0.1:3000](http://127.0.0.1:3000)

**注: ブラウザをモバイル モードに切り替える必要があります。最初に を押します。`F12`コンソールを表示するには、`Ctrl+Shift+M` を押します。通常にプレビューする**

## データソース

このビデオは以下のDouyinの有名人からのものです

-   `我是香秀 🐂🍺`: [https://v.douyin.com/iYRAPA2L/](https://v.douyin.com/iYRAPA2L/)
-   `杨老虎 🐯（磕穿下巴掉牙版）`: [https://v.douyin.com/iYRA56de/](https://v.douyin.com/iYRA56de/)
-   `条子`: [https://v.douyin.com/iYRAaqjr/](https://v.douyin.com/iYRAaqjr/)
-   `达莎 Digi`：[https://v.douyin.com/iYRA6rwT/](https://v.douyin.com/iYRA6rwT/)
-   `小橙子`: [https://v.douyin.com/iYRAnudw/](https://v.douyin.com/iYRAnudw/)
-   `南恬`: [https://v.douyin.com/iYRAbKm3/](https://v.douyin.com/iYRAbKm3/)
-   `小霸宠牛排 🥩`：[https://v.douyin.com/iYRSosVB/](https://v.douyin.com/iYRSosVB/)
-   `奶茶妹 ◕🌱`: [https://v.douyin.com/iYRACKhP/](https://v.douyin.com/iYRACKhP/)
-   `我才是岚岚`: [https://v.douyin.com/iYRAQM1C/](https://v.douyin.com/iYRAQM1C/)
-   `周憬艺 ziran`: [https://v.douyin.com/iYRAQs4h/](https://v.douyin.com/iYRAQs4h/)
-   `刘思瑶 nice`: [https://v.douyin.com/iYRAaERn/](https://v.douyin.com/iYRAaERn/)
-   `彭十六 elf`: [https://v.douyin.com/iYRAHrVG/](https://v.douyin.com/iYRAHrVG/)
-   `李子柒`: [https://v.douyin.com/iYRA5B88/](https://v.douyin.com/iYRA5B88/)

小紅書公文書からの写真

上記内容は全てインターネット上の公開情報です

## 特徴と提案

プロジェクトは現在開発の初期段階にあり、ソフトウェアの新機能や提案があれば、お気軽にお問い合わせください。`Issues`で育ちました
このソフトウェアのデザインアイデアも気に入っていただけましたら、ぜひ `PR` を送信してください、 ご支援ありがとうございました！

## 私に連絡して

私のメールアドレスにご連絡いただけます<a href="mailto:zyronon@163.com">zyronon@163.com</a>

> 私の他のオープンソース プロジェクトを共有してください:
>
> _[**単語を入力する**～Web上で使える単語暗記ソフト～](https://github.com/zyronon/typing-word)<img src="https://img.shields.io/github/stars/zyronon/typing-word.svg?style=flat-square&label=Star&color=4285dd&logo=github" height="16px" />_
> _[**ウェブスクリプト**- いくつかの便利な Grease Monkey スクリプト~](https://github.com/zyronon/web-scripts)<img src="https://img.shields.io/github/stars/zyronon/web-scripts.svg?style=flat-square&label=Star&color=4285dd&logo=github" height="16px" />_

## 合意

[GPL](../LICENSE)
