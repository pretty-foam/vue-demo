import Vue from 'vue'
import VueRouter from 'vue-router'
//使用懒加载优化页面加载速度,类似于requireJS加载方式
const goods=()=>import('../components/goods/goods.vue')
const seller=()=>import('../components/seller/seller .vue')
const ratings=()=>import('../components/ratings/ratings.vue')
const foodDetail=()=>import('../components/foodDetail/foodDetail.vue')
Vue.use(VueRouter)
export default new VueRouter({
   routes:[
     {path:'/',component:goods},
     {path:'/goods',component:goods,
        children:[
          {path:'/goods/foodDetail',component:foodDetail}
        ]
     },
     {path:'/seller',component:seller},
     {path:'/ratings',component:ratings},
   ],
  linkActiveClass:'active'
})
