---
theme: cyanosis
highlight: vs2015
---

# 前言

---

这是我的 [**模仿抖音**](https://juejin.cn/column/7357362143396118528) 系列文章的第四篇：这篇我们将实现页面缓存，就像我们访问传统新闻网站一样
> 第一篇：[200行代码实现类似Swiper.js的轮播组件](https://juejin.cn/post/7360512664317018146)  
> 第二篇：[实现抖音 “视频无限滑动“效果](https://juejin.cn/post/7361614921519054883)  
> 第三篇：[Vue 路由使用介绍以及添加转场动画](https://juejin.cn/post/7362528152777130025)

# 最终效果

在线预览：[dy.ttentau.top/](https://dy.ttentau.top/)

Github地址：[https://github.com/zyronon/douyin](https://github.com/zyronon/douyin)

路由定义源码：[routes.ts](https://github.com/zyronon/douyin/blob/master/src/router/index.ts)

# 实现

## 原理

KeepAlive
组件介绍：[https://cn.vuejs.org/guide/built-ins/keep-alive.html](https://cn.vuejs.org/guide/built-ins/keep-alive.html)

我们知道 `Vue` 内置的 `<KeepAlive>` 组件可以缓存组件，只需要像下面这样写就可以缓存所有组件了

```vue

<router-view v-slot="{ Component }">
  <keep-alive>
    <component :is="Component" />
  </keep-alive>
</router-view>
```

可是，这样写所有组件都会被缓存，这显然不是我们希望看到的效果。

我们想要的效果是什么？就像 `jQuery` 时代的网站（例如：[`www.v2ex.com`](https://www.v2ex.com)
）一样，点击一个链接，前进到下一页，浏览完成之后，返回上一页，当前页面被丢弃。再次访问的话需要重新加载
> 吐槽：找了一圈国内的知名网站，点击链接全是单独打开一个标签页，根本没有在当前页跳转的了！
>
> 有喜欢逛 v2ex 的朋友可以试试我开发的这个油猴脚本：[V2Next](https://greasyfork.org/zh-CN/scripts/458024)
> ，有UI美化、楼中楼、回复上下文、高赞回复、简洁模式、发送图片和表情 emoji、base64 解码等功能，现在每天都1800个 v 友在使用！

大多数情况下，用户进入一个页面，这个页面会请求数据。用户浏览完毕退出页面。如果再次进入，页面就像新开的一样，重新开始请求数据，这是符合用户预期的  
而不是像现在这样，不管重新进入多少次，页面都是一开始进入的样子，这时用户可能会怀疑自己是否断网了？我们总不能在每次页面都写 `onActivated`
和 `onDeactivated` 方法吧！