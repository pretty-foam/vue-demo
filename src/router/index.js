import Vue from 'vue'
import VueRouter from 'vue-router'
import goods from '../components/goods/goods.vue'
import seller from '../components/seller/seller .vue'
import ratings from '../components/ratings/ratings.vue'
import foodDetail from '../components/foodDetail/foodDetail.vue'
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
