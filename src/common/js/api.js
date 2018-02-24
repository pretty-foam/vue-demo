export function slide(data) {
  class touchEvent{
    constructor(el,that,store){
    this.el=el;       //目标元素
    this.that=that;   //vue
    this.store=that.$store.state; //store
    this.Time='';     //时间定时器
    this.date='';     //获取时间
    this.currentY=''; //当前的2D的Y偏移值
    this.startY='';    //触屏开始Y
    this.startX='';    //触屏开始Y
    this.finalX='';      //结束的3D的Y偏移值
    this.y='';         //开始于结束的3D偏移值差
    this.i=0 ;          //定时计数
    this.endY='';
    this.Height=el.parentNode.offsetHeight-el.offsetHeight;//优化减少reflow
    }
    //touch start
    start(event){
      clearInterval(this.Time);  //结束上一个滑动行为
      this.date=new Date();      //记录当前时间
      //获取当前3D偏移值(dom元素挂载完成,transform为空,必须判断值为空设置为0)
      this.currentY=window.getComputedStyle(this.el).transform.match(/-?\d*/g)[22]||0;
      this.startY=event.changedTouches[0].screenY;
      this.startX=event.changedTouches[0].screenX;
    }
    //touch move
    move(event){
      let moveY=event.changedTouches[0].screenY;
      let moveX=event.changedTouches[0].screenX;
      let length=this.startY-moveY;
      //防止横向滑动时，页面出现抖动情况(原理判断手指横向移动的距离的绝对值,当大于40时停止3D偏移)
      if(Math.abs(moveX-this.startX)<40){
        this.el.style.transform=`translate3D(0,${this.currentY-length-15}px,0)`
      }

    }
    //touch end
    end(event){
      this.endY=window.getComputedStyle(this.el).transform.match(/-?\d*/g)[22];//重新获取3D偏移
      this.finalX=event.changedTouches[0].screenX;
      //弹屏实现 原理判断当前3D偏移值(父盒子为参照物),lenght大于0时设置为0,小于当前元素高度与父盒子之差设置为差值
      if(this.endY>0){
        this.el.style.transform='translate3D(0,0,0)';
      }else if(this.endY<this.Height){
        this.el.style.transform=`translate3D(0,${this.Height}px,0)`;
      }


      //快速滑动
     this.fast_sliding();
      //横向移动
      this.transverse_sliding();
    }
    //快速滑动 原理通过判断手机从触屏开始到结束的时间与手指移动的距离判断,再执行定时器实现快速滑动
    fast_sliding(){
      this.y= this.endY-this.currentY;
      this.date=this.date-new Date;
      if(this.date>-300&&this.y<-200||this.y>200){
        this.i=0;
        this.y>0?this.y=-1:this.y=1;
        this.Time=setInterval(()=>{this.timeFunction()},60)
      }
    }

    //快速滑动定时器(判断当前的3D偏移值是否超出盒子与时间结束控制)
    timeFunction(){
      let length=parseInt(window.getComputedStyle(this.el).transform.match(/-?\d*/g)[22])-70*this.y;
      this.el.style.transform=`translate3D(0,${length}px,0)`;
      this.i++;
      if(length>0){
        this.el.style.transform='translate3D(0,0,0)';
        clearInterval(this.Time);
      }else if(length<this.Height||0){
        this.el.style.transform=`translate3D(0,${this.Height}px,0)`;
        clearInterval(this.Time);
      }else if(this.i===10){
        clearInterval(this.Time);
      }

    }
    //横向滑动切换
    transverse_sliding(){
      let length=this.startX-this.finalX;
      let  routes=['/goods','/ratings','/seller'];
      if(length>150) {
        switch(this.store.slideCount){
          case 1:
            this.that.$router.push({path:routes[--this.store.slideCount]});
            ;break;
          case 2:
            this.that.$router.push({path:routes[--this.store.slideCount]})
            ;break;
        }
      }
      else if(length<-150){
        switch (this.store.slideCount){
          case 0:
            this.that.$router.push({path:routes[++this.store.slideCount]});
            ;break;
          case 1:
            this.that.$router.push({path:routes[++this.store.slideCount]})
            ;break;
        }
      }

    }
  };
  const p=new touchEvent(data.el,data.that);
  data.el.addEventListener('touchstart',()=>{p.start(event)},false);
  data.el.addEventListener('touchmove',()=>{p.move(event)},false);
  data.el.addEventListener('touchend',()=>{p.end(event)},false);
}

//判断foods list position
export function position(e) {
    let foods=document.querySelector('.foods-wrapper');
    let name=document.querySelectorAll('.foods-item .foods-title');
    for(let i of name){
      if(i.innerHTML===e){
        foods.style.transform=`translateY(${-i.offsetTop}px)`;
      }
    }

}

