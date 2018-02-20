import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state={
  seller:'vuex seller',
  goods:'vuex goods',
  ratings:'vuex ratings',
  detailShow:false,
  starTotal:[],
  score:0,
  classMap:['decrease', 'discount', 'special', 'invoice', 'guarantee'],
  price:0,      //total price
  distributionFee:4,
  count:0,
  foodTotal:{},  //food detial
  slideCount:0,
  ball:[false,false,false,false,false,false,false,false,false],
  height:0,
};

const getters= {  };



const mutations={
  detailShow(that){
         that.detailShow=!that.detailShow;

    },

  position($store,e) {
       let foods=document.querySelector('.foods-wrapper');
       let name=document.querySelectorAll('.foods-item .foods-title');
               for(let i of name){
                 if(i.innerHTML===e){
                   foods.style.transform=`translateY(${-i.offsetTop}px)`;
                 }
               }
   },

  slide($store,Oj){
    function touchEvent(el,that,store) {
      this.el=el;       //目标元素
      this.that=that;
      this.store=store;
      this.Time='';     //时间定时器
      this.date='';     //获取时间
      this.currentY=''; //当前的2D的Y偏移值
      this.startY='';    //鼠标开始Y
      this.startX='';
      this.endX='';
      this.y='';         //开始于结束的2D偏移值差
      this.i=0 ;          //定时计数
    }
    touchEvent.prototype={
      constructor:touchEvent,
      start(event){
        clearInterval(this.Time);
        this.date=new Date();
        this.currentY=window.getComputedStyle(this.el).transform.match(/-?\d*/g)[22]||0;
        this.startY=event.changedTouches[0].screenY;
        this.startX=event.changedTouches[0].screenX;
      },
      move(event){
        let moveY=event.changedTouches[0].screenY;
        let length=this.startY-moveY;
        this.el.style.transform=`translateY(${this.currentY-length-10}px)`
      },
      end(event){
        let length=window.getComputedStyle(this.el).transform.match(/-?\d*/g)[22];
        this.endX=event.changedTouches[0].screenX;
        if(length>0){
          this.el.style.transform='translateY(0)';
        }else if(length<this.el.parentNode.offsetHeight-this.el.offsetHeight){
          this.el.style.transform=`translate(0,${this.el.parentNode.offsetHeight-this.el.offsetHeight}px)`
        }
        let endY=window.getComputedStyle(this.el).transform.match(/-?\d*/g)[22];
          this.y= endY-this.currentY;
        this.date=this.date-new Date;
        if(this.date>-300&&this.y<-200||this.y>200){
            this.i=0;
          this.y>0?this.y=-1:this.y=1;
          this.Time=setInterval(()=>{this.timeFunction()},60)
        }
        this.transverse_sliding();
      },
      timeFunction(){
          let length=parseInt(window.getComputedStyle(this.el).transform.match(/-?\d*/g)[22])-40*this.y;
          this.el.style.transform=`translateY(${length}px)`;
          this.i++;
          if(length>0){
            this.el.style.transform='translateY(0px)';
            clearInterval(this.Time);
          }else if(length<this.el.parentNode.offsetHeight-this.el.offsetHeight||0){
            this.el.style.transform=`translate(0,${this.el.parentNode.offsetHeight-this.el.offsetHeight}px)`;
            clearInterval(this.Time);
          }else if(this.i===10){
            clearInterval(this.Time);
          }
      },
      transverse_sliding(){
        let length=this.startX-this.endX;
        let  routes=['/goods','/ratings','/seller'];
        if(length>150) {
           switch(this.store.slideCount){
             case 1:
               this.that.$router.push({path:routes[--this.store.slideCount]})
               ;break;
             case 2:
               this.that.$router.push({path:routes[--this.store.slideCount]})
               ;break;
           }
        }
        else if(length<-150){
            switch (this.store.slideCount){
              case 0:
                this.that.$router.push({path:routes[++this.store.slideCount]})
                ;break;
              case 1:
                 this.that.$router.push({path:routes[++this.store.slideCount]})
                ;break;
            }
        }
      }
    }
    const p=new touchEvent(Oj.el,Oj.that,$store);
    Oj.el.addEventListener('touchstart',()=>{p.start(event)},true);
    Oj.el.addEventListener('touchmove',()=>{p.move(event)},true);
    Oj.el.addEventListener('touchend',()=>{p.end(event)},true);
  }






};
const actions={
      showClass(context,score){
        context.commit('detailShow');
      },

  total(context,data) {
    const name=data.name;
    const judge=data.judge;
    const that=data.that;
    const price=data.price;
    let foodTotal = context.state.foodTotal;
    const foodContent={number:1,price:price};
    if(judge){
      //!foodTotal[name]? context.state.foodTotal = Object.assign({}, foodTotal,foodTotal[name]=foodContent):foodTotal[name].number++;
         !foodTotal[name]?that.$set(foodTotal,name,foodContent):foodTotal[name].number++
    }
    else{
       //foodTotal[name].number>1?foodTotal[name].number--:that.$set(foodTotal,name,null);
         foodTotal[name].number>1?foodTotal[name].number--:context.state.foodTotal=Object.assign({},foodTotal,foodTotal[name]=null)
    }
  },
  balls(context,e){
    context.state.height=e.path[0].getBoundingClientRect().y-60;
    for(let i=0 ;i<context.state.ball.length;i++){
      if (!context.state.ball[i]){
          context.state.ball[i]=true;
          return;
      }
    }
  }



};
export default new Vuex.Store({
   state,
   mutations,
   getters,
   actions,
})

