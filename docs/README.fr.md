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

`douyin-vue`est une parodie`抖音|TikTok`projet de courte vidéo mobile.`Vue`Des « bonnes pratiques » côté mobile, comparables au natif`App`Expérience soyeuse et douce. Utilisé le dernier`Vue`pile technologique, basée sur[`Vue3`](https://cn.vuejs.org/)、[`Vite5`](https://cn.vitejs.dev/)、[`Pinia`](https://pinia.vuejs.org/)accomplir. Les données sont enregistrées localement dans le projet via[`axios-mock-adapter`](https://github.com/ctimmerm/axios-mock-adapter)La bibliothèque intercepte l'API et renvoie des données json locales pour simuler de véritables requêtes backend.

<div>
<img width="150px" src='docs/imgs/1.gif' />
<img width="150px" src='docs/imgs/2.gif' />
<img width="150px" src='docs/imgs/3.gif' />
<img width="150px" src='docs/imgs/4.gif' />
<img width="150px" src='docs/imgs/5.gif' />
</div>

## Accès en ligne

[//]: # "Gitee Pages: [https://zyronon.gitee.io/douyin/](https://zyronon.gitee.io/douyin/)(中国地区推荐访问这个地址)   "

[//]: # "注意：Gitee Pages现在无法更新，代码不是最新的。如果你能翻墙推荐访问下面地址  "

Pages GitHub :<https://dy.ttentau.top/>

[//]: # "Gitee pages: [https://dy.ttentau.top/](https://dy.ttentau.top/) (中国地区推荐访问这个地址)  "

[//]: # "Github pages: [https://zyronon.github.io/douyin/](https://zyronon.github.io/douyin/)  "

[//]: # "Netlify: [https://douyins.netlify.app/](https://douyins.netlify.app/)"

[//]: # "Vercel:  [https://douyins.vercel.app](https://douyins.vercel.app)"

[//]: # "Android Apk: https://github.com/zyronon/douyin/releases"

[//]: # "**注意**：`PC` 必须将浏览器切到手机模式，先按 `F12` 调出控制台，再按 `Ctrl+Shift+M`才能正常预览"

[//]: # "**注意**：手机请用  [Via 浏览器](https://viayoo.com/zh-cn/)  或 Chrome 浏览器预览。其它浏览器可能会强制将视频全屏，导致无法正常显示"

## Lien

\[Série Imitation Douyin] 1 :[200 lignes de code pour implémenter un composant carrousel similaire à Swiper.js](https://juejin.cn/post/7360512664317018146)  
\[Série Imitation Douyin] 2 :[Réaliser l'effet "vidéo coulissante infinie" sur Douyin](https://juejin.cn/post/7361614921519054883)  
\[Série Imitation Douyin] Trois :[Introduction à l'utilisation du routage Vue et à l'ajout d'animations de transition](https://juejin.cn/post/7362528152777130025)  
\[Série Imitation Douyin] Quatre :[Mise en cache des routes conditionnelles Vue, tout comme les sites d'information traditionnels](https://juejin.cn/post/7365334891473240101)  
\[Série Imitation Douyin] Cinq :[Les actions Github déploient des pages, synchronisent avec Gitee, traduisent README, emballent l'image Docker](https://juejin.cn/post/7365757742381957161)

## courir

Remarque : ce projet convient uniquement à l'étude et à la recherche, et non à un usage commercial.

### Déployez rapidement sur Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/zyronon/douyin)

### Déployer sur Docker

```bash
# pull Docker image
docker pull ghcr.io/zyronon/douyin-vue:latest

# start container, nginx reverse proxy custom port, for example: docker run -d -p 80:80 ghcr.io/zyronon/douyin-vue:latest
docker run -d -p 80:80 ghcr.io/zyronon/douyin-vue:latest
```

### développement local

**Remarque : La commande git doit être clonée pour s'exécuter. Le téléchargement du package zip ne peut pas s'exécuter. Si la vitesse de clonage est trop lente, il est recommandé d'utiliser l'adresse du gîte**

```bash
git clone https://gitee.com/zyronon/douyin.git (中国使用)
          https://github.com/zyronon/douyin.git 
cd douyin
npm install
npm run dev
```

Ouvrez votre navigateur et visitez :<http://127.0.0.1:3000>

**Remarque : Vous devez passer le navigateur en mode mobile, appuyez d'abord sur`F12`Pour afficher la console, appuyez sur`Ctrl+Shift+M`pour prévisualiser normalement**

## Les sources de données

La vidéo provient des célébrités Douyin suivantes

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

Photo tirée des notes publiques de Xiaohongshu

Le contenu ci-dessus est toute l'information publique sur Internet

## Fonctionnalités et suggestions

Le projet en est actuellement aux premiers stades de développement et de nouvelles fonctionnalités sont ajoutées continuellement. Si vous avez des fonctionnalités ou des suggestions pour le logiciel, n'hésitez pas à nous contacter.`Issues`élevé dans
Si vous aimez également les idées de conception de ce logiciel, veuillez le soumettre`PR`, Merci beaucoup pour votre soutient!

## Contactez moi

Vous pouvez contacter mon email<a href="mailto:zyronon@163.com">zyronon@163.com</a>

> Partagez mes autres projets open source :
>
> _[**Taper un mot**- Logiciel de mémorisation de vocabulaire utilisable sur le web~](https://github.com/zyronon/typing-word)<img src="https://img.shields.io/github/stars/zyronon/typing-word.svg?style=flat-square&label=Star&color=4285dd&logo=github" height="16px" />_  
> _[**Scripts Web**- Quelques scripts Grease Monkey utiles ~](https://github.com/zyronon/web-scripts)<img src="https://img.shields.io/github/stars/zyronon/web-scripts.svg?style=flat-square&label=Star&color=4285dd&logo=github" height="16px" />_

## accord

[GPL](../LICENSE)
