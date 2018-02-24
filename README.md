# vue-demo

> Vue.js 外卖

## 结构
.
<pre>
├── README.md
├── build
│   ├── build.js
│   ├── check-versions.js
│   ├── dev-client.js
│   ├── dev-server.js
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config
│   ├── dev.env.js
│   ├── index.js
│   └── prod.env.js
├── src 
│   ├── common
│   │   ├── css
│   │   ├── fonts
│   │   ├── images
│   │   └── stylus
│   │   └── js
│   │   │   └── api.js  滑动事件在这里
│   ├── components
│   │   ├── count
│   │   │   └── count.vue  食物加载按钮
│   │   ├── foodDetail
│   │   │   └── foodDetail.vue 食物详情
│   │   ├── goods
│   │   │   ├── goods.vue
│   │   ├── header
│   │   │   └── header.vue
│   │   ├── ratings
│   │   │   └── ratings.vue
│   │   ├── seller
│   │   │   └── seller.vue
│   │   ├── shoppingCart
│   │   │   └── shoppingCart.vue
│   │   ├── star
│   │   │   └── star.vue 星星组件
│   │   ├── tab
│   │   │   └── tab.vue
│   ├── router
│   │   └── index.js
│   └── vuex
│   │    └──  store.js
│   ├── App.vue
│   ├── main.vue
</pre>
```

## 项目截图

![image](https://github.com/songhaoreact/vue-music/blob/master/static/1.png)

![image](https://github.com/songhaoreact/vue-music/blob/master/static/2.png)

![image](https://github.com/songhaoreact/vue-music/blob/master/static/3.png)

![image](https://github.com/songhaoreact/vue-music/blob/master/static/4.png)

![image](https://github.com/songhaoreact/vue-music/blob/master/static/5.png)


### 安装与运行

```
git clone https://github.com/songhaoreact/vue-music.git

cd vue-music

npm install

npm run dev //服务端运行 访问 http://localhost:8080

npm run build 项目打包

感兴趣的童鞋可以来个star

