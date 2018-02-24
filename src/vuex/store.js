import Vue from 'vue'
import Vuex from 'vuex'
import {slide,position} from "../common/js/api";
Vue.use(Vuex);

const state={
  seller:'vuex seller',
  goods:'vuex goods',
  ratings:'vuex ratings',
  detailShow:false,  //bullentin 详情页面控制开关
  classMap:['decrease', 'discount', 'special', 'invoice', 'guarantee'],//foods discount className
  price:0,      //total price
  distributionFee:4,
  count:0,  //foods count
  foodTotal:{},  //foods detial
  ball:[false,false,false,false,false,false,false,false,false], //balls show controll
  height:0,  //count button 2D
};

const getters= {  };



const mutations={
 //小球控制
  balls($store,e){
    $store.height=e.path[0].getBoundingClientRect().top-60;
    for(let i=0 ;i<$store.ball.length;i++){
      if (!$store.ball[i]){
        $store.ball[i]=true;
        return;
      }
    }
  },
 //商品选入数据
  total($store,data) {
    const name=data.name;  //food name
    const judge=data.judge;
    const that=data.that;   //vue
    const price=data.price;
    let foodTotal = $store.foodTotal;  //食品总
    const foodContent={number:1,price:price};  //初始化食物数据

    if(judge){
      //!foodTotal[name]? context.state.foodTotal = Object.assign({}, foodTotal,foodTotal[name]=foodContent):foodTotal[name].number++;
      !foodTotal[name]?that.$set(foodTotal,name,foodContent):foodTotal[name].number++    //js函数本身功能限制监听不到对象数据变化,需使用set
    }
    else{
      //foodTotal[name].number>1?foodTotal[name].number--:that.$set(foodTotal,name,null);
      foodTotal[name].number>1?foodTotal[name].number--:$store.foodTotal=Object.assign({},foodTotal,foodTotal[name]=null)
    }
  },


};
const actions={
  send(context,that){
    that.$http.get('/api/seller').then((res)=>{
      if(res.data.errno===0){
        state.seller =res.data.data
      }
    });
    that.$http.get('/api/goods').then((res)=>{
      res.data.errno===0?state.goods=res.data.data:console.log('error')
    });
    that.$http.get('api/ratings').then((res)=>{
      res.data.errno===0?state.ratings=res.data.data:console.log('error')
    })
  },
  slide(context,data){
     slide(data)
  },
  position(context,e){
    position(e)
  }
};
export default new Vuex.Store({
   state,
   mutations,
   getters,
   actions,
})

