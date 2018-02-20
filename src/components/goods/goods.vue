<template>

    <div class="goods clearfix">
        <div class="memu-wrapper" ref="menu">
          <ul>
            <li v-for="value,index in goods" class="border-1px" @touchstart="position(value.name)">
              <span v-if="value.type>0" :class="classMap[value.type]" class="icon"></span>
              {{value.name}}
            </li>
          </ul>
        </div>
        <div class="foods-wrapper" @touchend="position" ref="foods">
            <ul>
              <li class="foods-item" v-for="value in goods">
                <h1 class="foods-title" >{{value.name}}</h1>
                <div class="foods-list">
                  <ul>
                    <li v-for="food in value.foods" class="food">
                      <router-link :to="{path:'/goods/foodDetail',query:{food}}">
                       <div class="icon">
                        <img :src=food.icon alt="" width="60" height="60">
                      </div>
                      </router-link>
                      <div class="content">
                        <div class="name">{{food.name}}</div>
                        <div class="description" v-if="food.description">{{food.description}}</div>
                        <div class="total">
                          <span class="sellCount">月售{{food.sellCount}}份</span>
                          <span class="rating">好评率{{food.rating}}%</span>
                        </div>
                        <div class="price">
                          <span class="newPrice">￥{{food.price}}</span>
                          <span v-show="food.oldPrice" class="oldPrice"><s>￥{{food.oldPrice}}</s></span>
                        </div>
                      </div>
                      <count :data="food.price" :name="food.name"></count>

                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>

      <transition name="fade">
        <router-view ></router-view>
      </transition>
      <shoppingCart></shoppingCart>
    </div>


</template>

<script>
   import {mapActions, mapState,mapGetters,mapMutations} from 'vuex'
   import shoppingCart from '../shoppingCart/shoppingCart.vue'
   import count from '../count/count.vue'
   export  default {
     computed: {
       ...mapState(['goods', 'classMap', 'touch'])
     },
     methods:{
       ...mapMutations(['slide','position'])
     },
     mounted(){
       this.slide({el:this.$refs.menu,that:this});
       this.slide({el:this.$refs.foods,that:this});
       this.$store.state.slideCount=0;
     },
     components:{count,shoppingCart}
   }
</script>

<style scoped lang="stylus">
  @import "../../common/css/mixin.styl"

.goods
  position absolute
  width 100%
  top 0
  bottom 48px
  background rgba(100,100,100,.08)
  .memu-wrapper
    width 85px
    background white
    box-shadow 1px 1px 3px rgba(7,17,27,.1)
    ul
     li
       display block
       height 35px
       text-align center
       font-size 13px
       padding-top 18px
       border-1px(rgba(7,17,27,.1))
      a
       display block
        height 100%
     icon(3,13px,13px)
   .foods-wrapper
     position absolute
     top 0%
     right:0
     left 95px
     background white
   .foods-item
      width 100%
      .foods-title
         background rgba(0,0,0,.05)
         font-size 16px
         line-height 30px
         color: #737371
         font-weight 600
         padding-left 30px
         box-shadow 1px 1px 3px white
      .foods-list
        margin 10px 0px 0 20px
        .food
          display block
          margin-top 20px
          vertical-align top
          border-1px(#c6c6c6)
        .food:last-child::after
           border none
          .icon
           display inline-block
          .content
           width 70%
           display inline-block
           vertical-align top
           color rgb(147,153,159)
           margin  0 0 20px 4px
           font-size 14px
           .name
              font-size 16px
              font-weight 600
              color black
           .description
              line-height 20px
           .total
              line-height 20px
           .price
               line-height 20px
               .newPrice
                 color: red
                 font-size 16px


  .fade-enter,.fade-leave-to
      transform scale(0) translate(880px,-800px)
      opacity 0
  .fade-enter-active,.fade-leave-active
    transition all .7s
</style>
