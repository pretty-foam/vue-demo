# vue-demo

<pre>
> Vue.js 外卖
技术栈:vue2.0+vue-cli2.0+vuex+es6+vue-router+stylus+express
主要目的还是自己可以通过个人项目设计，从中发现问题，积累经验,与各位交流发现不足之处加以修改。
感兴趣的可以来个star 0..0
```
##实现功能
   1.移动端滑动事件
   2.弹框
   2.手指横向移动切换路由
   3.小球赛贝尔曲线动画
   4.路由切换动画
   5.组件懒加载
   6.vuex管理商品数据
     ...等等
##小小总结
    1.移动端滑动事件
       (1)选择
            我选择用translate3D达到移动效果,通过绝对定位监听top就不用考虑了,因为每次移动都会reflow,消耗移动端性能代
            价太高了,而translate具有绘图层,每次移动都是触发repaint,translate2D效果虽好,但不会触发gpu渲染
       (2)translate3D值获取
            通过window.getComputedStyle(el).transform获取得到一个矩阵,再进行字符串选取得到y轴变化数据
    2.小球运动
       移动端都没有el.getBoundingClientRect().x与y值,可以通过el.getBoundingClientRect().top与left获取,
       利用vue transition钩子需要重新reflow才能形成动画
    3.vuex管理数据
       vue由于js限制监听不到一个object类型内的数据修改变化,不能及时更新视图,可以增加this.$set与Object.assign()修改数据达
       到及时更新视图.注意Object.assign修改数据需要新增一个空对象,才能改变数据在堆中的位置,vue才能监控并及时更新视图
    4.组件懒加载
       利用import(),返回的是一个Promise对象,使用的时候就加载组件
    5.flex
       uc运行时 .menu-wrapper 的flex设置固定宽度失效了,我改成固定宽高,.foods-wrapper设置绝对定位自适应宽度
```
## 结构
.

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
│   │   │   └── api.js  移动端滑动事件在这里
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

[![Watch the video](https://raw.github.com/GabLeRoux/WebMole/master/ressources/WebMole_Youtube_Video.png)](http://youtu.be/vt5fpE0bzSY)
### 安装与运行

```
git clone https://https://github.com/pretty-foam/vue-demo

cd vue-demo

npm i
npm run dev //服务端运行 访问 http://localhost:8080

npm run build 项目打包


