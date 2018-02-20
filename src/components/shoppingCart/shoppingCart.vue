<template>
        <div class="shoppingCart" ref="cart">
            <div class="content-left">

              <span class="icon icon-shopping_cart" ref="icon" @touchstart="controllshow">
                 <transition  @before-enter="beforeBall(index)" @enter="enterBall(index)" @after-enter="afterBall(index)" v-for="value,index of ball">
                   <div class="ballsBox" ref="ballsBox" v-show="value">
                     <span class="balls"  ref="balls"></span>
                   </div>
                 </transition>

              </span>
              <span class="price">￥{{price}}</span>
              <span class="distributionFee">另需配送费￥{{distributionFee}}元</span>
            </div>
            <div class="content-right" @touchstart="end">
              <span class="send" >
                 <span v-show="20-price>0">
                    <span v-show="20-price<20">还差</span>￥{{20-price}}元起送
                 </span>
              </span>
              <span v-show="20-price<=0" class="total">
                   结算
                 </span>
            </div>
            <div class="number" v-show="count>0">
                  {{count}}
            </div>
            <div class="shopping-background" v-if="show">
            </div>
            <transition name="fade">
              <div class="shopping-content" ref="shoppingContent" v-if="show">
                <div class="title">
                  <span class="left">购物车</span>
                  <span class="right" @touchstart.stop="empty()">清空</span>
                </div>
                <div class="foodDetial" v-for="value,name in foodTotal" v-if="value">
                  <span class="name">{{name}}</span>
                  <span class='price'>￥{{value.price}}</span>
                  <co :data="value.price" :name="name"></co>
                </div>
              </div>
            </transition>

        </div>
</template>

<script>
    import {mapMutations,mapState,mapGetters,mapActions} from 'vuex'
    import co from '../count/count.vue'
    export default {
      computed: {
        ...mapState(['price', 'distributionFee','count','foodTotal','ball'])
      },
      data(){
        return{
           show:false
        }
      },
      mounted(){
        this.price>0? this.$refs.icon.className='icon icon-shopping_cart icon-js':
        this.$refs.icon.className='icon icon-shopping_cart ';
      },
      updated(){
        this.price>0? this.$refs.icon.className='icon icon-shopping_cart icon-js':
        this.$refs.icon.className='icon icon-shopping_cart ';
      },
      components:{
         co
      },
      methods:{
        empty(){
             this.$store.state.foodTotal={};
             this.$store.state.price=0;
             this.$store.state.count=0;
             this.show=!this.show
        },
        controllshow(){
            this.show=!this.show;
        },
        beforeBall(index){
          let lenght=this.$refs.cart.getBoundingClientRect().y-this.$store.state.height;
          this.$refs.ballsBox[index].style.opacity=0;
          this.$refs.ballsBox[index].style.transform='translateX(275px)';
          this.$refs.balls[index].style.transform=`translateY(${-lenght}px)`;
          this.$refs.icon.style.fontSize='22px';

        },
        enterBall(index){
            //cubic-bezier(.01,.98,.18,.99)
          this.$refs.ballsBox[index].style.transition='all .5s cubic-bezier(.01,.98,.18,.99)';
          this.$refs.balls[index].style.transition='all .5s';
        },
        afterBall(index){
          this.$refs.ballsBox[index].style.transform='translateX(10px)';
          this.$refs.balls[index].style.transform='translateY(-30px)';
          this.$refs.ballsBox[index].style.opacity=1;
          this.$set(this.$store.state.ball,index,false);
          this.$refs.icon.style.fontSize='18px';
        },
        end(){
            alert('end')
        }
      }
    }
</script>

<style scoped lang='stylus'>
  @import "../../common/css/mixin.styl"
.shoppingCart
  position absolute
  left 0
  bottom -48px
  right 0
  height 48px
  display flex
  color rgba(250,250,250,.4)
  font-size 13px
  .content-left
     flex 1
     background #141d27
     display flex
     z-index 1
     line-height 48px
     text-align center
    .icon
     flex 1
     border 10px solid #141d27
     border-radius 50%
     line-height 30px
     padding 5px
     margin -18px 0 8px 10px
     font-size 16px
     .ballsBox
       .balls
        position fixed
        display block
        width 20px
        height 20px
        background #75a0ff
        border-radius 50%
    .icon-js
     color white
     background #75a0ff
    .price
     flex 2
     border-right 1px solid rgba(250,250,250,.2)
     color white
     font-weight 700
     margin 10px 0
     line-height 28px
    .distributionFee
      flex 4
  .content-right
    flex 0 0 105px
    background #2b333b
    text-align center
    z-index 1
    font-size 14px
    .send
      display inline-block
      line-height 48px
    .total
        display block
        height 100%
        color white
        font-weight 700
        background #3d8fb2
        box-shadow 1px 1px 3px white
        margin-top -14px
        line-height 48px
  .number
     width 20px
     background red
     border-radius 45%
     position absolute
     top: -10px
     left:50px
     color white
     text-align center
     font-size 10px
     font-weight 700
     padding 4px 3px
     z-index 1
  .shopping-background
    display block
    position fixed
    top 0px
    left: 0
    right 0
    bottom 48px
    background rgba(7,17,27,.8)
  .shopping-content
     position fixed
     width 100%
     bottom 48px
     background #f3f5f7
     font-size 14px
     color black
     .title
       color rgb(7,17,27)
       height 40px
       line-height 40px
       border-1px(rgba(7,17,27,.1))
       padding 0 18px
       .right
         position absolute
         right 18px
         color rgb(0,160,220)
     .foodDetial
         color black
         height 48px
         font-size 14px
         line-height 48px
         border-1px(rgba(7,17,27,.1))
         margin-left 18px
        .name
          font-weight 700
        .price
           color red
           position absolute
           top 2px
           left 60%
  .fade-enter,.fade-leave-to
     opacity 0
     transform:translateY(300px)
  .fade-enter-active,.fade-leave-active
     transition all .5s
</style>
