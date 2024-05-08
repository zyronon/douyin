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

`douyin-vue`es una parodia`抖音|TikTok`Proyecto de vídeo corto móvil.`Vue`"Mejores prácticas" en el lado móvil, comparables a las nativas`App`Experiencia sedosa y suave. Usado lo último`Vue`pila de tecnología, basada en[`Vue3`](https://cn.vuejs.org/)、[`Vite5`](https://cn.vitejs.dev/)、[`Pinia`](https://pinia.vuejs.org/)lograr. Los datos se guardan localmente en el proyecto a través de[`axios-mock-adapter`](https://github.com/ctimmerm/axios-mock-adapter)La biblioteca intercepta la API y devuelve datos json locales para simular solicitudes de backend reales.

<div>
<img width="150px" src='docs/imgs/1.gif' />
<img width="150px" src='docs/imgs/2.gif' />
<img width="150px" src='docs/imgs/3.gif' />
<img width="150px" src='docs/imgs/4.gif' />
<img width="150px" src='docs/imgs/5.gif' />
</div>

## Acceso en linea

[//]: # "Gitee Pages: [https://zyronon.gitee.io/douyin/](https://zyronon.gitee.io/douyin/)(中国地区推荐访问这个地址)   "

[//]: # "注意：Gitee Pages现在无法更新，代码不是最新的。如果你能翻墙推荐访问下面地址  "

Páginas de Github:<https://dy.ttentau.top/>

[//]: # "Gitee pages: [https://dy.ttentau.top/](https://dy.ttentau.top/) (中国地区推荐访问这个地址)  "

[//]: # "Github pages: [https://zyronon.github.io/douyin/](https://zyronon.github.io/douyin/)  "

[//]: # "Netlify: [https://douyins.netlify.app/](https://douyins.netlify.app/)"

[//]: # "Vercel:  [https://douyins.vercel.app](https://douyins.vercel.app)"

[//]: # "Android Apk: https://github.com/zyronon/douyin/releases"

[//]: # "**注意**：`PC` 必须将浏览器切到手机模式，先按 `F12` 调出控制台，再按 `Ctrl+Shift+M`才能正常预览"

[//]: # "**注意**：手机请用  [Via 浏览器](https://viayoo.com/zh-cn/)  或 Chrome 浏览器预览。其它浏览器可能会强制将视频全屏，导致无法正常显示"

## Enlace

\[Serie Imitación Douyin] 1:[200 líneas de código para implementar un componente carrusel similar a Swiper.js](https://juejin.cn/post/7360512664317018146)  
\[Serie Imitación Douyin] 2:[Realice el efecto de "vídeo deslizante infinito" en Douyin](https://juejin.cn/post/7361614921519054883)  
\[Serie Imitación Douyin] Tres:[Vue 路由使用介绍以及添加转场动画](https://juejin.cn/post/7362528152777130025)  
\[Serie Imitación Douyin] Cuatro:[Almacenamiento en caché de rutas condicionales de Vue, al igual que los sitios de noticias tradicionales](https://juejin.cn/post/7365334891473240101)  
\[Serie Imitación Douyin] Cinco:[Github Actions implementa páginas, sincroniza con Gitee, traduce README, empaqueta la imagen de la ventana acoplable](https://juejin.cn/post/7365757742381957161)

## correr

Nota: Este proyecto sólo es apto para estudio e investigación, no para uso comercial.

### Implemente rápidamente en Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/zyronon/douyin)

### Implementar en Docker

```bash
# pull Docker image
docker pull ghcr.io/zyronon/douyin-vue:latest

# start container, nginx reverse proxy custom port, for example: docker run -d -p 80:80 ghcr.io/zyronon/douyin-vue:latest
docker run -d -p 80:80 ghcr.io/zyronon/douyin-vue:latest
```

### desarrollo local

**Nota: El comando git debe clonarse para ejecutarse. No se puede ejecutar la descarga del paquete zip. Si la velocidad de clonación es demasiado lenta, se recomienda utilizar la dirección del albergue**

```bash
git clone https://gitee.com/zyronon/douyin.git (中国使用)
          https://github.com/zyronon/douyin.git 
cd douyin
npm install
npm run dev
```

Abra su navegador y visite:<http://127.0.0.1:3000>

**Nota: Debe cambiar el navegador al modo móvil, primero presione`F12`Para abrir la consola, presione`Ctrl+Shift+M`para obtener una vista previa normalmente**

## Fuentes de datos

El video proviene de las siguientes celebridades de Douyin.

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

Imagen de las notas públicas de Xiaohongshu.

以上内容均是互联网公开信息

## Funciones y sugerencias

El proyecto se encuentra actualmente en las primeras etapas de desarrollo y continuamente se agregan nuevas funciones. Si tiene alguna característica o sugerencia para el software, no dude en contactarnos.`Issues`criado en
Si también le gustan las ideas de diseño de este software, envíelas.`PR`, ¡Muchas gracias por tu apoyo!

## contáctame

Puedes contactar a mi correo<a href="mailto:zyronon@163.com">zyronon@163.com</a>

> Comparta mis otros proyectos de código abierto:
>
> _[**Escribir palabra**- Software de memorización de vocabulario que se puede utilizar en la web ~](https://github.com/zyronon/typing-word) <img src="https://img.shields.io/github/stars/zyronon/typing-word.svg?style=flat-square&label=Star&color=4285dd&logo=github" height="16px" />_  
> _[**Guiones web**- Algunos scripts útiles de Grease Monkey~](https://github.com/zyronon/web-scripts)<img src="https://img.shields.io/github/stars/zyronon/web-scripts.svg?style=flat-square&label=Star&color=4285dd&logo=github" height="16px" />_

## acuerdo

[GPL](../LICENSE)
