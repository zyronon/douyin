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

`douyin-vue`ist eine Parodie`抖音|TikTok`mobiles Kurzvideoprojekt.`Vue`„Best Practices“ auf der mobilen Seite, vergleichbar mit Native`App`Seidiges und geschmeidiges Erlebnis. Habe das Neueste verwendet`Vue`Technologie-Stack, basierend auf[`Vue3`](https://cn.vuejs.org/)、[`Vite5`](https://cn.vitejs.dev/)、[`Pinia`](https://pinia.vuejs.org/)erreichen. Die Daten werden lokal im Projekt gespeichert[`axios-mock-adapter`](https://github.com/ctimmerm/axios-mock-adapter)Die Bibliothek fängt die API ab und gibt lokale JSON-Daten zurück, um echte Backend-Anfragen zu simulieren.

<div>
<img width="150px" src='imgs/1.gif' />
<img width="150px" src='imgs/2.gif' />
<img width="150px" src='imgs/3.gif' />
<img width="150px" src='imgs/4.gif' />
<img width="150px" src='imgs/5.gif' />
</div>

## Online-Zugang

[//]: # "Gitee Pages: [https://zyronon.gitee.io/douyin/](https://zyronon.gitee.io/douyin/)(中国地区推荐访问这个地址)   "

[//]: # "注意：Gitee Pages现在无法更新，代码不是最新的。如果你能翻墙推荐访问下面地址  "

Github-Seiten:<https://dy.ttentau.top/>

[//]: # "Gitee pages: [https://dy.ttentau.top/](https://dy.ttentau.top/) (中国地区推荐访问这个地址)  "

[//]: # "Github pages: [https://zyronon.github.io/douyin/](https://zyronon.github.io/douyin/)  "

[//]: # "Netlify: [https://douyins.netlify.app/](https://douyins.netlify.app/)"

[//]: # "Vercel:  [https://douyins.vercel.app](https://douyins.vercel.app)"

[//]: # "Android Apk: https://github.com/zyronon/douyin/releases"

[//]: # "**注意**：`PC` 必须将浏览器切到手机模式，先按 `F12` 调出控制台，再按 `Ctrl+Shift+M`才能正常预览"

[//]: # "**注意**：手机请用  [Via 浏览器](https://viayoo.com/zh-cn/)  或 Chrome 浏览器预览。其它浏览器可能会强制将视频全屏，导致无法正常显示"

## Verknüpfung

\[Imitation Douyin-Serie] 1:[200 Codezeilen zur Implementierung einer Karussellkomponente ähnlich Swiper.js](https://juejin.cn/post/7360512664317018146)  
\[Imitation Douyin-Serie] 2:[Verwirklichen Sie den „unendlich gleitenden Video“-Effekt auf Douyin](https://juejin.cn/post/7361614921519054883)  
\[Imitation Douyin-Serie] Drei:[Einführung in die Verwendung des Vue-Routings und das Hinzufügen von Übergangsanimationen](https://juejin.cn/post/7362528152777130025)  
\[Imitation Douyin-Serie] Vier:[Bedingtes Routen-Caching von Vue, genau wie bei herkömmlichen Nachrichtenseiten](https://juejin.cn/post/7365334891473240101)  
\[Imitation Douyin-Serie] Fünf:[Github-Aktionen stellen Seiten bereit, synchronisieren mit Gitee, übersetzen README, packen Docker-Image](https://juejin.cn/post/7365757742381957161)

## laufen

Hinweis: Dieses Projekt ist nur für Studien- und Forschungszwecke geeignet, nicht für die kommerzielle Nutzung

### Schnelle Bereitstellung in Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/zyronon/douyin)

### Auf Docker bereitstellen

```bash
# pull Docker image
docker pull ghcr.io/zyronon/douyin-vue:latest

# start container, nginx reverse proxy custom port, for example: docker run -d -p 80:80 ghcr.io/zyronon/douyin-vue:latest
docker run -d -p 80:80 ghcr.io/zyronon/douyin-vue:latest
```

### lokale Entwicklung

**Hinweis: Der Git-Befehl muss geklont werden, damit er ausgeführt werden kann. Das Herunterladen des ZIP-Pakets ist nicht möglich. Wenn die Klongeschwindigkeit zu langsam ist, wird empfohlen, die Gitee-Adresse zu verwenden**

```bash
git clone https://gitee.com/zyronon/douyin.git (中国使用)
          https://github.com/zyronon/douyin.git 
cd douyin
npm install
npm run dev
```

Öffnen Sie Ihren Browser und besuchen Sie:<http://127.0.0.1:3000>

**Hinweis: Sie müssen den Browser in den Mobilmodus schalten, indem Sie zuerst drücken`F12`Um die Konsole aufzurufen, drücken Sie`Ctrl+Shift+M`um eine normale Vorschau anzuzeigen**

## Datenquellen

Das Video stammt von folgenden Douyin-Prominenten

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

Bild aus den öffentlichen Notizen von Xiaohongshu

Bei den oben genannten Inhalten handelt es sich um alle öffentlichen Informationen im Internet

## Funktionen und Vorschläge

Das Projekt befindet sich derzeit in einem frühen Entwicklungsstadium und es werden kontinuierlich neue Funktionen hinzugefügt. Wenn Sie Funktionen oder Vorschläge für die Software haben, können Sie sich gerne an uns wenden.`Issues`aufgewachsen in
Wenn Ihnen die Designideen dieser Software auch gefallen, reichen Sie sie bitte ein`PR`, Vielen Dank für deine Unterstützung!

## kontaktiere mich

Sie können meine E-Mail kontaktieren<a href="mailto:zyronon@163.com">zyronon@163.com</a>

> Teilen Sie meine anderen Open-Source-Projekte:
>
> _[**Wort eingeben**- Software zum Auswendiglernen von Vokabeln, die im Internet verwendet werden kann](https://github.com/zyronon/typing-word)<img src="https://img.shields.io/github/stars/zyronon/typing-word.svg?style=flat-square&label=Star&color=4285dd&logo=github" height="16px" />_  
> _[**Webskripte**- Einige nützliche Grease Monkey-Skripte ~](https://github.com/zyronon/web-scripts)<img src="https://img.shields.io/github/stars/zyronon/web-scripts.svg?style=flat-square&label=Star&color=4285dd&logo=github" height="16px" />_

## Vereinbarung

[GPL](../LICENSE)
