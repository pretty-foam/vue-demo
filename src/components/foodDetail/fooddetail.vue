<template>
    <div class="foodDetail">
        <div class="picture">
             <img :src=food.image alt="" width="100%" height="100%">
        </div>
        <router-link to="/goods">
             <div class="close icon-close"></div>
        </router-link>
        <div class="food-content">
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
          <span class="add-food" @click="addFood(food.name,food.price)" v-show="show">加入购物车</span>
           <span class="count-position" v-show="!show">
             <count :data="food.price" :name="food.name"></count>
           </span>
        </div>
        <div class="bar"></div>
        <div class="food-introduction" v-if="food.info">
              <span class="title">商品介绍</span>
              <span class="introduction">{{food.info}}</span>
        </div>
       <div class="bar" v-if="food.info"></div>
        <div class="ratings">
             <span class="title">商品评价</span>
          <ul class="clearfix">
            <li @click="controlRate()">全部</li>
            <li @click="controlRate(1)">推荐</li>
            <li @click="controlRate(0)">吐槽</li>
          </ul>
              <div class="ratings-content" v-for="ratings of food.ratings" v-show="rateShow[ratings.rateType]">
                      <span class="user">
                            <span class="span-name">{{ratings.username}}</span>
                            <span class="head"><img :src="ratings.avatar" width="12px" height="12px" alt=""></span>
                      </span>
                      <div class="date clearfix">{{new Date(ratings.rateTime).toLocaleDateString()}} {{new Date(ratings.rateTime).toLocaleTimeString()}}</div>
                     <div class="text">
                     <span :class=rateIcon[ratings.rateType] class="icon" ></span>{{ratings.text}}
                     </div>
              </div>
        </div>


    </div>
</template>

<script>
   import {mapState,mapActions} from 'vuex'
   import count from '../count/count.vue'
   export default {
      computed:{
        ...mapState(['goods'])
      },
     data(){
        return{
          food:this.$route.query.food,
          show:true,
          rateIcon:['icon-thumb_up','icon-thumb_down'],
          rateShow:[true,true]
        }
     },
     methods:{
       ...mapActions(['total']),
       addFood(name,price){
         this.total({name:name,judge:true,that:this,price:price});
         this.$store.state.count++;
         this.$store.state.price+=price;
         this.show=!this.show
       },
       controlRate(number){
         switch(number){
           case 0:
             this.rateShow=Object.assign([],[false,true])
             ;break;
           case 1:
             this.rateShow=Object.assign([],[true,false])
             ;break;
           default:
             this.rateShow=Object.assign([],[true,true])
             ;break;
         }
       }
     },
     components:{
       count
     }

   }
</script>

<style lang="stylus" scoped>
  @import "../../common/css/mixin.styl"
.foodDetail
  position fixed
  top 0px
  left 0px
  right 0px
  bottom 48px
  background white
  overflow auto
  .food-content
     display block
     color rgb(147,153,159)
     margin  18px
     font-size 14px
     line-height 20px
     padding-right 18px
     position relative
     .name
       font-size 16px
       font-weight 600
       color black
       margin-bottom 8px
     .description
       padding-right 30px
       margin-bottom 12px
     .total
       margin-bottom 12px
       .rating
        margin-left 12px
     .price
       .newPrice
         color: red
         font-size 16px
         margin-right 5px
     .add-food
      background rgb(0,160,220)
      color white
      padding 4px 6px
      border-radius 10px
      position absolute
      bottom:0
      right 0
      font-size 12px
      box-shadow 1px 2px 3px rgba(7,17,27,.15)
    .count-position
      position absolute
      right -10px
      bottom -7px
      width 100px
      height 30px
  .bar
    width: 100%
    height 16px
    background #f3f5f7
    border-top:1px solid rgba(7,17,27,.1)
    border-bottom:1px solid rgba(7,17,27,.1)
  .close
    position absolute
    top: 20px
    left 10px
    color white
    font-size 18px
    padding 5px
    border-radius 50%
    background rgba(7,17,27,.2)
  .food-introduction
    margin 18px
    .title
     display block
     font-weight 700
     font-size 14px
     margin-bottom 10px
    .introduction
     font-size 12px
     line-height 20px
     color rgb(77,85,93)
  .ratings
     margin 18px
     font-size 14px
     .title
        font-weight 700
        display block
        margin-bottom 10px
     ul
       height 35px
       margin-bottom 10px
     ul li
        float left
        display block
        background rgba(0,160,220,.2)
        margin-right 10px
        font-size 13px
        padding 8px
        border-radius 3px
        color rgb(77,85,93)
        box-shadow 1px 2px 3px rgba(7,17,27,.15)
     li:nth-child(1)
       background rgba(0,160,220,.7)
       color white
     li:nth-child(3)
       background rgba(77,83,93,.1)
     li:hover
       background rgb(0,160,220)
       color white
  .ratings-content
     border-1px(rgba(77,83,95,.1))
     color rgba(77,83,95,.8)
     padding 7px 0 5px 0
     .user
       display inline-block
       .head img
         width: 12px
         height 12px
         border-radius 50%
     .date
       display inline-block
       float right
       font-size 11px
     .text
       font-size 14px
       color black
       padding 8px 0
       .icon
         padding-right 8px
       .icon-thumb_up
         color rgba(0,160,220,.7)
       .icon-thumb_down
         color rgba(77,83,93,.5)
</style>
